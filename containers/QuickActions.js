import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, icons, images } from "../constants";
import QuickAction from '../components/UI/QuickAction'

const QuickActions = (props) => {
    return(
<View style={{ flex: 1 }}>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							horizontal
							contentContainerStyle={{
								flexGrow: 1,
								alignItems: 'center',
								justifyContent: 'space-between',
								start: 8
							}}
						>
							<QuickAction
								color={COLORS.Red}
								title="Book Slot"
								icon={icons.ticket}
								navigateTo={() => props.navigation.navigate('SearchScreen')}
							/>
							<QuickAction
								color={COLORS.Purple}
								title="New Match"
								icon={icons.lit}
								navigateTo={() => props.navigation.navigate('TeamSearchScreen')}
							/>
							<QuickAction
								color={COLORS.Blue}
								title="New Club"
								icon={icons.club}
								navigateTo={() => props.navigation.navigate('CreateTeam')}
							/>
							<QuickAction
								color={COLORS.Orange}
								title="My Clubs"
								icon={icons.addedUser}
								navigateTo={() => props.navigation.navigate('MyTeams')}
							/>
						</ScrollView>
                    </View>)}
                    
                    export default QuickActions