import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert,Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { icons, COLORS, FONTS } from '../../constants';

const ImgPicker = (props) => {
	const [ pickedImage, setPickedImage ] = useState();

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
		if (result.status !== 'granted') {
			Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.', [
				{ text: 'Okay' }
			]);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const image = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [ 1, 1 ],
			quality: 0.5
		});

		setPickedImage(image.uri);
		props.onImageTaken(image.uri);
	};

	return (
		<View style={styles.imagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? (
					<Text>No image picked yet.</Text>
				) : (
					<Image style={styles.image} source={{ uri: pickedImage }} />
				)}
			</View>
			<Button title="Choose Image" color={COLORS.primary} onPress={takeImageHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	imagePicker: {
		alignItems: 'center',
		marginBottom: 15,
		justifyContent:'center'
	},
	imagePreview: {
		width: '100%',
		height: 200,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center',
		// borderColor: '#ccc',
		// borderWidth: 1
	},
	image: {
		width: 200,
		height: '100%',
	}
});

export default ImgPicker;
