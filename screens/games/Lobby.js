import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Pressable,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import COLORS from '../../constants/theme';;


const Lobby = props => {
    return (
       <View style={styles.screen}>
           
       </View>
    );
};

export const screenOptions = {
    headerTitle: 'Lobby'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor:COLORS.COLORS.Red
    },

});

export default Lobby;
