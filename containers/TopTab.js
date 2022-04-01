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
import { COLORS, SIZES, icons } from '../constants';
import MainHeader from '../components/UI/MainHeader'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';





const Tab = createMaterialTopTabNavigator();
   
function TopTab() {
        const Discover = (props) => {
            return(
                    <ScrollView style={styles.Scroll}>
                        
                        <View style={styles.Section}>
        
                        </View>
                        <View style={styles.Section}>
                        </View>
                    </ScrollView>
            )
        }
        // const Matches

      return (
              <View style={styles.TopTab}>
        <Tab.Navigator 
        sceneContainerStyle={styles.Scene} 
        lazy={true} 
        style={styles.Screen} 
        tabBarOptions={{
            indicatorContainerStyle:{backgroundColor:COLORS.white,},

            labelStyle: {fontSize:14, fontWeight:'bold', width:100},
            tabStyle: {
                backgroundColor:COLORS.transparent,
                // marginHorizontal:4,
                // width: '90%',
                scrollEnabled: 'true',
                // height: 60,
            },
            activeTintColor: COLORS.black,
            inactiveTintColor: COLORS.secondary
        }}>
          <Tab.Screen name='Slots' component={Discover} />
          <Tab.Screen name="Players" component={Discover} />
          <Tab.Screen name="Clubs" component={Discover} />
        </Tab.Navigator>
        </View>
      );
    }




const styles = StyleSheet.create({
    Section: {
        backgroundColor:COLORS.Orange,
        height: 240,
        width:'100%',
        marginVertical: SIZES.paddingS,
        padding: SIZES.paddingM,
        // borderRadius: SIZES.radius
        
    },
    Scene:{
 
        marginTop: 16,
        // padding:8,
        backgroundColor:COLORS.bgBlack
    },
    Screen:{
        backgroundColor:COLORS.white,
        display:'flex',
        flex:1
    },
    TopTab:{
        flex:1,
        marginTop:32
    }
})

export default TopTab