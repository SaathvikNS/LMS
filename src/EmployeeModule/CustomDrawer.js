import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import lightColors from "../colors/colors";
import { Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import { MyContext } from "../../Global/context";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const CustomDrawer = ({navigation}) => {
    const {empname, empempid} = useContext(MyContext);

    const profilepressed = () => {
        navigation.navigate("profilescreen")
    }

    const logoutpressed = () => {
        navigation.dispatch(StackActions.replace("Welcome"))
    }

    const calendarviewpressed = () => {
        navigation.navigate('calendarview')
    }

    const leaveapplicationpressed = () => {
        navigation.navigate('leaverequests')
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{navigation.closeDrawer()}}>
                <Image source={require("../../assets/customIcons/menuactive.png")} style={styles.menuicon} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profilecontainer} activeOpacity={1} onPress={profilepressed}>
                <View style={styles.piccontainer}>
                    <Image source={require("../../assets/customIcons/dp.png")} style={styles.dp} resizeMode="contain" />
                </View>
                <View style={styles.profileinfo}>
                    <Text style={styles.name}>{empname}</Text>
                    <Text style={styles.empid}>{empempid}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <View style={styles.primarycontentholder}>
                {/* myprofile */}
                <TouchableOpacity style={styles.contentlist} onPress={profilepressed}>
                    <Image source={require("../../assets/managerhomicons/myprofile.png")}  style={styles.primarycontenticon} resizeMode="contain" />
                    <Text style={styles.primarycontenttxt}>My Profile</Text>
                </TouchableOpacity>
                {/* leaveapplications */}
                <TouchableOpacity style={styles.contentlist} onPress={leaveapplicationpressed}>
                    <Image source={require("../../assets/managerhomicons/leaveapplication.png")}  style={styles.primarycontenticon} resizeMode="contain" />
                    <Text style={styles.primarycontenttxt}>Leave Application</Text>
                </TouchableOpacity>
                {/* calendarview */}
                <TouchableOpacity style={styles.contentlist} onPress={calendarviewpressed}>
                    <Image source={require("../../assets/managerhomicons/calendarview.png")}  style={styles.primarycontenticon} resizeMode="contain" />
                    <Text style={styles.primarycontenttxt}>Calendar View</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.primarycontentholder}>
                {/* changetheme */}
                {/* <TouchableOpacity style={styles.contentlist}>
                    <Image source={require("../../assets/drawericons/changetheme.png")}  style={[styles.primarycontenticon, { height: windowWidth < 400 ? 25 : 35,}]} resizeMode="contain" />
                    <Text style={styles.primarycontenttxt}>Change Theme</Text>
                </TouchableOpacity> */}
                {/* logout */}
                <TouchableOpacity style={styles.contentlist} onPress={logoutpressed}>
                    <Image source={require("../../assets/drawericons/logout.png")}  style={[styles.primarycontenticon, { height: windowWidth < 400 ? 20 : 30,}]} resizeMode="contain" />
                    <Text style={styles.primarycontenttxt}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingVertical: windowWidth < 400 ? 25 : 30,
        paddingHorizontal: windowWidth < 400 ? 20 : 25,
    },
    menuicon:{
        height: 30,
        width: 30,
    },
    profilecontainer:{
        height: windowHeight < 800 ? 170 : 230,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: windowHeight < 800 ? 5 : 15,
    },
    piccontainer:{
        borderRadius: 100,
        backgroundColor: lightColors.fields,
        height: windowHeight < 800 ? 100 : 125,
        width: windowHeight < 800 ? 100 : 125,
        alignItems: "center",
        justifyContent: "center",
    },
    dp:{
        height: windowHeight < 800 ? 160 : 200,
        width: windowHeight < 800 ? 160 : 200,
    },
    profileinfo:{
        alignItems: "center",
    },
    name:{
        fontFamily: "Now-Bold",
        color: lightColors.secondary,
        fontSize: windowWidth < 400 ? 15 : 20,
    },
    empid:{
        fontFamily: "Now-Bold",
        color: lightColors.secondary,
        fontSize: windowWidth < 400 ? 10 : 15,
    },
    divider:{
        width: "100%",
        height: 2,
        backgroundColor: lightColors.secondary,
        marginVertical: windowHeight < 800 ? 10 : 20,
    },
    primarycontentholder:{
        width: "100%",
        height: windowHeight < 800 ? 160 : 220,
    },
    contentlist:{
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: windowWidth < 400 ? 0 : 10,
        paddingLeft: windowWidth < 400 ? 10 : 20,
    },
    primarycontenticon:{
        height: windowWidth < 400 ? 30 : 40,
        width: windowWidth < 400 ? 30 : 40,
    },
    primarycontenttxt:{
        fontFamily: "Now-Bold",
        paddingLeft: windowWidth < 400 ? 20 : 30,
        fontSize: windowWidth < 400 ? 15 : 20,
    },
})

export default CustomDrawer;