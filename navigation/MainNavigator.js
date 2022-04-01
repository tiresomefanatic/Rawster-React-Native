import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {
//     createDrawerNavigator,
//     DrawerItemList
// } from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/requestOtp';

import { COLORS, SIZES, FONTS, icons } from '../constants/index';

import RequestOtpScreen, { screenOptions as RequestOtpScreenOptions } from '../screens/auth/RequestOtpScreen';

import VerifyOtpScreen, { screenOptions as VerifyOtpScreenOptions } from '../screens/auth/VerifyOtpScreen';

import HomeScreen, { screenOptions as HomeScreenOptions } from '../screens/mainTabs/HomeScreen';

import ProfileScreen, { screenOptions as ProfileScreenOptions } from '../screens/mainTabs/ProfileScreen';

import SearchScreen, { screenOptions as SearchScreenOptions } from '../screens/mainTabs/SearchScreen';

import TeamSearchScreen, { screenOptions as TeamSearchScreenOptions } from '../screens/team/TeamSearchScreen';

import ChatListScreen, { screenOptions as ChatListScreenOptions } from '../screens/mainTabs/ChatListScreen';

import CreateTeamScreen, { screenOptions as CreateTeamScreenOptions } from '../screens/team/CreateTeamScreen';

import MyTeamsScreen, { screenOptions as MyTeamsScreenOptions } from '../screens/team/MyTeamsScreen';

import TeamScreen, { screenOptions as TeamScreenOptions } from '../screens/team/TeamScreen';

import UploadLogoScreen, { screenOptions as UploadLogoScreenOptions } from '../screens/team/uploadLogo';

import ChatScreen, { screenOptions as ChatScreenOptions } from '../screens/chat/ChatScreenEx';

import ExploreScreen from '../screens/mainTabs/ExploreScreen';

import Play from '../screens/mainTabs/Play';

import EditProfileScreen, { screenOptions as EditProfileScreenOptions } from '../screens/profile/editProfile';

import TestImageScreen, { screenOptions as TestImageScreenOptions } from '../screens/profile/testimage';

import StartupScreen from '../screens/StartupScreen';

import BottomTabBar from './CustomTabBar';

import Lobby from '../screens/games/Lobby';
import NewLobby from '../screens/games/NewLobby';

const config = {
	animation: 'timing',
	config: {
		stiffness: 100,
		damping: 10,
		mass: 1,
		overshootClamping: true,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01
	}
};

const defaultNavOptions = {
	headerStyle: {
		// backgroundColor: Platform.OS === 'android' ? COLORS.primary : ''
		backgroundColor: COLORS.white,
		shadowColor: 'transparent'
	},
	headerTitleStyle: {
		fontFamily: 'Inter-Bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'Inter-Regular'
	},
	// headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary
	headerTintColor: COLORS.bgBlack,
	headerBackTitleVisible: false,

	transitionSpec: {
		open: config,
		close: config
	}
};

const tabNavOptions = {
	tabBarOptions: {
		activeBackgroundColor: COLORS.primary,
		inactiveBackgroundColor: COLORS.bgBlack
	},

	swipeEnabled: true
};

const authNavOptions = {
	headerShown: false
};

// const SignUpStackNavigator = createStackNavigator();

// export const SignUpNavigator = () => {
//     return (

//         <SignUpStackNavigator.Screen
//             name="SignUp"
//             component={Screen}
//             options={SignUpScreenOptions}
//         />

//     );
// };

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={authNavOptions}>
			<AuthStackNavigator.Screen name="Request" component={RequestOtpScreen} options={RequestOtpScreenOptions} />
			<AuthStackNavigator.Screen name="Verify" component={VerifyOtpScreen} options={VerifyOtpScreenOptions} />
		</AuthStackNavigator.Navigator>
	);
};

const HomeStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
	return (
		<HomeStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<HomeStackNavigator.Screen
				name="Main Menu"
				component={MTabNavigator}
				// options={{ HomeScreenOptions }, { headerShown: true }}
				options={{
					headerShown: false,
					transitionSpec: {
						open: config,
						close: config
					}
				}}
			/>
			<HomeStackNavigator.Screen
				name="CreateTeam"
				component={CreateTeamScreen}
				options={{
					transitionSpec: {
						open: config,
						close: config
					}
				}}
			/>
			{/* <HomeStackNavigator.Screen
                name="Chats"
                component={ChatListScreen}
                options={ChatListScreenOptions}

            /> */}

			<HomeStackNavigator.Screen name="MyTeams" component={MyTeamsScreen} options={MyTeamsScreenOptions} />
			<HomeStackNavigator.Screen name="Team" component={TeamScreen} options={TeamScreenOptions} />
			<HomeStackNavigator.Screen name="Chat" component={ChatScreen} options={ChatScreenOptions} />
			<HomeStackNavigator.Screen name="SearchScreen" component={SearchScreen} />
			<HomeStackNavigator.Screen name="TeamSearchScreen" component={TeamSearchScreen} />
			<HomeStackNavigator.Screen name="uploadLogo" component={UploadLogoScreen} />
			<HomeStackNavigator.Screen name="editProfile" component={EditProfileScreen} />
			<HomeStackNavigator.Screen name="New Lobby" component={NewLobby} />
			<HomeStackNavigator.Screen name="Lobby" component={Lobby} />
			<HomeStackNavigator.Screen name="testimage" component={TestImageScreen} />
		</HomeStackNavigator.Navigator>
	);
};

const TeamsStackNavigator = createStackNavigator();

export const TeamsNavigator = () => {
	return (
		<TeamsStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<TeamsStackNavigator.Screen name="MyTeams" component={MyTeamsScreen} options={MyTeamsScreenOptions} />
			<TeamsStackNavigator.Screen name="Team" component={TeamScreen} options={TeamScreenOptions} />
			{/* <TeamsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={cartScreenOptions}
            /> */}
		</TeamsStackNavigator.Navigator>
	);
};

const ChatStackNavigator = createStackNavigator();

export const ChatsNavigator = () => {
	return (
		<TeamsStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<TeamsStackNavigator.Screen name="Chats" component={ChatListScreen} options={ChatListScreenOptions} />
			<TeamsStackNavigator.Screen name="Chat" component={ChatScreen} options={ChatScreenOptions} />
			{/* <TeamsStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={cartScreenOptions}
            /> */}
		</TeamsStackNavigator.Navigator>
	);
};

const GamesStackNavigator = createStackNavigator();

export const GamesNavigator = () => {
	return (
		<GamesStackNavigator.Navigator screenOptions={defaultNavOptions}>
			<GamesStackNavigator.Screen name="Lobby" component={Lobby} />
			<GamesStackNavigator.Screen name="Chat" component={ChatScreen} options={ChatScreenOptions} />
		</GamesStackNavigator.Navigator>
	);
};

const MainTabNavigator = createBottomTabNavigator();

export const MTabNavigator = () => {
	return (
		<MainTabNavigator.Navigator
			tabBar={(props) => <BottomTabBar {...props} />}
			labeled={false}
			showIcon={true}
			tabBarOptions={{
				showLabel: false,
				showIcon: true,

				style: {
					backgroundColor: COLORS.white,
					elevation: 1,
					flexDirection: 'row',
					justifyContent: 'center',
					borderTopColor: 'grey',
					zIndex: 99,
					paddingHorizontal: 32,
					paddingVertical: 8,
					alignItems: 'center',
					alignContent: 'center',
					paddingBottom: 24,
					// bottom:20,
					height: '7%',
					width: '100%'
				}
			}}
			//tabBar={(props) => <BottomTabBar {...props} />}
		>
			<MainTabNavigator.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								// top:10,
								height: 40,
								width: 80
								// backgroundColor:'black'
							}}
						>
							<Image
								source={icons.home}
								resizeMode="contain"
								style={{
									height: 28,
									width: 28,
									tintColor: focused ? COLORS.Orange : COLORS.secondary
								}}
							/>
						</View>
					)
				}}
				// options={ }
			/>

			{/* <MainTabNavigator.Screen
				name="Explore"
				component={ExploreScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: 40,
								width: 80
								// top:10
							}}
						>
							<Image
								source={icons.search}
								resizeMode="contain"
								style={{
									height: 28,
									width: 28,
									tintColor: focused ? COLORS.Orange : COLORS.secondary
								}}
							/>
						</View>
					)
				}}
			/> */}
			{/* <MainTabNavigator.Screen
				name="Play"
				component={Play}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: 48,
								width: 48,
								borderRadius: 24,
								backgroundColor: focused ? COLORS.Orange : 'white'
								// top:10
							}}
						>
							<Image
								source={icons.rawster}
								resizeMode="contain"
								style={{
									height: 32,
									width: 32,
									left: 1,
									top: 1

									// borderWidth:1,
									// borderRadius: 20,
									// borderColor: focused ? COLORS.Purple : COLORS.secondary
								}}
							/>
						</View>
					)
				}}
			/> */}

			<MainTabNavigator.Screen
				name="Chats"
				component={ChatListScreen}
				// options={}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								// top:10
								height: 40,
								width: 80
							}}
						>
							<Image
								source={icons.chat}
								resizeMode="contain"
								style={{
									height: 28,
									width: 28,
									tintColor: focused ? COLORS.Orange : COLORS.secondary
								}}
							/>
							{/* <Text>Chat</Text> */}
						</View>
					)
				}}
			/>
			<MainTabNavigator.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: 40,
								width: 80
								// top:10
							}}
						>
							<Image
								source={icons.user}
								resizeMode="contain"
								style={{
									height: 28,
									width: 28,
									tintColor: focused ? COLORS.Orange : COLORS.secondary
								}}
							/>
							{/* <Text>Profile</Text> */}
						</View>
					)
				}}
			/>
		</MainTabNavigator.Navigator>
	);
};

const button1 = () => {
	return (
		<View style={styles.highButton}>
			<Image source={icons.home} />
		</View>
	);
};

const button2 = () => {
	return (
		<View style={styles.highButton}>
			<Image source={icons.chat} />
		</View>
	);
};

const button3 = () => {
	return (
		<View style={styles.highButton}>
			<Image source={icons.user} />
		</View>
	);
};

const styles = StyleSheet.create({
	highButton: {
		bottom: '10%'
	}
});
