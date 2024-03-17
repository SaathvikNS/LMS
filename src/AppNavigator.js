import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoadingScreen from "./LoadingScreen";
import WelcomeScreen from "./Authentication screens/Welcome";
import LoginScreen from "./Authentication screens/LoginScreen";
import SignUpScreen from "./Authentication screens/SignUpScreen";
import ForgotPasswordScreen from "./Authentication screens/forgotpasswordscreen";
import DrawerNavigator from "./ManagerModule/Drawer";
import { ContextProvider } from "../Global/context";
import EmployeeDrawerNavigator from "./EmployeeModule/Drawer";

const Stack = createStackNavigator()

const AppNavigator = () => {
    return(
        <ContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:false, animation: 'fade_from_bottom'}}>
                    <Stack.Screen name="Loading" component={LoadingScreen} />
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignUpScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="ManagerDrawerNavigator" component={DrawerNavigator} />
                    <Stack.Screen name="EmployeeDrawerNavigator" component={EmployeeDrawerNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextProvider>
    )
}

export default AppNavigator;