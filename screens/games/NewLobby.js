import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../constants/theme";
import icons, { image } from "../../constants/icons";
const NewLobby = (props) => {

    const WhoStarted = props => {
        return(
            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            //   backgroundColor:'red',
              // padding: 8
            }}
          >
            {/* avatar */}
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center"}}
            >
              <Image
                style={{ height: 36, width: 36, borderRadius: 18, marginRight: 8 }}
                source={require("../../assets/images/users/srik.jpeg")}
              />
              <Text style={{ fontWeight: "600", fontSize: 14 }}>Srikar Reddy</Text>
            </TouchableOpacity>
            <Pressable>
              <Image source={icons.down} style={{height:12}}/>
            </Pressable>
          </View>
        )
    }

    const LobbyDetailCard = props => {
      return(
        <Pressable style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
          backgroundColor: COLORS.COLORS.lightGray,
          height: 64,
          width:'100%',
          borderRadius:12,
        }}>
          <View style={{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            // backgroundColor:'yellow',
            width: '30%',
            justifyContent:'flex-start'
          }}>
            <Image source={props.icon} style={{height:20,marginRight:12}} resizeMode='cover'/>
            <Text style={{fontWeight:'700', fontSize:16}}>
                {props.label}
            </Text>
          </View>
          
          <Image source={icons.forward} style={{height:20,marginRight:8}} resizeMode='contain'/>
        </Pressable>
      )
    }

    const BtnPrimary = props => {
      return(
        <Pressable style={{
          height:48,
          width:'90%',
          backgroundColor:COLORS.COLORS.Purple,
          borderRadius:24,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          marginVertical:12,
        }}>
          <Text style={{color:COLORS.COLORS.white, fontSize:16, fontWeight:'700'}}>{props.label}</Text>
          <Image source={icons.lit} style={{height:20, tintColor:COLORS.COLORS.white}} resizeMode='contain'/>
        </Pressable>     
      )
    }

    const BtnSecondary = props => {
      return(
        <Pressable style={{
          height:48,
          width:'90%',
          // backgroundColor:COLORS.COLORS.white,
          borderRadius:24,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          marginVertical:12
        }}>
          <Text style={{color:COLORS.COLORS.darkgray, fontSize:16, fontWeight:'700'}}>{props.label}</Text>
        </Pressable>     
      )
    }

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <WhoStarted/>
        <View style={styles.details}>
            <LobbyDetailCard icon={icons.time} label='Time'/>
            <LobbyDetailCard icon={icons.ground} label='Location'/>
            <LobbyDetailCard icon={icons.gameSettings} label='Rules'/>
        </View>
      </View>
      <View style={styles.bottom}>
         <BtnPrimary label='Create Game' />
         <BtnSecondary label='Skip'/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.COLORS.white,
    paddingTop: 32,
    paddingHorizontal:12,
    justifyContent:'space-between'
    
  },
  top:{
    // backgroundColor:'red',
    height:'60%'
  },
  bottom:{
    // backgroundColor:'blue',
    height:'30%',
    alignItems:'center',
    flexDirection:'column',
  },
  details:{
    // backgroundColor:'green',
    height:'50%',
    justifyContent:'space-evenly',
    marginTop:12
  }
});

export default NewLobby;
