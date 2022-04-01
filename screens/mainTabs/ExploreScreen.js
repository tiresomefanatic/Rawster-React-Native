import React, { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import {
	Image,
	ScrollView,
	Text,
	View,
	KeyboardAvoidingView,
	StyleSheet,
	Button,
	ActivityIndicator,
	Alert,
	TextInput,
	StatusBar,
	SafeAreaView
} from 'react-native';
import { COLORS, SIZES, icons } from '../../constants';

import MainHeader from '../../components/UI/MainHeader'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Categories from '../../containers/Categories'
import SearchBar from '../../components/UI/SearchBar'
import TopTab from '../../containers/TopTab';
import Feed from '../../containers/Feed'




const Tab = createMaterialTopTabNavigator();
   
        // const Matches
const ExploreScreen = () => {
 
  
      return (
          <View style={{flex:1,backgroundColor:COLORS.white,alignContent:'center',justifyContent:'center'}}>
            <MainHeader title='Explore' icon={icons.pin}/>
            <SearchBar label = 'Search here'/>
              <ScrollView style={styles.Scroll} contentContainerStyle={{justifyContent:'center'}}> 
              <View style={styles.CategoriesContainer}>
              <Categories/>
              </View>
                <View>
                  <Feed title='Around You' icon= {icons.world} />
                </View>  
              </ScrollView>           
        </View>
      );
    }




const styles = StyleSheet.create({
    Scroll:{
        flex:1,
        backgroundColor:COLORS.white,
        // padding: 8,
    },
    CategoriesContainer:{
      flex:1,
      marginHorizontal:12
    }
})

export default ExploreScreen