import { CREATE_TEAM, GET_MY_TEAMS } from '../actions/Teams';
import { INVITE_FETCH_SUCCESS, REFRESH_SEARCH } from '../actions/search';

import Team from '../../models/team';

const initialState = {
	myTeams: [],

	SearchResults: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_MY_TEAMS:
			return {
				myTeams: action.myteams
				//userProducts: action.userProducts
			};

		case CREATE_TEAM:
			const newTeam = new Team(action._id, action.name, action.acronym, action.color);
			return {
				...state,
				myTeams: state.myTeams.concat(newTeam)
			};

		case INVITE_FETCH_SUCCESS:
			return {
				SearchResults: action.result
			};

		case INVITE_FETCH_SUCCESS:
			return null;

		default:
			return state;
	}
};
