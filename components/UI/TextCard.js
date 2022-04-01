import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { icons, COLORS, FONTS, SIZES } from '../../constants'

const TextCard = (props) => {
  return(
    <View style={styles.TextCard} >
      <Text style={styles.TextBody}>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    TextCard:{
        backgroundColor:COLORS.white,
        paddingVertical:8,
        paddingHorizontal:16,
        borderRadius: SIZES.radius,
        marginBottom:12
    },
    TextBody:{
        fontSize:16,
        fontWeight:'500',
        color:COLORS.black
    }
})

export default TextCard