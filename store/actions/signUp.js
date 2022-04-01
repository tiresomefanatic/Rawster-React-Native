import { AsyncStorage } from 'react-native';
//import { API_URL } from '@env'

import ENV from '../../env';

export const SIGNUP = 'SIGNUP';

export const url = ENV.apiUrl;

//console.log("constants env", url)

export const signupaction = (userStatus, currentUserId, token, firstname, lastname, phone) => {
	return (dispatch) => {
		//dispatch(setLogoutTimer(expiryTime));
		dispatch({
			type: SIGNUP,
			userStatus: 'OLD_USER',
			currentUserId: currentUserId,
			token: token,
			firstname: firstname,
			lastname: lastname,
			phone: phone
		});

		//pubnub.setUUID(currentUserId)
	};
};

export const signup = (firstname, lastname, email, phone) => {
	return async (dispatch) => {
		const response = await fetch(`${url}/api/v1/user/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstname: firstname,
				lastname: lastname,
				email: email,

				phone: phone

				//returnSecureTokarb8b834en: true
			})
		});

		////console.log("this is the action sending data", phoneauth.body)

		if (!response.ok) {
			const errorResData = await response.json();
			//console.log(errorResData);

			const errorId = errorResData.error.message;
			let message = 'SignUp Failed! Please Try Again';
			// if (errorId === 'EMAIL_EXISTS') {
			//   message = 'This email exists already!';
			// }
			throw new Error(message);
		}

		const resData = await response.json();

		//console.log("resdata frm signup", resData);

		dispatch(
			signupaction(
				resData.userStatus,
				resData.currentUserId,
				resData.token,
				resData.firstname,
				resData.lastname,
				resData.profile_pic
			)
		);

		saveDataToStorage(
			resData.userStatus,
			resData.currentUserId,
			resData.token,
			resData.firstname,
			resData.lastname,
			resData.profile_pic
		);
	};
};

const saveDataToStorage = (userStatus, currentUserId, token, firstname, lastname, profile_pic) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			userStatus: userStatus,

			currentUserId: currentUserId,

			token: token,

			firstname,

			lastname,

			profile_pic
		})
	);
};
