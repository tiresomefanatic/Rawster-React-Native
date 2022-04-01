import { FETCH_START, FETCH_SUCCESS, FETCH_FAILURE, REFRESH_SEARCH } from '../actions/search';

const initialState = {
	result: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SUCCESS:
			return {
				result: action.result
			};

		default:
			return state;
	}
};
