import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	Touchable
} from 'react-native';

import Card from './Card';
import { COLORS } from '../../constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const InviteUserCard = (props) => {
	return (
		// Wrapper
		<View
			style={{
				// backgroundColor: 'grey',
				// borderColor: COLORS.secondary,
				// borderWidth: 1,
				borderRadius: 16,
				marginBottom: 0,
				flexDirection: 'row',
				height: 80,
				width: '100%',
				alignItems: 'center',
				alignSelf: 'center',
				padding: 8,
				borderBottomWidth: 0.2
				// justifyContent: 'center',
				// ...ifIphoneX({backgroundColor:'red'}),
			}}
		>
			<TouchableOpacity
				onPress={props.onSelect}
				style={{
					//	backgroundColor: 'grey',
					// borderColor: COLORS.secondary,
					// borderWidth: 1,
					borderRadius: 16,
					marginBottom: 0,
					flexDirection: 'row',
					height: 80,
					width: 294,
					alignItems: 'center',
					alignSelf: 'center',
					padding: 8,
					borderBottomWidth: 0.2,
					paddingRight: 90
					// justifyContent: 'center',
					// ...ifIphoneX({backgroundColor:'red'}),
				}}
			>
				{/* Avatar Start*/}
				<View
					style={{
						height: 40,
						width: 40,
						borderRadius: 20,
						backgroundColor: 'black',
						marginRight: 8
					}}
				>
					<View
						style={{
							height: '100%',
							width: '100%',
							borderRadius: '100%'
						}}
					>
						<Image
							style={{
								height: '100%',
								width: '100%'
								//borderRadius: '100%'
							}}
							source={props.image}
						/>
					</View>
				</View>
				{/* Avatar Ends */}

				{/* Name and message Start */}
				<View
					style={{
						height: 80,
						width: '85%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<View
						style={{
							height: 80,
							paddingVertical: 16,
							// paddingRight: 16,
							flexDirection: 'row',
							alignItems: 'center'
							// justifyContent: "space-between",
						}}
					>
						<View
							style={{
								flexDirection: 'column'
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: 'bold',
									color: 'black'
								}}
							>
								{props.firstname} {props.lastname}
							</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			{/* Invite Badge */}

			{props.invitestatus === 'Invitable' && (
				<TouchableOpacity
					style={{
						height: 24,
						width: 64,
						backgroundColor: 'green',
						marginRight: 8,
						//width: '80%',
						maxWidth: 160,
						alignItems: 'center',
						padding: 4,
						paddingHorizontal: 8,
						justifyContent: 'space-around',
						flexDirection: 'row'
						//borderRadius: 18
					}}
					onPress={props.onSelectInvite}
				>
					<Text
						style={{
							color: 'black',
							fontSize: 12,
							fontWeight: 'bold'
						}}
					>
						{props.invitestatus}
					</Text>
				</TouchableOpacity>
			)}

			{props.invitestatus === 'In Team' && (
				<View
					style={{
						height: 24,
						width: 64,
						backgroundColor: 'red',
						marginRight: 8,
						//width: '80%',
						maxWidth: 160,
						alignItems: 'center',
						padding: 4,
						paddingHorizontal: 8,
						justifyContent: 'space-around',
						flexDirection: 'row'
						//borderRadius: 18
					}}
				>
					<Text
						style={{
							color: 'black',
							fontSize: 12,
							fontWeight: 'bold'
						}}
					>
						{props.invitestatus}
					</Text>
				</View>
			)}

			{props.invitestatus === 'Invited' && (
				<View
					style={{
						height: 24,
						width: 64,
						backgroundColor: 'yellow',
						marginRight: 8,
						//width: '80%',
						maxWidth: 160,
						alignItems: 'center',
						padding: 4,
						paddingHorizontal: 8,
						justifyContent: 'space-around',
						flexDirection: 'row'
						//borderRadius: 18
					}}
				>
					<Text
						style={{
							color: 'black',
							fontSize: 12,
							fontWeight: 'bold'
						}}
					>
						{props.invitestatus}
					</Text>
				</View>
			)}
		</View>
	);
};

// const styles = StyleSheet.create({})

export default InviteUserCard;
