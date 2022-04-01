import {
	fetchMemberships,
	fetchUserData,
	fetchMessageHistory,
	fetchChannelData,
	removeChannelData,
	removeMemberships,
	fetchAllChannelData,
	setChannelData,
	setUserData
} from 'pubnub-redux';
//import pubnub from "pubnub"
//import { usePubNub } from "pubnub-react"

import { createSelector } from 'reselect';

import { pubnub } from './../../App';

import Team from '../../models/team';

import ENV from '../../env';

export const CREATE_TEAM = 'CREATE_TEAM';
export const GET_MY_TEAMS = 'GET_MY_TEAMS';
export const ACTIVE_CHAT_EXISTS = 'ACTIVE_CHAT_EXISTS';
export const ACTIVE_CHAT_DOES_NOT_EXISTS = 'ACTIVE_CHAT_EXISTS_DOES_NOT_EXISTS';
export const UPDATE_UNREAD = 'UPDATE_UNREAD';


export const url = ENV.apiUrl;

export const getChats = () => {
	return async (dispatch, getState) => {
		// any async code you want!
		const userId = getState().verifyauth.currentUserId;
		const firstname = getState().verifyauth.firstname;
		const lastname = getState().verifyauth.lastname;
		// const token = getState().verifyauth.token
		try {
			await dispatch(fetchUserData({ uuid: userId }))
				.then(() => {
					// Subscribe to the user's channel to receive events involving this user
					pubnub.subscribe({
						channels: [ userId ],
						withPresence: true
					});
				})
				.then(() => {
					return dispatch(
						fetchMemberships({
							uuid: userId,
							sort: {
								updated: 'asc'
							},
							include: {
								channelFields: true,
								customChannelFields: true,
								customFields: true,
								totalCount: true
							}
						})
					);
				})
				.then(() => {
					const memberships = getState().chats.byId[userId];
					const chatIds = memberships?.map((membership) => membership.id);

					//console.log('MEMBERSHIPS', memberships);

					return pubnub.subscribe({
						uuid: userId,
						channels: [ chatIds ]
						//withPresence: true
					});
				})
				.then(() => {
                    const memberships = getState().chats.byId[userId];
                    
                    //"filtered to only include with lastreadtimetoken to avoid error"
                    const filteredMemberships = memberships?.filter(c => c.custom !== null)
                                                              
                    const chatIds = filteredMemberships?.map((membership) => membership.id);
                    const timetokens = filteredMemberships?.map((membership) => membership.custom.lastReadTimetoken);

                  //  //console.log ("memberships", memberships);
                 // console.log ("filtered to only include with lastreadtimetoken to avoid error", filteredMemberships)
                   // //console.log ("filtered ids", chatIds)
                   //console.log ("last read", timetokens)


					pubnub.messageCounts(
						{
							channels:  chatIds,
							channelTimetokens: timetokens
						},
						(status, results) => {
							// handle status, response
							////console.log(status);
							if(status === !200){
							    throw err
							}
							//console.log("this is result from pubnub.messageCounts", results);

							if (results !== undefined ) {
								const unreadArray = Object.entries(results.channels).map(([id, unreadCount]) => ({id, unreadCount}))
								dispatch({
									type: 'UPDATE_UNREAD',
									unreadCount: unreadArray
									
	
								   
								});
							}
							
							


							//console.log("in array form ", unreadArray)
                      
                            
						}
					);
				});
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};






export const getchat = (chatId) => {
	return async (dispatch, getState) => {
		try {
			dispatch(
				fetchChannelData({
					channel: chatId
				})
			);
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

export const getP2Pchat = (chatId) => {
	return async (dispatch, getState) => {
		// any async code you want!
		const userId = getState().verifyauth.currentUserId;
		const token = getState().verifyauth.token;
		try {
			const response = await fetch(`${url}/api/v1/team/getactivechat`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache'
				},
				body: JSON.stringify({
					reciever: recieverId
				})
			});

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const resData = await response.json();

			//console.log('response from getactivechat', resData);

			if (resData.activeChatExists === true) {
				dispatch({
					type: ACTIVE_CHAT_EXISTS,
					recieverId: resData.recieverId,
					firstname: resData.firstname,
					lastname: resData.lastname,
					channelId: resData.channelId
				});
			} else if (resData.activeChatExists === false) {
				dispatch({
					type: ACTIVE_CHAT_DOES_NOT_EXISTS,
					recieverId: resData.recieverId
				});
			}
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

export const sendMessage = (message, chatId) => {
	return async (dispatch, getState) => {
		const userId = getState().verifyauth.currentUserId;

		// try {

		//     dispatch(sendMessage({
		//         message: message,
		//         // channel: '5ff0ca48e5d2a308be35f5fb',
		//         channel: chatId,
		//         sender: 'userId'

		//     },
		//     ))

		// } catch (err) {
		//     //console.log("error from action ", err)
		//     // send to custom analytics server
		//     throw err;

		// }

		try {
			pubnub.publish({
					message: message,
					channel: chatId
				})
				.then((response) => {
					// //console.log("publish response", response); // {timetoken: "14920301569575101"}
					dispatch(
						setChannelData({
							channel: chatId,
							data: {
								custom: {
									lasttimetoken: response.timetoken
								}
							}
						})
					);

					////console.log('channel updated with timetoken', response.timetoken); // {timetoken: "14920301569575101"}
				})
				.catch((err) => {
					//console.log(err);
				});

			// pubnub.addMessageAction(
			//     {
			//         channel: '6047b9911efdd094a43c97cd',
			//         messageTimetoken: '16155552653341123',
			//         action: {
			//             type: 'updated',
			//             value: 'Hello World! (fixed typo)',
			//         },
			//     },

			// );
		} catch (err) {
			//console.log('error from action in sending message ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

export const getmessage = (chatId) => {
	return async (dispatch, getState) => {
		try {
			dispatch(
				fetchMessageHistory({
					channel: chatId,
					//reverse: true,
					count: 100,
					stringifiedTimeToken: true,
					includeMeta: true
					//   includeMessageActions: true, dosent work here
				},
				(status, response) => {
					         //console.log("from actions messages", response)
		
					    }
				
				)
			);

			// pubnub.fetchMessages(
			//     {
			//         channels: [chatId],
			//         //start: "15343325214676133",
			//         // end: "15343325004275466",
			//         count: 10,
			//         stringifiedTimeToken: true,
			//         //includeMeta: true,
			//        // includeMessageActions: true,
			//     },
			//     (status, response) => {
			//         //console.log("from actions messages", response)

			//     }
			// );

			// pubnub.getMessageActions(
			//     {
			//         channel: '6047b9911efdd094a43c97cd',
			//         start: '16153954237417413',
			//         end: '16155552653341123',

			//         limit: 100,
			//     },
			//     function (status, response) {
			//         //console.log(status, response)

			//     }

			// );
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}

		// BELOW CODE CRASHES THE APP

		// const userId = getState().verifyauth.currentUserId;

		// const memberships = getState().chats.byId[userId] // gets all my joined channels

		// const chatIds = memberships.map(membership => membership.id);
		// // gets only the ids of the joined channels and stores in array
		// // same code works with pubnub.subscribe to subscibe to multiple channels

		// return pubnub.fetchMessages(
		//     {
		//         channels: [chatIds],

		//         count: 25,
		//     },
		//     (status, response) => {
		//         //console.log("messages pubnub", response)

		//     }
		// );
	};
};


export const getmoremessage = (chatId) => {
	return async (dispatch, getState) => {
		try {
			dispatch(
				fetchMessageHistory({
					channel: chatId,
					//reverse: true,
					count: 10,
					stringifiedTimeToken: true,
					includeMeta: true
					//   includeMessageActions: true, dosent work here
				},

			
				
				)
			);

		
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}

	
	};
};




export const setTimeToken = (chatId,lasttimetoken) => {

	//console.log("from action", lasttimetoken)
	return async () => {
		try {
			pubnub.objects.setMemberships({
				channels: [
					{
						id: chatId,
						custom: {
							lastReadTimetoken: lasttimetoken
						}
					}
				]
				
			},
			(status, results) => {
				//handle status, response
				//console.log("from setting time token ", status);
				if(status === !200){
				    throw err
				}
				//console.log("from setting timetoken", results);
				// dispatch({
				//     type: MEMBERSHIPS_AND_UNREAD,

				   
				// });
				
			}
			
			);
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

export const deletechannel = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(
				removeChannelData({
					channel: '5ff43f785b682e4b02c54b9d'
				})
			);
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

export const removechannel = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(
				removeMemberships({
					uuid: '6037e5aae225c7d290c2881e',
					channels: ['629fe212-0d74-f5ce-d476-baa527252ffb']
				})
			);
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

// export const sendMessage = (message, chatId) => {
//     return async (dispatch, getState) => {
//         const token = getState().verifyauth.token

//         //console.log("getting token?", token)
//         const response = await fetch(`${url}/api/v1/team/sendMessage/${chatId}`,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({

//                     message: message,
//                     channel: chatId

//                     //returnSecureTokarb8b834en: true
//                 })

//             }
//         );

//         ////console.log("this is the action sending data", phoneauth.body)

//         if (!response.ok) {
//             const errorResData = await response.json();
//             //console.log(errorResData);

//             const errorId = errorResData.error.message;
//             let errorMessage = 'Message Sending Failed, Check your internet connection';
//             // if (errorId === 'EMAIL_EXISTS') {
//             //   message = 'This email exists already!';
//             // }
//             throw new Error(errorMessage);
//         }

//         const resData = await response.json();

//         //console.log("resdata frm mssage", resData);

//     };
// };
