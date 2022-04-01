
import { ACTIVE_CHAT_EXISTS } from '../actions/chats';
import { ACTIVE_CHAT_DOES_NOT_EXISTS } from '../actions/chats';


const initialState = {

  activeChatExists: false,
  recieverUserId: null,
  firstname: null,
  lastname: null,
  channelId: null,







};

export default (state = initialState, action) => {
  switch (action.type) {

    case ACTIVE_CHAT_EXISTS:
      return {


        activeChatExists: true,
        recieverUserId: action.recieverUserId,
        firstname: action.firstname,
        lastname: action.lastname,
        channelId: action.channelId

      };

    case ACTIVE_CHAT_DOES_NOT_EXISTS:
      return {


        activeChatExists: false,
        recieverUserId: action.recieverUserId,
        firstname: null,
        lastname: null,
        channelId: action.channelId

      };



    default:
      return state;

  }

};


