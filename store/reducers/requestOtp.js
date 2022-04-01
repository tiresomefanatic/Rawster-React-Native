import { REQUEST_OTP, SET_DID_TRY_AL } from '../actions/requestOtp';

const initialState = {

  phone: null,
  status: null,
  message: null,





};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_OTP:
      return {
        status: action.status,
        message: action.message,
        phone: action.phone,
        didTryAutoLogin: true
      };





    default:
      return state;

  }

};


