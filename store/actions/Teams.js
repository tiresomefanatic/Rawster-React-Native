//import { AsyncStorage } from 'react-native';
//import { API_URL } from '@env'

import { setChannelData, setMemberships, setChannelMembers } from 'pubnub-redux';

import Team from '../../models/team';

import ENV from '../../env';

export const CREATE_TEAM = 'CREATE_TEAM';
export const GET_MY_TEAMS = 'GET_MY_TEAMS';

export const url = ENV.apiUrl;

//console.log('constants env', url);

export const getMyTeams = () => {
	return async (dispatch, getState) => {
		// any async code you want!
		const userId = getState().verifyauth.currentUserId;
		const token = getState().verifyauth.token;
		try {
			const response = await fetch(`${url}/api/v1/team/myteams`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache'
				}
			});

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const resData = await response.json();

			//console.log('response from myTeams server', resData.team);
			let myTeams = [];
			//_keyExtractor = (item, index) => item._id.toString();
			// const key = this._id

			// for (const key in resData.team) {
			//     myTeams.push(
			//         new Team(
			//             key,

			//             //resData[_id].creatorId,
			//             resData[key].name,
			//             //resData[key].imagesUrl,
			//             resData[key].acronym,
			//             resData[key].color
			//         )
			//     );
			// }

			myTeams = resData.team;

			//console.log('actions page myTeams', myTeams);

			dispatch({
				type: GET_MY_TEAMS,
				myteams: myTeams
				// userProducts: myTeams.filter(team => team.ownerId === userId)
			});
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;

			c;
		}
	};
};

export const createteamaction = (name, acronym, selectedColor, _id) => {
	return (dispatch, getState) => {
		const userId = getState().verifyauth.currentUserId;

		//dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: CREATE_TEAM, name: name, acronym: acronym, color: selectedColor, _id: _id });
	};
};

export const createteam = (name, acronym, selectedColor) => {
	return async (dispatch, getState) => {
		const token = getState().verifyauth.token;

		//console.log('getting token?', token);
		const response = await fetch(`${url}/api/v1/team`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				acronym: acronym,
				color: selectedColor

				//returnSecureTokarb8b834en: true
			})
		});

		////console.log("this is the action sending data", phoneauth.body)

		if (!response.ok) {
			const errorResData = await response.json();
			//console.log(errorResData);

			const errorId = errorResData.error.message;
			let message = 'Team Creation Failed! Please Try Again';
			// if (errorId === 'EMAIL_EXISTS') {
			//   message = 'This email exists already!';
			// }
			throw new Error(message);
		}

		const resData = await response.json();

		//console.log('resdata frm signup', resData);

		dispatch(
			createteamaction(
				resData.data.team.name,
				resData.data.team.acronym,
				resData.data.team.color,
				resData.data.team._id
			)
		);
	};
};

export const uploadLogo = (form) => {
	return async (dispatch, getState) => {
		const token = getState().verifyauth.token;
		const teamId = '606f3c7718fda43aea514f6c';

		//console.log('getting token?', token);

		//console.log(' getting form?', form);
		const response = await fetch(`${url}/api/v1/team/teamLogo/${teamId}`, {
			method: 'POST',
			headers: {
				Accept: 'multipart/form-data',
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`
			},
			body: form
		});

		////console.log("this is the action sending data", phoneauth.body)

		if (!response.ok) {
			const errorResData = await response.json();
			//console.log(errorResData);

			const errorId = errorResData.error.message;
			let message = 'Team Logo Upload Failed! Please Try Again';
			// if (errorId === 'EMAIL_EXISTS') {
			//   message = 'This email exists already!';
			// }
			throw new Error(message);
		}

		const resData = await response.json();

		console.log('resdata frm upload logo', resData);
	};
};
