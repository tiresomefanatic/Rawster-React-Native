import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AsyncStorage } from 'react-native';

import { MTabNavigator, AuthNavigator, HomeNavigator } from './MainNavigator';

import StartupScreen from '../screens/StartupScreen';
import SignUpScreen from '../screens/signUp/SignUpScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const AppNavigator = (props) => {
	const isAuth = useSelector((state) => !!state.verifyauth.token);
	const didTryAutoLogin = useSelector((state) => state.verifyauth.didTryAutoLogin);
	const isNewUser = useSelector((state) => state.verifyauth.userStatus == 'NEW_USER');

	const reducerState = useSelector((state) => state.verifyauth);

	// clearAsyncStorage = async () => {
	// 	await AsyncStorage.clear();
	// };

	////console.log('did try auto login?', didTryAutoLogin);

	////console.log('is new user?', isNewUser);

	////console.log('Verify OTP reducer state', reducerState);

	const config = {
		animation: 'spring',
		config: {
			stiffness: 500,
			damping: 100,
			mass: 5,
			overshootClamping: true,
			restDisplacementThreshold: 0.01,
			restSpeedThreshold: 0.01
		}
	};

	if (!isAuth && !didTryAutoLogin) {
		return <StartupScreen />;
	}

	if (didTryAutoLogin) {
		return (
			<NavigationContainer
				options={{
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config
					}
				}}
				theme={{ colors: { background: 'white' } }}
			>
				{isAuth && <HomeNavigator />}
				{!isAuth && didTryAutoLogin && !isNewUser && <AuthNavigator />}
				{!isAuth && didTryAutoLogin && isNewUser && <SignUpScreen />}
			</NavigationContainer>
		);
	}
};

export default AppNavigator;
