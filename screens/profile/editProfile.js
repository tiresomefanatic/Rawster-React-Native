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
import * as userActions from '../../store/actions/verifyOtp';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from '../../constants';


import ImagePicker from '../../components/UI/ImagePicker';

import mime from 'mime';

const EditProfileScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();

	const dispatch = useDispatch();

	const [ selectedImage, setSelectedImage ] = useState();

	// setColor = color => ({ selectedColor: color });

	////console.log('image selected url ', selectedImage);

	// upload image
	const imageTakenHandler = (imagePath) => {
		setSelectedImage(imagePath);
	};

	// let form = new FormData();
	// form.append('teamLogo', selectedImage);

	//const newImageUri = 'file:///' + selectedImage?.split('file:/').join('');

	const form = new FormData();
	form.append('profilePic', {
		uri: selectedImage,
		type: mime.getType(selectedImage),
		name: selectedImage?.split('/').pop()
	});

	console.log('image form ', form);

	const uploadHandler = async () => {
		let action;

		// if (!selectedImage) {
		// 	Alert.alert('No Image Selected', error, [ { text: 'Okay' } ]);
		// } else {
		action = userActions.uploadProfilePic(form);
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);

			//props.navigation.navigate("Home")
			Alert.alert(
				'Success',
				'Team Logo Updated',
				[ { text: 'Ok' } ],
				{ cancelable: false }
			);
			setIsLoading(false)
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
		//}
	};

	return (
		// <Root>
		<ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flex: 1 }}>
			<KeyboardAvoidingView style={styles.Screen}>
				<View >
					{/* <ScrollView > */}
					<ImagePicker onImageTaken={imageTakenHandler} />
				</View>

              {/* if {

			  } else {
				  
			  } */}

				<View style={styles.buttonContainer}>
					{isLoading 
					? <ActivityIndicator/>
					: <Button title={' Update Profile Picture '} color={COLORS.primary} onPress={uploadHandler} /> 
					
					}
					
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

export const screenOptions = (navData) => {
	headerTitle: 'Create Team'

	//transitionSpec: {
	// 	open: config,
	// 	close: config
	// }
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
	}
});
export default EditProfileScreen;
