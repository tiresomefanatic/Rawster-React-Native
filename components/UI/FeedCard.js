import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { icons, COLORS, FONTS } from "../../constants";
import MatchCard from "./MatchCard";

const FeedCard = (props) => {
  return (
    <View
      style={{
        // backgroundColor: "white",
        flexDirection: "column",
        // height: 160,
        // minHeight:120,
        maxHeight: 1000,
        width: "100%",
        borderRadius: 16,
        padding: 12,
        // backgroundColor: COLORS.white,
        // paddingBottom: 12,
        marginBottom: 16,
      }}
    >
      {/* Card Top */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          paddingHorizontal: 12
        }}
      >
        {/* avatar */}
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            style={{ height: 32, width: 32, borderRadius: 12, marginRight: 8 }}
            source={props.dp}
          />
          <Text style={{ fontWeight: "600", fontSize: 14 }}>{props.name}</Text>
        </TouchableOpacity>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          width: 80,
          opacity:0.85
        }}>
          <TouchableOpacity>
            <Image source={icons.alert} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.comment} />
          </TouchableOpacity>
          
        </View>
      </View>
      {/* Body */}
      <View style={{ maxHeight: 1000, marginTop: 4 }}>
        {props.body}
        {/* body card */}
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginTop:8,
          marginBottom:8,
          width:'100%'
        }}
      > */}
        {/* send */}
        {/* <TouchableOpacity style={{ marginRight: 24 }}>
          <Image
            source={icons.send}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity> */}
        {/* comments */}
        {/* <TouchableOpacity style={{ marginRight: 12 }}>
          <Image
            source={icons.comments}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity> */}
      {/* </View> */}
    </View>
  );
};

export default FeedCard;
