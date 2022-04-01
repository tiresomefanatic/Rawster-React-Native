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
	SafeAreaView,
	FlatList
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import * as searchActions from '../../store/actions/search';

import InviteUserCard from '../../components/UI/InviteUserCard';

import { REFRESH_SEARCH } from '../../store/actions/search';

import MainHeader from '../../components/UI/MainHeader';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import COLORS from '../../constants/theme';
import { icons } from '../../constants';

const SearchScreen = (props) => {
	const result = useSelector((state) => state.teams.SearchResults);
	const [ query, setQuery ] = useState('');
	const firstrender = useRef(true);
	const [ isLoading, setIsLoading ] = useState(false);

	const dispatch = useDispatch();

	//console.log('search query', query);

	//console.log('is getting response?', result);

	const searchUsers = useCallback(
		async (query) => {
			//console.log('is usecallback getting fired');

			setIsLoading(true);

			try {
				await dispatch(searchActions.searchUsersToInvite(query)).then(() => {
					setIsLoading(false);
				});
			} catch (err) {
				//console.log('its an error in the searchusers func', err);
			}
		},
		[ dispatch, setIsLoading, query ]
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

	useEffect(
		() => {
			//console.log('is refresh useEffect firing?');

			if (firstrender.current) {
				firstrender.current = false;
				return;
			}

			if (query.length === 0) {
				dispatch({
					type: REFRESH_SEARCH
				});
			}
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
			<MainHeader title="Invite To Team" icon={icons.settings} />
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
			>
				{isLoading === true && (
					<View style={styles.centered}>
						<ActivityIndicator size="large" color='tomato'  />
					</View>
				)}

				{query.length === 0 &&
				isLoading === false && (
					<View
						style={{
							backgroundColor: 'white',
							alignItems: 'center'
							//flex: 6
						}}
					>
						<Text
							style={{
								color: 'black',
								fontSize: 16,
								fontWeight: 'bold'
							}}
						>
							Start Typing to Search
						</Text>
					</View>
				)}

				{query.length > 0 &&
				isLoading === false && (
					<View
						style={{
							backgroundColor: 'white'
							//flex: 6
						}}
					>
						<FlatList
							style={styles.List}
							//onRefresh={loadMyChats}
							//refreshing={isRefreshing}
							data={result} // ------------------>>>>>>> state object of the array
							//extraData={merged.unreadCount}
							keyExtractor={(item) => item._id}
							renderItem={(itemData) => (
								<InviteUserCard
									// image={itemData.item.imageUrl}
									firstname={itemData.item.firstname}
									lastname={itemData.item.lastname}
									invitestatus={itemData.item.invitestatus}
									// onSelect={() => {
									// 	selectItemHandler(itemData.item.id, itemData.item.name);
									// }}
								>
									{/* <Button
                        color={COLORS.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    /> */}
								</InviteUserCard>
							)}
						/>
					</View>
				)}

				{Object.keys(query).length > 0 &&
				Object.keys(result).length === 0 &&
				isLoading === false && (
					<View
						style={{
							backgroundColor: 'white',
							alignItems: 'center'
							//flex: 6
						}}
					>
						<Text
							style={{
								color: 'black',
								fontSize: 16,
								fontWeight: 'bold'
							}}
						>
							No Results Found
						</Text>
					</View>
				)}
			</View>
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

	centered: { justifyContent: 'center', alignItems: 'center' },

	List: {
		backgroundColor: 'white',
		padding: 16
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
