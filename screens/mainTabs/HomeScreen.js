import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
	ScrollView,
	Text,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	Button,
	ActivityIndicator,
	Alert,
	SafeAreaView,
	TextInput,
	Image,
	StatusBar,
	AsyncStorage
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import QuickAction from '../../components/UI/QuickAction';
import MainHeader from '../../components/UI/MainHeader';
import { COLORS, icons, images } from '../../constants';
import * as chatActions from '../../store/actions/chats';
import * as authActions from '../../store/actions/verifyOtp';

import { sendMessage } from 'pubnub-redux';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Feed from '../../containers/Feed';

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

const HomeScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();
	//const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();

	const deleteChannel = useCallback(
		async () => {
			setError(null);

			//setIsRefreshing(true);
			try {
				await dispatch(chatActions.deletechannel());
			} catch (err) {
				setError(err);
			}

			// setIsRefreshing(false);
		},
		[ dispatch, setIsLoading, setError ]
	);

	const removeChannel = useCallback(
		async () => {
			setError(null);

			//setIsRefreshing(true);
			try {
				await dispatch(chatActions.removechannel());
			} catch (err) {
				setError(err);
			}

			// setIsRefreshing(false);
		},
		[ dispatch, setIsLoading, setError ]
	);

	// const messageSendHandler = async () => {
	//     let action;

	//     action = chatActions.getmessage
	//     setError(null);
	//     setIsLoading(false);
	//     try {
	//         await dispatch(action);

	//     } catch (err) {
	//         setError(err.message);
	//         setIsLoading(true);
	//     }

	// };

	const [ formState, dispatchFormState ] = useReducer(formReducer, {
		inputValues: {
			message: ''
		},

		touched: false
		// inputValidities: {
		//     phone: false,
		// },

		// formIsValid: false
	});

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity, touched) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
				touched: true
			});
		},
		[ dispatchFormState ]
	);

	return (
		<SafeAreaView style={styles.gradient}>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

			<ScrollView style={styles.screen}>
				{/* post section start */}
				<MainHeader title="Home" icon={icons.search} />
				{/* <View
					style={{
						height: 96,
						width: '100%',
						alignItems: 'center',
						// backgroundColor: "red",
						justifyContent: 'center'
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							padding: 8,
							justifyContent: 'center'
						}}
					>
						<TextInput
							style={{
								backgroundColor: COLORS.lightGray,
								borderBottomWidth: 0.5,
								borderBottomColor: COLORS.secondary,
								height: 36,
								width: '100%',
								borderRadius: 20,
								padding: 4,
								paddingHorizontal: 16
							}} //height is required for render
							value={''}
							onChangeText={(e) => setQuery('')}
							placeholder="Say something here"
						/>
					</View> */}
					{/* quick actions */}
					{/* <View style={{ flex: 1 }}>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							horizontal
							contentContainerStyle={{
								//flexGrow: 1,
								alignItems: 'center',
								justifyContent: 'space-between',
								start: 8
							}}
						>
							<QuickAction
								color={COLORS.Red}
								title="New Game"
								icon={icons.lit}
								navigateTo={() => props.navigation.navigate('New Lobby')}
							/>
							<QuickAction
								color={COLORS.Purple}
								title="Find Players"
								icon={icons.user}
								navigateTo={() => props.navigation.navigate('TeamSearchScreen')}
							/>
							<QuickAction
								color={COLORS.Blue}
								title="New Club"
								icon={icons.club}
								navigateTo={() => props.navigation.navigate('CreateTeam')}
							/>
							<QuickAction
								color={COLORS.Orange}
								title="My Clubs"
								icon={icons.addedUser}
								navigateTo={() => props.navigation.navigate('MyTeams')}
							/>
							<QuickAction
								color={COLORS.Red}
								title="Upload Logo"
								icon={icons.addedUser}
								navigateTo={() => props.navigation.navigate('Lobby')}
							/>
						</ScrollView>
					</View> */}
				{/* </View> */}
				{/* post section end */}
				{/* Feed Start */}
				<Feed title="Feed" icon={icons.plus} />
				{/* Feed End */}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: 'column',
		// padding: 8,
		marginTop: 4,
		marginBottom: 0,
		width: '100%',
		// backgroundColor:'#f9f9f9'
	},
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
	},
	authContainer: {
		height: 36,
		width: 132,
		backgroundColor: 'black',
		marginRight: 8,
		//width: '80%',
		//maxWidth: 400,
		//maxHeight: 400,
		padding: 4,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer: {
		marginTop: 10
		// marginBottom: 40,
	}
});

export default HomeScreen;
