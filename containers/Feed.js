import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, icons, images } from "../constants";
import FeedCard from "../components/UI/FeedCard";
import MatchCard from "../components/UI/MatchCard";
import LobbyCard from '../components/UI/LobbyCard'
import TextCard from '../components/UI/TextCard'
import { TouchableOpacity } from "react-native-gesture-handler";

const Feed = (props) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Top}>
        <Text style={{ fontWeight: "bold", fontSize: 16, opacity:.5 }}>{props.title}</Text>
        {/* <Image source={props.icon} style={{ height: 24, width: 24 }} /> */}
        <TouchableOpacity style={{
          backgroundColor:COLORS.Purple,
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
          width:88,
          height:32,
          borderRadius: 20
        }}>
          <Text style={{color:COLORS.white, fontWeight:'700'}}>New</Text>
          <Image source={icons.plus} style={{tintColor:COLORS.white,height:20,width:20}}/>
        </TouchableOpacity>
      </View>
      {/* Feed Card Start */}
      <FeedCard name="Srikar Reddy" body = {<View><LobbyCard/></View>} dp={require('../assets/images/users/srik.jpeg')} />
      <FeedCard name="Suprateek" body = {<View><LobbyCard/></View>} dp={require('../assets/images/users/suppu.jpeg')}/>
      <FeedCard name="Nishant Sura" body = {<View><LobbyCard/></View>} dp={require('../assets/images/users/nishant.jpeg')}/>
      <FeedCard name="Aditya Kavula" body = {<LobbyCard/>} dp={require('../assets/images/users/adikav.jpeg')}/>
      <FeedCard name="Krishna Iyer" body = {<View><LobbyCard/></View>} dp={require('../assets/images/users/iyer.jpeg')} />
      <FeedCard name="Harish Patnaik" body = {<View><MatchCard/></View>} dp={require('../assets/images/users/hp.jpeg')} />
      <FeedCard name="Akhil Rao" body = {<View><MatchCard/></View>} dp={require('../assets/images/users/akhil.jpeg')} />
      <FeedCard name="Naman Bansal" body = {<View><MatchCard/></View>} dp={require('../assets/images/users/naman.jpeg')} />
      <FeedCard name="Krishna Teja" body = {<View><MatchCard/></View>} dp={require('../assets/images/users/kt.jpeg')} />
      <FeedCard name="Ankush Reddy" body = {<View><MatchCard/></View>} dp={require('../assets/images/users/ankush.jpeg')}/>
      <FeedCard name="Rohan Papad" />
      {/* Feed Card End */}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor:'red',
    marginTop: 24,
    paddingHorizontal: 12,
  },
  Top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    bottom: 16,
  },
});

export default Feed;
