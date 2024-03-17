import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EmployeeManagement from './employeemanagement';
import EmployeeProfile from './headtabs/employeeprofile';

const Stack = createStackNavigator();

const EmployeeManagementNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false, animation: 'fade_from_bottom'}}>
        <Stack.Screen name='employeemanagement' component={EmployeeManagement} />
        <Stack.Screen name='employeeprofile' component={EmployeeProfile} />
    </Stack.Navigator>
  )
}

export default EmployeeManagementNavigator