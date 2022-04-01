import React from 'react'
import { View, Text, Image, TouchableOpacity} from 'react-native'
import { icons } from '../../constants'


function MainHeader(props) {
    return (
        <View style={{
            flexDirection: 'row',
            height: 48,
            width: '100%',
            backgroundColor: 'white',
            padding:8,
            paddingRight:16,
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1
        }}>
            <View style={{
                // backgroundColor:'white',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Text style={{
                    fontSize:24,
                    fontWeight:'bold',
                    // fontFamily:'inter-black'
                }}>{props.title}</Text>
            </View>
            <TouchableOpacity>
                <Image source={props.icon} style={{
                    height: 28,
                    width:28
                }}/>
            </TouchableOpacity>
        </View>
    )
}

export default MainHeader
