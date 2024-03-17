import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LeaveRequests from './leaverequestsmain';

const Stack = createStackNavigator();

const LeaveRequestsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='leaverequestsmain' component={LeaveRequests} />
    </Stack.Navigator>
  )
}

export default LeaveRequestsNavigation