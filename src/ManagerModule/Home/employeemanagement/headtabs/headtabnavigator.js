import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import EmployeeList from './employeelist';
import ApplicationRequests from './applicationrequests';
import { Dimensions } from 'react-native';
import lightColors from '../../../../colors/colors';


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Tab = createMaterialTopTabNavigator();

const HeadTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarLabelStyle: {textTransform: 'capitalize', fontFamily: 'Montserrat-Bold', fontSize: windowHeight < 800 ? 10 : 15,}, tabBarStyle: {backgroundColor: lightColors.background,}, tabBarActiveTintColor: lightColors.secondary, tabBarInactiveTintColor: lightColors.sideText}}>
        <Tab.Screen name='employeelist' component={EmployeeList} options={{tabBarLabel: "Employee List"}} />
        <Tab.Screen name='applicationrequests' component={ApplicationRequests} options={{tabBarLabel: "Application Requests"}} />
    </Tab.Navigator>
  )
}

export default HeadTabNavigator