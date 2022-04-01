import { AsyncStorage } from 'react-native';
//import pubnub from 'pubnub'
import { setUserData } from 'pubnub-redux';
//import { API_URL } from '@env'
import { pubnub } from './../../App';

import ENV from '../../env';

export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const AUTHENTICATE = 'AUTHENTICATE';

export const UPDATE_INFO = 'UPDATE_INFO';

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP';

export const url = ENV.apiUrl;

//console.log('constants env', url);

export const setDidTryAL = () => {
	return { type: SET_DID_TRY_AL };
};

export const verifyotpauth = (phone, otp, type) => {
	return async (dispatch) => {
		const response = await fetch(`${url}/api/v1/user/auth`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				phone: phone,
				otp: otp,

				type: 'VERIFY'
				//returnSecureToken: true
			})
		});

		if (!response.ok) {
			const errorResData = await response.json();
			//console.log(errorResData);

			const errorId = errorResData.error.message;
			let message = 'Check Entered OTP';

			throw new Error(message);
		}

		const resData = await response.json();

		console.log('response data from verify otp', resData);

		if (resData.userStatus == 'OLD_USER') {
			dispatch(
				authenticate(
					resData.userStatus,
					resData.currentUserId,
					resData.token,
					resData.firstname,
					resData.lastname,
					resData.profile_pic.path
				)
			);
			saveDataToStorageLogin(
				resData.userStatus,
				resData.currentUserId,
				resData.token,
				resData.firstname,
				resData.lastname,
				resData.profile_pic.path
			);
		} else if (resData.userStatus == 'NEW_USER') {
			dispatch({
				type: GO_TO_SIGNUP,
				userStatus: resData.userStatus
			});
		}
	};
};

export const authenticate = (userStatus, currentUserId, token, firstname, lastname, profile_pic) => {
	return (dispatch) => {
		// dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: AUTHENTICATE,
			userStatus: userStatus,
			currentUserId: currentUserId,
			token: token,
			firstname: firstname,
			lastname: lastname,
			profile_pic: profile_pic
		});

		pubnub
			.setUUID(currentUserId)
			.then(() => {
				pubnub.objects
					.setUUIDMetadata({
						uuid: currentUserId,
						data: {
							name: firstname + '' + lastname,
							profileUrl: profile_pic
						}
					})
					.then(() => {
						pubnub.getUUID();
					})
					.catch((err) => {
						return next(new AppError(err.message, 500));
					});
			})
			.catch((err) => {
				return next(new AppError(err.message, 500));
			});

		console.log('authenticate ran');
		console.log('user id?', currentUserId);
	};
};

const saveDataToStorageLogin = (userStatus, currentUserId, token, firstname, lastname, profile_pic) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			userStatus,

			currentUserId: currentUserId,

			token: token,

			firstname: firstname,

			lastname: lastname,

			profile_pic: profile_pic
		})
	);
};

export const getMyProfile = () => {
	return async (dispatch, getState) => {
		console.log('function rannnn?');
		const token = getState().verifyauth.token;
		const userId = getState().verifyauth.currentUserId;

		const response = await fetch(`${url}/api/v1/user/myprofile`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			const errorResData = await response.json();
			//console.log(errorResData);

			const errorId = errorResData.error.message;
			let message = 'Fetching profile failed, reload';

			throw new Error(message);
		}

		const resData = await response.json();

		console.log('response data from getmy profile', resData);

		dispatch(
			updateprofileinfo(
				resData.userStatus,
				resData.currentUserId,
				token,
				resData.firstname,
				resData.lastname,
				resData.profile_pic
			)
		);
		saveDataToStorageUpdate(
			'OLD_USER',
			resData.currentUserId,
			token,
			resData.firstname,
			resData.lastname,
			resData.profile_pic
		);
	};
};

export const updateprofileinfo = (userStatus, currentUserId, token, firstname, lastname, profile_pic) => {
	return (dispatch) => {
		// dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: UPDATE_INFO,
			userStatus: userStatus,
			token: token,

			currentUserId: currentUserId,

			firstname: firstname,
			lastname: lastname,
			profile_pic: profile_pic
		});

		pubnub
			.setUUID(currentUserId)
			.then(() => {
				pubnub.objects
					.setUUIDMetadata({
						uuid: currentUserId,
						data: {
							name: firstname + '' + lastname,
							profileUrl: profile_pic
						}
					})
					.then(() => {
						pubnub.getUUID();
					})
					.catch((err) => {
						return next(new AppError(err.message, 500));
					});
			})
			.catch((err) => {
				return next(new AppError(err.message, 500));
			});
	};
};

const saveDataToStorageUpdate = (userStatus, currentUserId, token, firstname, lastname, profile_pic) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			userStatus: userStatus,

			currentUserId: currentUserId,

			token: token,

			firstname: firstname,

			lastname: lastname,

			profile_pic: profile_pic
		})
	);
};

export const uploadProfilePic = (form) => {
	return async (dispatch, getState) => {
		const token = getState().verifyauth.token;
		const userId = getState().verifyauth.currentUserId;

		//console.log('getting token?', token);

		//console.log(' getting form?', form);
		const response = await fetch(`${url}/api/v1/user/profilePic/${userId}`, {
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
			let message = 'Profile Pic upload failed! Please Try Again';
			// if (errorId === 'EMAIL_EXISTS') {
			//   message = 'This email exists already!';
			// }
			throw new Error(message);
		}

		const resData = await response.json();

		//console.log('resdata frm upload profile pic', resData);
	};
};
