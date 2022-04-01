import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import ReduxThunk from 'redux-thunk';

import requestauthReducer from './store/reducers/requestOtp';
import verifyauthReducer from './store/reducers/verifyOtp';
import teamsReducer from './store/reducers/Teams';
import searchReducer from './store/reducers/search';
import unreadReducer from './store/reducers/unread';

import AppNavigator from './navigation/RootNavigator';

import Pubnub from 'pubnub';
import {
	createPubNubListener,
	createUserDataReducer,
	createChannelDataReducer,
	createMembershipReducer,
	createMessageReducer,
	//createTypingIndicatorsListener,
	createUserDataListener,
	createChannelDataListener,
	createMembershipListener,
	createMessageListener,
	createChannelsListReducer
} from 'pubnub-redux';

import { PubNubProvider } from 'pubnub-react';

import PubnubKeys from './config/pubnub-keys.json';
import { SafeAreaView } from 'react-native';

const rootReducer = combineReducers({
	requestauth: requestauthReducer,
	verifyauth: verifyauthReducer,
	teams: teamsReducer,
	search: searchReducer,

	user: createUserDataReducer(),
	channel: createChannelDataReducer(),
	chats: createMembershipReducer(),
	unreadMessages: unreadReducer,

	messages: createMessageReducer()
});

const pubnubConfig = Object.assign(
	{},
	{
		publishKey: 'pub-c-803992ed-800c-4961-bd57-4f4d961e7b41',
		subscribeKey: 'sub-c-63347edc-4611-11eb-9d3f-7e8713e36938'
		//uuid: "5f93333053d406d9bbeaddd3",
		//restore: true,
		//logVerbosity: true
		//heartbeatInterval: 0
	}
);
export const pubnub = new Pubnub(pubnubConfig);

//const context = PubnubThunkContext;

let thunkArgument = {
	pubnub: {
		api: pubnub
	}
	// context: context
};

let middleware = applyMiddleware(ReduxThunk.withExtraArgument(thunkArgument));

export const store = createStore(rootReducer, middleware);

////console.log("this is the store", rootReducer)

const leaveApplication = () => {
	// This is required to show the current user leave immediately rather than
	// wating for the timeout period
	pubnub.unsubscribeAll();
};

const fetchFonts = () => {
	return Font.loadAsync({
		'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
		'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
		'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
		'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
		'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
		'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf')
	});
};

export default function App() {
	const [ fontLoaded, setFontLoaded ] = useState(false);

	useEffect(() => {
		pubnub.addListener(createPubNubListener(store.dispatch));
		// pubnub.addListener(createTypingIndicatorsListener(store.dispatch));
		pubnub.addListener(createUserDataListener(store.dispatch));
		pubnub.addListener(createChannelDataListener(store.dispatch));
		pubnub.addListener(createMembershipListener(store.dispatch));
		pubnub.addListener(createMessageListener(store.dispatch));
	}, []);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setFontLoaded(true);
				}}
			/>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, display: 'flex' }}>
			<Provider store={store}>
				<PubNubProvider client={pubnub}>
					<AppNavigator />
				</PubNubProvider>
			</Provider>
		</SafeAreaView>
	);
}
