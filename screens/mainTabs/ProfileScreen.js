import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	Image,
	ScrollView,
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	StatusBar,
	Animated,
	ImageBackground
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import MainHeader from '../../components/UI/MainHeader';
import COLORS from '../../constants/theme';
import { icons, images } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import * as profileActions from '../../store/actions/verifyOtp';

import { useNavigation } from '@react-navigation/native';

const cover_expand = 35;
const cover_narrow = 90;
const PROFILE_BANNER_URI = 'https://pbs.twimg.com/profile_banners/3296259169/1438473955/1500x500';

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const BlockButton = (props) => {
	return (
		<TouchableOpacity
			style={{
				height: 160,
				...ifIphoneX({ width: 180 }, { width: 210 }),
				backgroundColor: COLORS.COLORS.black,
				marginHorizontal: 4,
				borderRadius: 12,
				justifyContent: 'center',
				alignItems: 'center'
			}}
			onPress={props.onPress}
		>
			<Image source={props.icon} style={{ height: 24, width: 24, tintColor: 'white' }} />
			<Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}> {props.label} </Text>
		</TouchableOpacity>
	);
};

const SmallIconButton = (props) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				height: 32,
				width: 80,
				alignSelf: 'flex-end',
				borderRadius: 16,
				borderWidth: 1,
				borderColor: COLORS.COLORS.Orange
			}}
			onPress={props.onSelect}
		>
			<Image
				source={icons.edit}
				style={{
					height: 14,
					width: 14,
					right: 4,
					tintColor: COLORS.COLORS.primary
				}}
				resizeMode="cover"
			/>
			<Text style={{ color: COLORS.COLORS.primary }}>Edit</Text>
		</TouchableOpacity>
	);
};

const ProfilePicture = (props) => {
	const firstname = useSelector((state) => state.verifyauth.firstname);
	const lastname = useSelector((state) => state.verifyauth.lastname);
	const profilePic = useSelector((state) => state.verifyauth.profile_pic);
	const [ isShowLoading, setIsShowLoading ] = useState(false);
	const navigation = useNavigation();

	// if (isShowLoading == true) {
	// 	return <ActivityIndicator size="large" color="#0000ff" />;
	// }

	return (
		<View style={styles.PlayerCard}>
			{/* Player details */}
			<View style={styles.DetailsContainer}>
				<Image
					source={{
						uri: profilePic + '?' + new Date()
					}}
					key={profilePic}
					onLoadStart={() => setIsShowLoading(true)}
					onLoadEnd={() => setIsShowLoading(false)}
					resizeMode="cover"
					style={styles.ProfilePicture}
				/>
			</View>
		</View>
	);
};

const ProfileCard = (props) => {
	const firstname = useSelector((state) => state.verifyauth.firstname);
	const lastname = useSelector((state) => state.verifyauth.lastname);
	const profilePic = useSelector((state) => state.verifyauth.profile_pic);
	const [ isShowLoading, setIsShowLoading ] = useState(true);
	const navigation = useNavigation();

	return (
		<View style={styles.PlayerCard}>
			{/* <Image
					source={require('../../assets/images/ground.jpeg')}
					style={{
						height: cover_narrow + cover_expand,
						width: '100%',
						position: 'absolute'
					}}
				/> */}

			<SmallIconButton onSelect={() => navigation.navigate('editProfile')} />

			{/* Player details */}
			<View style={styles.DetailsContainer}>
				<ProfilePicture />

				<Text style={styles.Name}>
					{firstname} {lastname}
				</Text>
			</View>
			<View
				style={{
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginBottom: 16
				}}
			>
				<Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>Bio</Text>
				<Text> 🐐 Left-back, Right-back. bio i will add not a big deal </Text>
			</View>
		</View>
	);
};

const ProfileScreen = (props) => {
	const scrollY = useRef(new Animated.Value(0)).current;
	const insets = useSafeAreaInsets();

	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState();
	const dispatch = useDispatch();

	const userreducer = useSelector((state) => state.verifyauth);

	//console.log('user info recucer state', userreducer);
	const navigation = useNavigation();

	const loadProfile = useCallback(
		async () => {
			setError(null); //setIsRefreshing(true);

			try {
				await dispatch(profileActions.getMyProfile());
				console.log('load profile ran');

				//setIsRefreshing(false);
			} catch (err) {
				setError(err);
			}
		},
		[ dispatch, setIsLoading, setError ]
	);

	// useEffect(
	// 	() => {
	// 		const unsubscribe = props.navigation.addListener('focus', loadProfile);

	// 		return () => {
	// 			unsubscribe();
	// 		};
	// 	},
	// 	[ firstname, lastname, profilePic ]
	// );

	useFocusEffect(
		useCallback(() => {
			// Do something when the screen is focused

			setIsLoading(true);
			loadProfile().then(() => {
				setIsLoading(false);
				console.log('useEFFECT focus profile RAN');
			});

			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, [])
	);

	useEffect(() => {
		setIsLoading(true);
		loadProfile().then(() => {
			setIsLoading(false);
			console.log('useEFFECT first render RAN');
		});
	}, []);

	// if (isLoading) {
	// 	return (
	// 		<View style={styles.centered}>
	// 			<ActivityIndicator size="large" color={COLORS.Orange} />
	// 		</View>
	// 	);
	// }

	return (
		<View style={styles.Container}>
			<StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
			{/* Header Start */}

			{/*  Start*/}
			<ScrollView style={styles.Scroll}>
				<MainHeader title="Profile" icon={icons.settings} />
				{/* Player Card Start */}
				<ProfileCard />
				{/* Player Card End */}
				{/* Player menu */}
				<View
					style={{
						// flex: 1,
						flexDirection: 'column',
						backgroundColor: 'white',
						marginTop: 8,
						alignItems: 'center'
						// backgroundColor:'blue'
					}}
				>
					{/* Row 1 */}
					<Text
						style={{
							alignSelf: 'flex-start',
							left: 8,
							bottom: 8,
							fontWeight: 'bold'
						}}
					>
						Dashboard
					</Text>
					<View
						style={{
							flexDirection: 'row',
							//   justifyContent: "center",
							marginBottom: 8
						}}
					>
						<BlockButton
							label="Clubs"
							icon={icons.club}
							onPress={() => props.navigation.navigate('MyTeams')}
						/>
						<BlockButton label="Friends" icon={icons.addedUser} />
					</View>
					{/* Row 2 */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginBottom: 8
						}}
					>
						<BlockButton label="Games" icon={icons.lit} />
						<BlockButton label="Bookings" icon={icons.ticket} />
					</View>
					{/* Row 3 */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginBottom: 8
						}}
					>
						<BlockButton label="Events" icon={icons.announce} />
						<BlockButton label="Payments" icon={icons.wallet} />
					</View>
					{/* Row 4 */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							marginBottom: 8
						}}
					>
						<BlockButton label="Posts" icon={icons.comments} />
						<BlockButton label="Notifications" icon={icons.notification} />
					</View>
				</View>
				{/* Player menu end */}
			</ScrollView>
			{/* End */}
		</View>
	);
};

export const screenOptions = {
	headerTitle: 'blah'
};

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: 'white'
	},
	Scroll: {
		backgroundColor: 'white',
		flex: 1
	},
	PlayerCard: {
		height: 296,
		width: '100%',
		backgroundColor: COLORS.COLORS.white,
		padding: 8,
		justifyContent: 'center'
	},
	DetailsContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: 16,
		top: 0
	},
	Name: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	ProfilePicture: {
		height: 120,
		width: 120,
		borderRadius: 72,
		marginBottom: 8,
		borderWidth: 2,
		borderColor: COLORS.secondary
	},
	centered: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default ProfileScreen;
