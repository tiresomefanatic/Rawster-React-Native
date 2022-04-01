import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MainHeader from '../../components/UI/MainHeader'
import { icons } from '../../constants';


const Play = (props) => {

  return(
    <View>
      <MainHeader title='TV' icon={icons.video} />
      <View>
        
      </View>
    </View>
  )
}

export default Play