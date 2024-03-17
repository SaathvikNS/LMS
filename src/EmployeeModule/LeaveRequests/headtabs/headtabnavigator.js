import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Dimensions } from 'react-native';
import lightColors from '../../../colors/colors';
import Pending from './pending';
import Approved from './approved';
import Rejected from './rejected';


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Tab = createMaterialTopTabNavigator();

const HeadTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarLabelStyle: {textTransform: 'capitalize', fontFamily: 'Montserrat-Bold', fontSize: windowHeight < 800 ? 10 : 15,}, tabBarStyle: {backgroundColor: lightColors.background,}, tabBarActiveTintColor: lightColors.secondary, tabBarInactiveTintColor: lightColors.sideText}}>
        <Tab.Screen name='pending' component={Pending} options={{ tabBarLabel: 'Pending' }} />
        <Tab.Screen name='approved' component={Approved} options={{ tabBarLabel: 'Approved' }} />
        <Tab.Screen name='rejected' component={Rejected}  options={{ tabBarLabel: 'Rejected' }} />
    </Tab.Navigator>
  )
}

export default HeadTabNavigator