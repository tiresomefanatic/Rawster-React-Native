import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
//import { TouchableO } from 'react-native-gesture-handler';

const Card = props => {
    return <TouchableOpacity onPress={props.onPress} style={{ ...styles.card, ...props.style, }}>{props.children}</TouchableOpacity>;
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'grey',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 12,
        elevation: 2,
        borderRadius: 24,
        backgroundColor: 'white',
        
    }
});

export default Card;
