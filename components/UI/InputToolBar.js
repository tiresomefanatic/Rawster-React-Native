import React from 'react';
import { Image } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { icons } from '../../constants';

export const renderInputToolbar = (props) => (
	<InputToolbar
		{...props}
		containerStyle={{
			backgroundColor: '#000000',
			padding: 4,
			height: 60
			//marginBottom: 20
		}}
		primaryStyle={{ alignItems: 'center' }}
	/>
);

export const renderActions = (props) => (
	<Actions
		{...props}
		containerStyle={{
			width: 32,
			height: 32,
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: 0,
			marginRight: 0,
			marginBottom: 0,
			// backgroundColor:'white',
			borderRadius: 16
		}}
		icon={() => <Image style={{ width: 32, height: 32, tintColor: 'tomato' }} source={icons.plus} />}
		options={{
			'Choose From Library': () => {
				//  //console.log('Choose From Library');
			},
			Cancel: () => {
				// //console.log('Cancel');
			}
		}}
		optionTintColor=""
	/>
);

export const renderComposer = (props) => (
	<Composer
		{...props}
		textInputStyle={{
			color: '#222B45',
			backgroundColor: '#EDF1F7',
			// borderWidth: 1,
			borderRadius: 16,
			// borderColor: '#E4E9F2',
			paddingTop: 8.5,
			paddingHorizontal: 12,
			marginRight: 12
		}}
	/>
);

export const renderSend = (props) => (
	<Send
		{...props}
		disabled={!props.text}
		containerStyle={{
			width: 32,
			height: 32,
			borderRadius: 16,
			alignItems: 'center',
			justifyContent: 'center',
			marginHorizontal: 4,
			backgroundColor: 'tomato'
		}}
	>
		<Image style={{ width: 24, height: 24, tintColor: 'white' }} source={icons.chat} />
	</Send>
);
