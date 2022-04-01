import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText } from 'react-native-gifted-chat';

export const renderAvatar = (props) => (
	<Avatar
		{...props}
		containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
		imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
	/>
);

export const renderBubble = (props) => (
	<Bubble
		{...props}
		onLongPress={() => alert('longpressed')}
		// renderTime={() => <Text>Time</Text>}
		// renderTicks={() => <Text>Ticks</Text>}
		containerStyle={{
			left: { backgroundColor: 'none', marginVertical: 12 },
			right: { backgroundColor: 'none', marginVertical: 12 }
		}}
		wrapperStyle={{
			left: { backgroundColor: {}, borderRadius: 16, padding: 4 },
			right: { backgroundColor: {}, borderRadius: 16, padding: 4 }
		}}
		bottomContainerStyle={{
			left: { backgroundColor: 'none', marginVertical: 4, alignItems: 'center' },
			right: { backgroundColor: 'none', marginVertical: 4, alignItems: 'center' }
		}}
		tickStyle={{}}
		usernameStyle={{ color: 'black', fontWeight: '300' }}
		containerToNextStyle={{
			left: {},
			right: {}
		}}
		containerToPreviousStyle={{
			left: {},
			right: {}
		}}
	/>
);

export const renderSystemMessage = (props) => (
	<SystemMessage
		{...props}
		containerStyle={{}}
		wrapperStyle={{ borderWidth: 10, borderColor: 'white' }}
		textStyle={{ color: 'orange', fontWeight: '900' }}
	/>
);

export const renderMessage = (props) => (
	<Message
		{...props}
		//renderDay={() => <Text>Date</Text>}
		containerStyle={{
			left: {},
			right: {}
		}}
	/>
);

export const renderMessageText = (props) => (
	<MessageText
		{...props}
		containerStyle={{
			left: {},
			right: {}
		}}
		textStyle={{
			left: {},
			right: {}
		}}
		linkStyle={{
			left: {},
			right: {}
		}}
		customTextStyle={{ fontSize: 14, lineHeight: 24 }}
	/>
);

export const renderCustomView = ({ user }) => (
	<View style={({ minHeight: 20 }, { alignItems: 'left' }, { padding: 5 }, { margin: 5 })}>
		<Text
			style={{
				color: 'black'
			}}
		>
			{user.name}
		</Text>
		<Text>From CustomView</Text>
	</View>
);
