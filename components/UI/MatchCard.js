import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Pressable } from 'react-native';
import { icons, COLORS, FONTS, SIZES } from '../../constants';
import { color } from 'react-native-reanimated';

const MatchCard = (props, navigation) => {
	const MatchCardInfo = (props) => {
		return (
			<View style={styles.MatchCardInfo}>
				<Text style={styles.Time}>{props.time}</Text>
				<Text style={styles.Label}>{props.label}</Text>
			</View>
		);
	};

	const MatchType = (props) => {
		return (
			<View style={styles.MatchType}>
				<Text style={styles.MtSport}>{props.sport}</Text>
				<View style={styles.MtLine} />
				<Text style={styles.MtLevel}>{props.level} </Text>
			</View>
		);
	};

	const InPlayers = (props) => {
		const PlayerCicle = (props) => {
			return (
				<Image
					style={{
						height: 20,
						width: 20,
						borderRadius: 12,
						borderWidth: 1,
						marginRight: -4
						// backgroundColor:'white'
					}}
					source={props.player}
				/>
			);
		};
		return (
			<View style={{ height: 24, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
				<PlayerCicle player={require('../../assets/images/users/srik.jpeg')} />
				<PlayerCicle player={require('../../assets/images/users/nishant.jpeg')} />
				<PlayerCicle player={require('../../assets/images/users/suppu.jpeg')} />
				<PlayerCicle player={require('../../assets/images/users/naman.jpeg')} />
				<PlayerCicle player={require('../../assets/images/users/adikav.jpeg')} />
			</View>
		);
	};
	return (
		<Pressable
			style={styles.Container}
			onPress={() => {
				console.log('14');
			}}
		>
			<Image
				resizeMode="cover"
				style={styles.Bg}
				blurRadius={12}
				source={require('../../assets/images/ground.jpeg')}
			/>
			<View style={styles.BgOver} />
			<View style={styles.Top}>
				<View style={styles.Left}>
					<MatchCardInfo time="9 PM" label="START" />
				</View>
				<View style={styles.Center}>
					<MatchType sport="Today" level="Advanced" />
				</View>

				<View style={styles.Right}>
					<MatchCardInfo time="11 PM" label="END" />
				</View>
			</View>

			<View style={styles.Bottom}>
				<View style={styles.Ground}>
					<Image
						source={icons.pin}
						resizeMode="cover"
						style={{ height: 16, width: 16, tintColor: COLORS.lightGray, marginRight: 4 }}
					/>
					<Text style={{ color: COLORS.white, fontWeight: 'bold' }}>Turfside</Text>
				</View>
				<View style={styles.Status} />
				<View style={styles.Players}>
					<Image
						source={icons.user}
						resizeMode="cover"
						style={{ height: 16, width: 16, tintColor: COLORS.lightGray, marginRight: 4 }}
					/>
					<InPlayers />
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	Container: {
		height: 160,
		width: '100%',
		backgroundColor: COLORS.white,
		borderRadius: SIZES.radius,
		marginBottom: 8
		// flex:1,
	},
	Bg: {
		height: 160,
		width: '100%',
		position: 'absolute',
		borderRadius: SIZES.radius
	},

	BgOver: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'black',
		borderRadius: SIZES.radius,
		opacity: 0.35
	},

	Top: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 8
	},

	Bottom: {
		flex: 1,
		flexDirection: 'row',
		// paddingHorizontal:8,
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	Ground: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	Status: {
		flex: 1
	},
	Players: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	MatchCardInfo: {
		height: '60%',
		width: '90%',
		// backgroundColor:'white',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column'
	},

	Left: {
		// height:80,
		// width:100,
		flex: 1,
		// backgroundColor:'black',
		alignItems: 'center',

		justifyContent: 'center'
		// padding:12
	},
	Center: {
		flex: 1,
		// backgroundColor:'black',
		alignItems: 'center',
		justifyContent: 'center'
	},
	Right: {
		flex: 1,
		// backgroundColor:'blue',
		alignItems: 'center',
		justifyContent: 'center'
	},

	Time: {
		...FONTS.h2,
		color: COLORS.white
	},

	Label: {
		...FONTS.body,
		color: COLORS.lightGray
	},

	MatchType: {
		height: 44,
		width: 120,
		// backgroundColor:'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	MtSport: {
		fontSize: 14,
		fontWeight: 'bold',
		color: COLORS.white
	},
	MtLine: {
		height: 1,
		marginVertical: 4,
		width: '100%',
		backgroundColor: COLORS.white
	},
	MtLevel: {
		fontSize: 14,
		color: COLORS.lightGray
	}
});

export default MatchCard;
