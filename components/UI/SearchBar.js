import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
    TouchableNativeFeedback,
    TextInput,
	Touchable
} from 'react-native';
import { icons, COLORS } from '../../constants';

const SearchBar = (props) => {
    return(
        <View
        style={{
            backgroundColor: COLORS.transparent,
            marginVertical: 8,
            marginHorizontal: 12
        }}
    >
        <TextInput
            style={{
                backgroundColor: '#ededed',
                height: 40,
                width: '100%',
                marginTop: 4,
                borderRadius: 20,
                padding: 4,
                paddingHorizontal: 16
            }} //height is required for render
            value={''}
            //   onChangeText={(e) => setQuery(e)}
            placeholder={props.label}
        />
    </View>
    )
}

export default SearchBar