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

const TestImageScreen = (props) => {
	return (
		// <Root>
		<ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flex: 1 }}>
			<KeyboardAvoidingView style={styles.Screen}>
				<View>
					{/* <ScrollView > */}

					<Image
						source={{
							uri:
								'https://rawsterbucket.s3-ap-south-1.amazonaws.com/User-Profile-Pic-6037e5aae225c7d290c2881e.jpg'
						}}
						resizeMode="contain"
						style={styles.ProfilePicture}
					/>
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
	headerTitle: 'Create Team';

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
	},

	ProfilePicture: {
		height: 240,
		width: 240,
		borderRadius: 72,
		marginBottom: 8,
		borderWidth: 2,
		borderColor: COLORS.COLORS.secondary
	}
});
export default TestImageScreen;
