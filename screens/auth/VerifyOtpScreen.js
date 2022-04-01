import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, ActivityIndicator, Alert, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import COLORS from '../../constants/theme';
import * as authActions from '../../store/actions/verifyOtp';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
	if (action.type === FORM_INPUT_UPDATE) {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues
		};
	}
	return state;
};

const VerifyOtpScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();
	const [ isSignup, setIsSignup ] = useState(false);
	const dispatch = useDispatch();

	const currentPhone = useSelector((state) => state.requestauth.phone);
	////console.log("am i getting the phone", currentPhone)

	const reducerstate = useSelector((state) => state.verifyauth);

	console.log('login reducer state', reducerstate);

	const [ formState, dispatchFormState ] = useReducer(formReducer, {
		inputValues: {
			otp: '',
			phone: currentPhone
		},
		// inputValidities: {
		//     email: false,
		//     password: false
		// },
		formIsValid: false
	});

	useEffect(
		() => {
			if (error) {
				Alert.alert('An Error Occurred!', error, [ { text: 'Okay' } ]);
			}
		},
		[ error ]
	);

	////console.log(" verify screen ", formState)

	const verifyHandler = async () => {
		let action;
		// if (isSignup) {
		//     action = authActions.signup(
		//         formState.inputValues.email,
		//         formState.inputValues.password
		//     );
		// } else {
		//     action = authActions.login(
		//         formState.inputValues.email,
		//         formState.inputValues.password
		//     );
		// }
		action = authActions.verifyotpauth(formState.inputValues.phone, formState.inputValues.otp);

		////console.log("this is the action goinf from votp screen ", action)

		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
			// props.navigation.navigate('Shop');
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	// //console.log("this is verify handler function", verifyHandler)

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				//isValid: inputValidity,
				input: inputIdentifier
			});
		},
		[ dispatchFormState ]
	);

	return (
		<KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
			<View style={styles.gradient}>
				<View style={styles.authContainer}>
					<Input
						id="otp"
						label="Enter OTP"
						keyboardType="number-pad"
						required
						autoCapitalize="none"
						errorText="Please enter a valid OTP."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>

					<Pressable onPress={verifyHandler} style={styles.buttonContainer}>
						{isLoading}
						<Text
							style={{
								fontSize: 16,
								color: COLORS.COLORS.white,
								fontWeight: '600'
							}}
						>
							Verify
						</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export const screenOptions = {
	headerTitle: 'Verify OTP'
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.COLORS.white
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	authContainer: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20
	},
	buttonContainer: {
		marginTop: 10,
		backgroundColor: COLORS.COLORS.black,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default VerifyOtpScreen;
