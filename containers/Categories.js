import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { COLORS, SIZES, icons, FONTS } from '../constants';
import { TouchableOpacity } from "react-native-gesture-handler";

const Categories = (props) => {
  const CategoryItem = (props) => {
    return (
      <TouchableOpacity style={{height: 108,
        width: 108,
        alignItems: "center",
        justifyContent: "center",
        marginVertical:4,
        borderRadius: 24,
        shadowColor: COLORS.black,
        shadowOpacity: .1,
        shadowRadius: 12,
        shadowOffset: {height: 2, width: 2},
        backgroundColor: (props.color)
        }} >
        <Image source={props.image} resizeMode="contain" style={{height:32,width:32,marginBottom:8, tintColor: COLORS.white }} />
        <Text style={{color:COLORS.white, fontWeight:'bold'}}>{props.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.Categories}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width:'100%'
        }}
      >
        <CategoryItem image={icons.ground} title="Grounds" color={COLORS.Red}/>
        <CategoryItem image={icons.lit} title="Games" color={COLORS.Purple}/>
        <CategoryItem image={icons.club} title="Clubs" color={COLORS.Blue} />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width:'100%'
          // marginVertical: 8,
        }}
      >
        
        <CategoryItem image={icons.announce} title="Events" color={COLORS.Yellow}/>
        <CategoryItem image={icons.user} title="Players" color='yellowgreen'/>
        <CategoryItem image={icons.world} title="Sports" color={COLORS.Orange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Categories: {
    // backgroundColor:COLORS.black,
    height: 240,
    width: "100%",
    marginVertical: SIZES.paddingS,
    // paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: SIZES.radius
  },
  CategoryItem: {
    height: 108,
    width: 108,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginVertical:4,
    borderRadius: 24,
    shadowColor: COLORS.black,
    shadowOpacity: .1,
    shadowRadius: 12,
    shadowOffset: {height: 2, width: 2},
  },
});

export default Categories;
