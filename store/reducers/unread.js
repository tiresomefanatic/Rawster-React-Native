import { UPDATE_UNREAD } from '../actions/chats';

const initialState = {
	unreadCount: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_UNREAD:
			return {
				unreadCount: action.unreadCount
			};

		default:
			return state;
	}
};
