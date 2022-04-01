import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
    Touchable,
    ScrollView,
    Pressable,

} from 'react-native';


const ClubChat = (props) => {
    const ClubItem = (props) => {
        return(
        <TouchableOpacity style={styles.ClubItem}>
            <Image source = {require('../assets/images/users/suppu.jpeg')} style={styles.ClubDp}/>
            <Text style={styles.ClubName}>{props.name}</Text>
        </TouchableOpacity>
        )
    }
    return(
        <View style={styles.Wrap}>
            <Text style={styles.Title}> Clubs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{height:120}}>
            
            <ClubItem name = 'MGFC'/>
            <ClubItem name = 'MGFC'/>
            <ClubItem name = 'MGFC'/>
            <ClubItem name = 'MGFC'/>
            <ClubItem name = 'MGFC'/>
            <ClubItem name = 'MGFC'/>

        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Wrap:{
        height: 160,
        marginTop:20,
        marginBottom:20
    },
    Title:{
        fontSize:16,
        marginBottom:12,
        marginLeft:12
    },
    ClubItem:{
        height:120,
        width: 120,
        alignItems:'center',
        justifyContent:'center',
    },
    ClubDp:{
        height: 80,
        width:80,
        borderRadius:40,
        marginBottom: 8
    },
    ClubName:{
        fontSize: 16,
        fontWeight: '700'
    }
})

export default ClubChat