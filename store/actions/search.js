import ENV from '../../env';

export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const INVITE_FETCH_SUCCESS = 'FETCH_SUCCESS';
export const REFRESH_SEARCH = 'REFRESH_SEARCH';

export const url = ENV.apiUrl;

export const searchUsers = (query) => {
	return async (dispatch, getState) => {
		// any async code you want!
		// const userId = getState().verifyauth.currentUserId;

		//console.log('search action fireed ');

		const token = getState().verifyauth.token;
		try {
			const response = await fetch(`${url}/api/v1/user/searchusers/${query}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache'
				}
			});

			if (!response.ok) {
				throw new Error('Something went wrong in the action!');
			}

			const resData = await response.json();

			//console.log('response from search results server', resData.data.result);
			let result = [];

			result = resData.data.result;

			//console.log('actions page searchUsers', result);

			dispatch({
				type: FETCH_SUCCESS,
				result: result
			});
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};

export const searchUsersToInvite = (query) => {
	return async (dispatch, getState) => {
		// any async code you want!
		// const userId = getState().verifyauth.currentUserId;

		//console.log('search action fireed ');

		const teamId = '606f3c7718fda43aea514f6c';

		const token = getState().verifyauth.token;
		try {
			const response = await fetch(`${url}/api/v1/team/searchusers/606f3c7718fda43aea514f6c/${query}`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache'
				}
			});

			if (!response.ok) {
				throw new Error('Something went wrong in the action!');
			}

			const resData = await response.json();

			//console.log('response from search results server', resData.data.result);
			let result = [];

			result = resData.data.result;

			//console.log('actions page searchUsers', result);

			dispatch({
				type: INVITE_FETCH_SUCCESS,

				result: result
			});
		} catch (err) {
			//console.log('error from action ', err);
			// send to custom analytics server
			throw err;
		}
	};
};
