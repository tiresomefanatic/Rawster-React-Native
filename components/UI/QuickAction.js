import React from 'react'
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native'
import { COLORS, icons} from '../../constants'

const QuickAction= (props) => {
    return (
            <TouchableOpacity
              style={{height: 40,
                // width: 128,
                backgroundColor: (props.color),
                marginRight:8,
                width: '24%',
                // maxWidth: 160,
                alignItems: 'center',
                padding: 4,
                paddingHorizontal: 8,
                justifyContent: 'space-around',
                flexDirection:'row',
                borderRadius:12
            }}
              onPress={props.navigateTo}
            >
           
                <Image
                  source={props.icon}
                  style={{
                    tintColor: COLORS.white,
                    height: 20,
                    width: 20,
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                >
                  {props.title}
                </Text>
            </TouchableOpacity>
 )
}


export default QuickAction
