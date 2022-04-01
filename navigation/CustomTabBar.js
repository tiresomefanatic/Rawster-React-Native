import React from 'react';
import { View, Text, Image, Platform, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import Svg, { Path } from 'react-native-svg';
import IonIcon from 'react-native-vector-icons/Ionicons';

function BottomTabBar({ state, descriptors, navigation }) {
	return (
		<View
			style={{
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
				paddingTop: 24,
				// bottom:20,
				height: '7%',
				width: '100%'
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined ? options.title : route.tabBarIcon;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityStates={isFocused ? [ 'selected' ] : []}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={{ flex: 1, alignItems: 'center' }}
					>
						{route.name === 'Home' ? (
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
										tintColor: isFocused ? COLORS.Orange : COLORS.secondary
									}}
								/>
							</View>
						) : route.name === 'Chats' ? (
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
										tintColor: isFocused ? COLORS.Orange : COLORS.secondary
									}}
								/>
							</View>
						) : (
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
									source={icons.user}
									resizeMode="contain"
									style={{
										height: 28,
										width: 28,
										tintColor: isFocused ? COLORS.Orange : COLORS.secondary
									}}
								/>
							</View>
						)}

						<Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default BottomTabBar;

const styles = StyleSheet.create({
	tabButton: {
		top: -4.5,
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: COLORS.black
	},
	tabContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		// borderRadius: 28,

		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		marginBottom: 24,
		height: 52,
		backgroundColor: COLORS.white
	},

	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		height: 64,
		paddingHorizontal: 16,
		backgroundColor: 'white',
		paddingBottom: Platform.OS === 'ios' ? 16 : 0

		// position: 'absolute'
	},

	text: {
		color: 'white'
	}

	// imageIcon: {
	//     width: 50,
	//     height: 50,
	//     resizeMode: 'contain',
	// },
});

// route.name === 'Home' ? (
// 	<View
// 		style={{
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 			// top:10,
// 			height: 40,
// 			width: 80
// 			// backgroundColor:'black'
// 		}}
// 	>
// 		<Image
// 			source={icons.home}
// 			resizeMode="contain"
// 			style={{
// 				height: 28,
// 				width: 28,
// 				tintColor: isFocused ? COLORS.Orange : COLORS.secondary
// 			}}
// 		/>
// 	</View>
// ) : (
// 	<View
// 		style={{
// 			alignItems: 'center',
// 			justifyContent: 'center',
// 			// top:10
// 			height: 40,
// 			width: 80
// 		}}
// 	>
// 		<Image
// 			source={icons.chat}
// 			resizeMode="contain"
// 			style={{
// 				height: 28,
// 				width: 28,
// 				tintColor: isFocused ? COLORS.Orange : COLORS.secondary
// 			}}
// 		/>
// 	</View>
// );
