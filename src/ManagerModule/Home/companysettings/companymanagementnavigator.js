import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CompanyManagementMain from './companymanagementmain'
import EditCompanyManagement from './editcompanymanagement'
import ModifyLeaves from './modifyleaves'
import AddLeave from './addleave'

const Stack = createStackNavigator()

const CompanyManagementNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='companymanagementmain' component={CompanyManagementMain} />
        <Stack.Screen name='editcompanymanagement' component={EditCompanyManagement} />
        <Stack.Screen name='modifyleaves' component={ModifyLeaves} />
        <Stack.Screen name='addleave' component={AddLeave} />
    </Stack.Navigator>
  )
}

export default CompanyManagementNavigator