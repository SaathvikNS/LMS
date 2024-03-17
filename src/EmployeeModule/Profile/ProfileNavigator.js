import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProfileMain from "./profilemain";
import EditProfileMain from "./editprofilemain";

const Stack = createStackNavigator();

const ProfileNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="profilemain" component={ProfileMain} />
            <Stack.Screen name="editprofile" component={EditProfileMain} />
        </Stack.Navigator>
    )
}

export default ProfileNavigator;