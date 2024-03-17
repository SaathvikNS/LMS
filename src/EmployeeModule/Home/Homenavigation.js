import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import HomeMain from "./homemain";
import CalendarView from "./calendarview/calendarview";
import Summary from "./summary/summaryscreen";

const Stack = createStackNavigator()

const HomeNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="homemain" component={HomeMain} />
            <Stack.Screen name="calendarview" component={CalendarView} />
            <Stack.Screen name="summary" component={Summary} />
        </Stack.Navigator>
    )
}

export default HomeNavigator;