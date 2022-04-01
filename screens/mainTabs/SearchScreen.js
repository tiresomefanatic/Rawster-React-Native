import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import {
	ScrollView,
	Text,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	Button,
	ActivityIndicator,
	Alert,
	TextInput,
	SafeAreaView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/actions/search';

import MainHeader from '../../components/UI/MainHeader';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import COLORS from '../../constants/theme';
import { icons } from '../../constants';

const SearchScreen = (props) => {
	const result = useSelector((state) => state.search.result);
	const [ query, setQuery ] = useState('');
	const firstrender = useRef(true);

	const dispatch = useDispatch();

	//console.log('search query', query);

	//console.log('is getting response?', result);

	const searchUsers = useCallback(
		async (query) => {
			//console.log('is usecallback getting fired');

			try {
				await dispatch(searchActions.searchUsers(query));
			} catch (err) {
				//console.log('its an error in the searchusers func', err);
			}
		},
		[ dispatch, query ]
	);

	useEffect(
		() => {
			//console.log('is useEffect firing?');

			if (firstrender.current) {
				firstrender.current = false;
				return;
			}

			if (query.length === 0) {
				return;
			}

			searchUsers(query, dispatch);
		},
		[ query, dispatch ]
	);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'white'
			}}
		>
			{/* Header Start */}
			<MainHeader title="Profile" icon={icons.settings} />
			{/* <View
        style={{
          backgroundColor: "grey",
          zIndex: 1,
          flex: 0.6,
          flexDirection: "row",
          // marginTop: 48
        }}
      ></View> */}
			{/* Header End */}

			{/* Search Start */}
			<View
				style={{
					backgroundColor: 'none',
					flex: 1,
					marginTop: 8,
					marginHorizontal: 12
				}}
			>
				<Text
					style={{
						fontWeight: 'bold',
						marginLeft: 8
					}}
				>
					Search
				</Text>
				<TextInput
					style={{
						backgroundColor: '#ededed',
						height: 40,
						width: '100%',
						marginTop: 4,
						borderRadius: 20,
						padding: 4,
						paddingHorizontal: 16
					}} //height is required for render
					value={query}
					onChangeText={(e) => setQuery(e)}
					placeholder="Looking for someone?"
				/>
			</View>
			{/* Search End */}

			{/* Teams Start*/}
			<View
				style={{
					backgroundColor: 'white',
					flex: 6
				}}
			/>
			{/* Team End */}
		</SafeAreaView>
	);
};

export const screenOptions = {
	headerTitle: 'blah'
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
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
		marginTop: 10
	}
});

export default SearchScreen;
