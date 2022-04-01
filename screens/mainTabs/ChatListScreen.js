import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
	ScrollView,
	Text,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	FlatList,
	Button,
	ActivityIndicator,
	TextInput,
	Alert,
	SafeAreaView
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';

import Input from '../../components/UI/Input';
import ChatCard from '../../components/UI/ChatCard';

import Card from '../../components/UI/Card';
import COLORS from '../../constants/theme';
import * as chatActions from '../../store/actions/chats';
import ProfileScreen from './SearchScreen';
import MainHeader from '../../components/UI/MainHeader';
import { icons } from '../../constants';
import ClubChat from '../../containers/ClubChat'


const ChatListScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);
	const [ error, setError ] = useState();
	const userId = useSelector((state) => state.verifyauth.currentUserId);
	const memberships = useSelector((state) => state.chats.byId[userId] || []);
	const unreadCount = useSelector((state) => state.unreadMessages);

	const dispatch = useDispatch();

	//console.log('unread messages in screen', unreadCount.unreadCount);
	// TODO

	// CHANNELS ARE UPDATED ON EVERY MESSAGE, SO THAT MEANS MEMBERSHIPS STATE CHANGES
	// RUN LOADCHATS() ON CHANGE TO MEMBERSHIPS STATE
	// LOADCHATS() RUNS UNREAD MESSAGE FUNC AND UPDATES ITS OWN STATE
	// ???PROFIT

	//console.log(' fetching memberships', memberships);

	//const messagesList = messages.sort(message => message.timetoken);

	const uuidChannels = useSelector((state) => {
		const membershipIds = (state.chats.byId[userId] || []).map((m) => m.id);
		return Object.values(state.channel.byId).filter((c) => membershipIds.includes(c.id));
	});

	////console.log('CHATLISSSTTT', ChatList);

	const merged = [
		...uuidChannels
			.concat(unreadCount.unreadCount)
			.reduce((m, o) => m.set(o.id, Object.assign(m.get(o.id) || {}, o)), new Map())
			.values()
	];

	////console.log('mrged', merged);

	const ChatList = merged?.sort((a, b) => -a.updated.localeCompare(b.updated));

	const loadMyChats = useCallback(
		async () => {
			setError(null);

			//setIsRefreshing(true);
			try {
				await dispatch(chatActions.getChats());

				//console.log('loadchats rsn');

				//setIsRefreshing(false);
			} catch (err) {
				setError(err);
			}

			// try {
			//     await dispatch(chatActions.getmessage());

			// } catch (err) {
			//     setError(err);
			// }
		},
		[ dispatch, setIsLoading, setError ]
	);

	useEffect(
		() => {
			const unsubscribe = props.navigation.addListener('focus', loadMyChats);

			return () => {
				unsubscribe();
			};
		},
		[ loadMyChats ]
	);

	useFocusEffect(
	    useCallback(() => {
	        const unsubscribe = props.navigation.addListener('focus', loadMyChats);

	        if (uuidChannels?.length === 0) {
	            return () => unsubscribe();

	        }

	    }, [loadMyChats])
	);

	useEffect(
		() => {
			setIsLoading(true);
			loadMyChats().then(() => {
				setIsLoading(false);
				//console.log('useEFFECT RAN');
			});
		},
		[ JSON.stringify(merged) ]
	);

	// useDeepCompareEffect(
	// 	() => {
	// 		// ...execute your code
	// 		setIsLoading(true);
	// 		loadMyChats().then(() => {
	// 			setIsLoading(false);
	// 			//console.log('DEEEPuseEFFECT RAN');
	// 		});
	// 	},
	// 	[ merged.updated ]
	// );

	if (error) {
		return (
			<SafeAreaView style={styles.centered}>
				<Text>It's time to check your internet connection, buddy.</Text>
				<Button title="Try again" onPress={loadMyChats} color={COLORS.primary} />
			</SafeAreaView>
		);
	}

	if (isLoading && uuidChannels?.length === 0) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	// if (!isLoading) {
	//     return (
	//         <View style={styles.centered}>
	//             <Text>No Chats found</Text>
	//         </View>
	//     );
	// }

	const selectItemHandler = (id, name) => {
		props.navigation.navigate('Chat', {
			// screen: 'Team',
			ChannelId: id,
			ChannelName: name
		});
	};

	

	return (
		<SafeAreaView
			style={{
				backgroundColor: 'white',
				flex: 1,
				flexDirection: 'column'
				// marginTop: 24
			}}
		>
			{/* Header */}
			<MainHeader title="Chat" icon={icons.addChat} />

			{/* Search Start */}
			<View
				style={{
					backgroundColor: 'none',
					marginTop: 8,
					marginHorizontal: 12
				}}
			>
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
					value={''}
					//   onChangeText={(e) => setQuery(e)}
					placeholder="Looking for someone?"
				/>
			</View>
			{/* Search End */}
			<ClubChat/>
			<Text style={styles.Title}>Players</Text>
			<FlatList
				style={styles.List}
				onRefresh={loadMyChats}
				refreshing={isRefreshing}
				data={ChatList} // ------------------>>>>>>> state object of the array
				extraData={merged.unreadCount}
				keyExtractor={(item) => item.id}
				renderItem={(itemData) => (
					<ChatCard 
						// image={itemData.item.imageUrl}
						name={itemData.item.name}
				
						unreadCount ={itemData.item.unreadCount}
						
						
						onSelect={() => {
							selectItemHandler(itemData.item.id, itemData.item.name);
						}}
					>
						{/* <Button
                        color={COLORS.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    /> */}
					</ChatCard>
				)}
			/>
		</SafeAreaView>
	);
};

export const screenOptions = {
	headerTitle: 'Chat'
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
	},
	Title:{
		fontSize:16,
		marginLeft:12,
		marginBottom:12
	},
	List: {
		backgroundColor: 'white',
		padding: 16,
	},
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ClubItem:{

	},
	ClubDp:{

	},
});

export default ChatListScreen;
