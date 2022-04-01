import { AsyncStorage } from 'react-native';
//import { API_URL } from '@env'


import ENV from "../../env";



export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const REQUEST_OTP = 'REQUEST_OTP';




export const url = ENV.apiUrl;

//console.log("constants env", url)








export const requestotp = (status, message, phone) => {
  return dispatch => {
    //dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: REQUEST_OTP, status: status, message: message, phone: phone });
  };
};

export const requestotpauth = (phone, type) => {
  return async dispatch => {
    const response = await fetch(`${url}/api/v1/user/auth`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          phone: phone,

          type: "REQUEST"
          //returnSecureTokarb8b834en: true
        })

      }
    );

    ////console.log("this is the action sending data", phoneauth.body)

    if (!response.ok) {
      const errorResData = await response.json();
      //console.log(errorResData);

      const errorId = errorResData.error.message;
      let message = 'Failed to send OTP! Check the number you entered or Please try again later.';
      // if (errorId === 'EMAIL_EXISTS') {
      //   message = 'This email exists already!';
      // }
      throw new Error(message);
    }



    const resData = await response.json();


    //console.log(resData);

    dispatch(
      requestotp(
        resData.status,
        resData.message,
        resData.phone

      )
    )



  };
};









// export const logout = () => {
//   //clearLogoutTimer();
//   AsyncStorage.removeItem('userData');
//   return { type: LOGOUT };
// };

// // const clearLogoutTimer = () => {
// //   if (timer) {
// //     clearTimeout(timer);
// //   }
// // };

// // const setLogoutTimer = expirationTime => {
// //   return dispatch => {
// //     timer = setTimeout(() => {
// //       dispatch(logout());
// //     }, expirationTime);
// //   };
// // };


