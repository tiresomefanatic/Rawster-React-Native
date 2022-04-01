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

import { COLORS } from '../../constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';
//   <Card style={styles.product}>
//             <View style={styles.touchable}>
//                 <TouchableOpacity onPress={props.onSelect} useForeground>
//                     <View>
//                         {/* <View style={styles.imageContainer}>
//                             <Image style={styles.image} source={{ uri: props.image }} />
//                         </View> */}
//                         <View style={styles.details}>
//                             <Text style={styles.name}>{props.name}</Text>
//                             <Text style={styles.acronym}>{props.acronym}</Text>
//                         </View>
//                         <View style={styles.actions}>
//                             {props.children}
//                         </View>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         </Card>
const ChatCard = (props) => {
	if (props.unreadCount === 0 || !props.unreadCount) {
		return (
			// Wrapper
			<View
				style={{
					// backgroundColor: 'green',
					// borderColor: COLORS.secondary,
					// borderWidth: 1,
					borderRadius: 16,
					marginBottom: 0,
					flexDirection: 'row',
					height: 64,
					width: '100%',
					alignItems: 'center',
					alignSelf: 'center',
					// padding: 8,
					marginBottom:8,
					// borderBottomWidth: 0.2
					justifyContent: 'center',
					// ...ifIphoneX({backgroundColor:'red'}),
				}}
			>
				{/* Avatar Start*/}
				<TouchableOpacity
					style={{
						height: 48,
						width: 48,
						borderRadius: 16,
						backgroundColor: 'grey',
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
				</TouchableOpacity>
				{/* Avatar Ends */}

				{/* Name and message Start */}
				<View
					style={{
						height: 80,
						width: '80%',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<TouchableOpacity
						onPress={props.onSelect}
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
									fontSize: 14,
									fontWeight: 'bold'
								}}
							>
								{props.name}
							</Text>
							<Text>
								Message
							</Text>
						</View>
						
					</TouchableOpacity>
					<Text>12:30</Text>
				</View>
			</View>
		);
	} else {
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
				{/* Avatar Start*/}
				<TouchableOpacity
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
				</TouchableOpacity>
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
					<TouchableOpacity
						onPress={props.onSelect}
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
									fontSize: 14,
									fontWeight: 'bold'
								}}
							>
								{props.name} {props.acronym}
							</Text>
							<Text>You have a new message</Text>
						</View>
					</TouchableOpacity>
					{/* Notification Badge */}

					<View
						style={{
							height: 24,
							width: 24,
							borderRadius: 12,
							backgroundColor: 'tomato',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: '600',
								color: 'white'
							}}
						>
							{props.unreadCount}
						</Text>
					</View>
				</View>
			</View>
		);
	}
};

// const styles = StyleSheet.create({})

export default ChatCard;
