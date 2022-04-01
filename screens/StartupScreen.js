import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import { COLORS } from '../constants';
import * as authActions from '../store/actions/verifyOtp';

const StartupScreen = (props) => {
	const dispatch = useDispatch();

	useEffect(
		() => {
			const tryLogin = async () => {
				const userData = await AsyncStorage.getItem('userData');

				console.log('async storage', userData);
				if (!userData) {
					// props.navigation.navigate('Request');
					dispatch(authActions.setDidTryAL());
					return;
				}
				const transformedData = JSON.parse(userData);
				const { userStatus, currentUserId, token, firstname, lastname, profile_pic } = transformedData;

				dispatch(authActions.authenticate(userStatus, currentUserId, token, firstname, lastname, profile_pic));
			};

			tryLogin();
		},
		[ dispatch ]
	);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={COLORS.primary} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default StartupScreen;
