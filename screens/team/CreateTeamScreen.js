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
	Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import { ColorPicker } from 'react-native-status-color-picker';
//import PrimaryBtn from '../../components/UI/PrimaryBtn';

import COLORS, { FONTS } from '../../constants/theme';
import * as teamActions from '../../store/actions/Teams';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '../../constants';

import ImagePicker from '../../components/UI/ImagePicker';

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

		const touched = {
			...state.touched,
			[action.input]: action.touched
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues,
			touched: touched
		};
	}
	return state;
};

const CreateTeamScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();
	//const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const [ didFinishCreating, setDidFinishCreating ] = useState(false);
	const [ selectedImage, setSelectedImage ] = useState();

	const colors = [
		'#E81C2B',
		'#F4891E',
		'#EACE2A',
		'#0AA34F',
		'#459FE3',

		'#0947E9',
		'#D70B8F',
		'#693399',
		'#ffffff',
		'#c9c9c9',
		'#000000'
	];

	const [ selectedColor, setSelectedColor ] = useState();

	// setColor = color => ({ selectedColor: color });

	//console.log('didFinishCreating', didFinishCreating);
	//console.log('image ', selectedImage);

	const handleColor = (color) => {
		setSelectedColor(color);
		//console.log('picked color', selectedColor);
	};

	// upload image
	const imageTakenHandler = (imagePath) => {
		setSelectedImage(imagePath);
	};

	var form = new FormData();
	form.append('teamLogo', selectedImage);

	const [ formState, dispatchFormState ] = useReducer(formReducer, {
		inputValues: {
			name: '',
			acronym: ''
		},

		touched: false
		// inputValidities: {
		//     phone: false,
		// },

		// formIsValid: false
	});

	// useEffect(
	// 	() => {
	// 		if (error) {
	// 			Alert.alert('You need to enter the details', error, [ { text: 'Okay' } ]);
	// 		}
	// 	},
	// 	[ error ]
	// );

	//console.log('create team formstate ', formState);

	useEffect(
		() => {
			return props.navigation.addListener('beforeRemove', (e) => {
				if (!formState.touched) {
					// If we don't have unsaved changes, then we don't need to do anything
					return;
				}

				if (didFinishCreating == true && formState.touched) {
					// If we don't have unsaved changes, then we don't need to do anything
					return;
				}

				// Prevent default behavior of leaving the screen
				e.preventDefault();
				// Prompt the user before leaving the screen
				Alert.alert('Are you sure?', 'Any changes will be lost . ', [
					{ text: "Don't leave", style: 'cancel', onPress: () => {} },
					{
						text: 'Leave',
						style: 'destructive',
						// If the user confirmed, then we dispatch the action we blocked earlier
						// This will continue the action that had triggered the removal of the screen
						onPress: () => props.navigation.dispatch(e.data.action)
					}
				]);
			});
		},
		[ formState, didFinishCreating ]
	);

	const authHandler = async () => {
		let action;

		if (!selectedColor) {
			Alert.alert('Pick A Fuckin color!', error, [ { text: 'Okay' } ]);
		} else {
			action = teamActions.createteam(formState.inputValues.name, formState.inputValues.acronym, selectedColor);
			setError(null);
			setIsLoading(true);
			try {
				await dispatch(action);
				setDidFinishCreating(true);
				//props.navigation.navigate("Home")
				Alert.alert(
					'Success',
					'Team Created!',
					[ { text: 'Ok', onPress: () => props.navigation.navigate('Home') } ],
					{ cancelable: false }
				);
				setIsLoading(false);
			} catch (err) {
				setError(err.message);
				console.log(err);
				setIsLoading(false);
			}
		}
	};

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
		// <Root>
		<ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flex: 1 }}>
			<KeyboardAvoidingView style={styles.Screen}>
				<View style={styles.Container}>
					{/* <ScrollView > */}
					{/* <View style={styles.ImagePicker}>
						<ImagePicker onImageTaken={imageTakenHandler} />
					</View> */}

					{/* <View style={styles.uploadLogo}>
						<TouchableOpacity style={styles.uploadLogo}>
							<Image
								resizeMode="contain"
								source={require('../../assets/svg/home.png')}
								style={{ height: 30, width: 40, marginBottom: 12, tintColor: 'grey' }}
							/>
							<Text style={{ fontWeight: 'bold', color: 'grey' }}>Upload Logo</Text>
						</TouchableOpacity>
					</View> */}
					<Input
						id="name"
						label="Name"
						keyboardType="default"
						//required
						placeholder="ex FC Barcelona"
						placeholderTextColor="grey"
						autoCorrect={false}
						errorText="Please enter a valid acronym."
						onInputChange={inputChangeHandler}
						initialValue=""
						// blur = {//console.log('dm')}
					/>
					<Input
						id="acronym"
						label="Acronym"
						keyboardType="default"
						//required
						blur={console.log(Math.random() * 10)}
						placeholder="ex FCB"
						placeholderTextColor="grey"
						maxLength={3}
						autoCapitalize="characters"
						autoCorrect={false}
						errorText="Please enter a valid acronym."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>

					<View style={styles.colorContainer}>
						<Text style={styles.topText}> Pick your Club Color</Text>

						<ColorPicker colors={colors} selectedColor={selectedColor} onSelect={handleColor} />
					</View>
					{/* {isLoading} */}
				</View>
				{/* select type */}
				<View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
					<Text style={styles.topText}>Club Type</Text>
				</View>
				{/* <PrimaryBtn label = 'ok' onSelect={()=> Toast.show({
        text: 'Wrong password!',
        style:{borderRadius:16,paddingLeft:20}
            })} /> */}

				{/* <PrimaryBtn label="Next" onSelect={authHandler} /> */}

				<View style={styles.buttonContainer}>
					{isLoading}
					<Button title={' Create '} color={COLORS.primary} onPress={authHandler} />
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
		// </Root>
	);
};

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01
	}
};

export const screenOptions = {
	headerTitle: 'Create Team',

	transitionSpec: {
		open: config,
		close: config
	}
};

const styles = StyleSheet.create({
	Screen: {
		// flex: 1,
		backgroundColor: 'white',
		// justifyContent: "center",
		alignItems: 'center',
		paddingTop: 48
		// flexGrow: 1
	},
	Container: {
		width: '100%',
		// maxWidth: 400,
		// maxHeight: 400,
		alignItems: 'flex-start'
	},

	topText: {
		fontSize: 14,
		fontWeight: 'bold',
		// color: 'grey',
		marginLeft: 16,
		marginBottom: 8
	},

	colorContainer: {
		// flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flexDirection: 'column'
	},

	logo: {
		height: 160,
		width: 160,
		alignSelf: 'center',
		justifyContent: 'center',
		marginBottom: 8
		// marginTop:20
	},

	uploadLogo: {
		width: 160,
		height: 160,
		borderRadius: 80,
		// backgroundColor: "grey",
		// marginTop: -48,
		marginBottom: 40,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ImagePicker: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 300,
		width: '100%'
	}
});
export default CreateTeamScreen;
