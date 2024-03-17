import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import BottomNavigator from "./BottomNavigator";
import CustomDrawer from "./CustomDrawer";

const windowWidth = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return(
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props}/>} screenOptions={{headerShown: false, drawerStyle:{width: windowWidth * 0.7,}}}>
            <Drawer.Screen name="bottomnavigator" component={BottomNavigator} initialParams={{screen: 0}}/>
            <Drawer.Screen name="profilescreen" component={BottomNavigator} initialParams={{screen: 2}}/>
            <Drawer.Screen name="leaverequestsscreen" component={BottomNavigator} initialParams={{screen: 1}}/>
        </Drawer.Navigator>
    )   
}

export default DrawerNavigator;