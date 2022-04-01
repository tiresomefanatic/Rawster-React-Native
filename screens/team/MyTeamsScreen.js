import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ChatCard from '../../components/UI/ChatCard';
import * as teamActions from '../../store/actions/Teams';
import COLORS from '../../constants/theme';
import teams from '../../store/reducers/Teams';
import { useFocusEffect } from '@react-navigation/native';

const MyTeamsScreen = (props) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);
	const [ error, setError ] = useState();
	const myTeams = useSelector((state) => state.teams.myTeams);
	const dispatch = useDispatch();

	const loadMyTeams = useCallback(
		async () => {
			setError(null);

			//setIsRefreshing(true);
			try {
				await dispatch(teamActions.getMyTeams());
			} catch (err) {
				setError(err);
			}

			// setIsRefreshing(false);
		},
		[ dispatch, setIsLoading, setError ]
	);

	// useEffect(() => {
	//     const unsubscribe = props.navigation.addListener('focus', loadMyTeams);

	//     return () => {
	//         unsubscribe();
	//     };
	// }, [loadMyTeams]);

	useFocusEffect(
		useCallback(
			() => {
				const unsubscribe = props.navigation.addListener('focus', loadMyTeams);

				if (myTeams?.length === 0) {
					return () => unsubscribe();
				}
			},
			[ myTeams, loadMyTeams ]
		)
	);

	useEffect(
		() => {
			setIsLoading(true);
			loadMyTeams().then(() => {
				setIsLoading(false);
			});
		},
		[ dispatch, loadMyTeams ]
	);

	const selectItemHandler = (_id, name) => {
		props.navigation.navigate('Team', {
			// screen: 'Team',
			teamId: _id,
			teamName: name
		});
	};

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadMyTeams} color={COLORS.primary} />
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={COLORS.primary} />
			</View>
		);
	}

	if (!isLoading && myTeams.length == 0) {
		return (
			<View style={styles.centered}>
				<Text>No Teams found. Maybe start adding some!</Text>
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={loadMyTeams}
			refreshing={isRefreshing}
			data={myTeams} // ------------------>>>>>>> state object of the array
			keyExtractor={(item) => item._id}
			renderItem={(itemData) => (
				<ChatCard
					// image={itemData.item.imageUrl}
					name={itemData.item.name}
					acronym={itemData.item.acronym}
					onSelect={() => {
						selectItemHandler(itemData.item._id, itemData.item.name);
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
	);
};

export const screenOptions = (navData) => {
	return {
		headerTitle: 'My Teams'
		// headerLeft: () => (
		//     <HeaderButtons HeaderButtonComponent={HeaderButton}>
		//         <Item
		//             title="Menu"
		//             iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
		//         // onPress={() => {
		//         //     navData.navigation.toggleDrawer();
		//         // }}
		//         />
		//     </HeaderButtons>
		// ),
		// headerRight: () => (
		//     <HeaderButtons HeaderButtonComponent={HeaderButton}>
		//         <Item
		//             title="Cart"
		//             iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
		//         // onPress={() => {
		//         //     navData.navigation.navigate('Cart');
		//         // }}
		//         />
		//     </HeaderButtons>
		// )
	};
};

const styles = StyleSheet.create({
	centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default MyTeamsScreen;
