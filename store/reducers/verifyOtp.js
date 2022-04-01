import { SET_DID_TRY_AL, AUTHENTICATE, UPDATE_INFO, GO_TO_SIGNUP } from '../actions/verifyOtp';
import { SIGNUP } from '../actions/signUp';

const initialState = {
	phone: null,
	userStatus: null,
	currentUserId: null,
	firstname: null,
	lastname: null,
	token: null,
	profile_pic: null,

	didTryAutoLogin: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				userStatus: action.userStatus,
				token: action.token,
				currentUserId: action.currentUserId,
				firstname: action.firstname,
				lastname: action.lastname,
				profile_pic: action.profile_pic,
				didTryAutoLogin: true
			};
		case UPDATE_INFO:
			return {
				userStatus: 'OLD_USER',
				token: action.token,
				currentUserId: action.currentUserId,
				firstname: action.firstname,
				lastname: action.lastname,
				profile_pic: action.profile_pic,
				didTryAutoLogin: true
			};

		case SIGNUP:
			return {
				userStatus: 'OLD_USER',
				token: action.token,
				currentUserId: action.currentUserId,
				firstname: action.firstname,
				lastname: action.lastname,
				profile_pic: action.profile_pic,
				didTryAutoLogin: true
			};
		case GO_TO_SIGNUP:
			return {
				userStatus: action.userStatus,
				token: null,
				currentUserId: null,
				firstname: null,
				lastname: null,
				didTryAutoLogin: true
			};

		case SET_DID_TRY_AL:
			return {
				...state,
				didTryAutoLogin: true
			};

		default:
			return state;
	}
};
