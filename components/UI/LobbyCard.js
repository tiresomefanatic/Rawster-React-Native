import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Pressable } from 'react-native';
import { icons, COLORS, FONTS, SIZES } from '../../constants';
import { image } from '../../constants/icons';

const LobbyCard = (props, navigation) => {
    const PlayerItem = ( props) => {
        return(
            <View style={styles.PlayerItem}>
                <Image source = {props.DP} 
                    style={styles.PlayerDP}
                />
                <Text style={styles.PlayerName} >{props.Name}</Text>
            </View>
        )
    }
	return(
        <Pressable style= {styles.Card}>
            <Text style= {styles.Title}>Title</Text>
            <Image resizeMethod='scale' source={require('../../assets/images/ground.jpeg')} style={styles.Image}/>
            <View style= {styles.Info}>
                <View style = {styles.InfoItem}>
                    <Image source={icons.pin} style={styles.InfoIcon}/>
                    <Text style={styles.InfoText}> Location </Text>
                </View>
                <View style = {styles.InfoItem}>
                    <Image source={icons.time} style = {styles.InfoIcon}/>
                    <Text style={styles.InfoText}> Time </Text>
                </View>
            </View>
            <View style={styles.PlayerList}>
                <PlayerItem DP = {require('../../assets/images/users/suppu.jpeg')} Name = 'Suprateek Korukonda'/>
                <PlayerItem DP = {require('../../assets/images/users/nishant.jpeg')} Name = 'Nishant Sura'/>
                <PlayerItem DP = {require('../../assets/images/users/adikav.jpeg')} Name = 'Aditya Kavula'/>
                {/* <PlayerItem DP = {require('../../assets/images/users/naman.jpeg')} Name = 'Naman Bansal'/> */}
                <PlayerItem DP = {require('../../assets/images/users/ankush.jpeg')} Name = 'Ankush Reddy'/>
            </View>
            <Text style={{marginBottom:8}}>5/12 Players</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
	Card : {
        backgroundColor:COLORS.white,
        maxHeight: 1000,
        maxWidth: '100%',
        alignItems:'center',
        padding:16,
        borderRadius:24,
        shadowColor:COLORS.darkgray,
        shadowOffset:{x:1, y:4},
        shadowOpacity:.2,
        shadowRadius:12
        // marginBottom: 24
    },
    Title : {
        fontSize: 20,
        fontWeight:'700',
        marginTop:8
    },
    Image:{
        width:'100%',
        height:100,
        borderRadius: 20,
        marginTop:20
    },
    Info : {
        alignSelf:'flex-start',
        marginVertical:24
    },
    InfoIcon: { 
        height:20,
        width: 20
    },
    InfoItem:{
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        opacity: 0.5,
        marginBottom:4
    },
    InfoText: {
        fontSize: 16
    },
    PlayerList:{
        flexDirection:'column',
        alignSelf:'flex-start',
        marginBottom:20
    },
    PlayerItem:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:12
    },
    PlayerDP:{
        height:28,
        width:28,
        borderRadius:14,
        marginRight:12
    },
    PlayerName:{
        fontSize:16,
    }
     
});

export default LobbyCard;
