import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import WelcomeScreenBackground from "./Backgrounds/welcomeScreenBackground.js";
import lightColors from "../colors/colors";
import Buttons from "../components/buttons.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WelcomeScreen = ({navigation}) => {
    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.welcometxt}>Welcome</Text>
                    <Text style={styles.elmstxt}>Employee Leave</Text>
                    <Text style={styles.elmstxt}>Management System</Text>
                </View>
                <View style={styles.buttoncontainer}>
                    <Buttons value={'LOGIN'} onPress={()=>{navigation.navigate('Login')}}/>
                    <Buttons value={'SIGNUP'} onPress={()=>{navigation.navigate('Signup')}}/>
                </View>
            </View>
            <WelcomeScreenBackground />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    wrapper:{
        position: "absolute",
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    titlecontainer:{
        height: "30%",
        width: "100%",
        alignItems: "center",
    },
    welcometxt:{
        fontFamily: 'Montserrat-Bold',
        fontSize: windowWidth < 400 ? 30 : 45,
        color: lightColors.secondary,
        top: windowHeight < 800 ? "30%" : "20%",
    },
    elmstxt:{
        fontFamily: 'Montserrat-Bold',
        fontSize: windowWidth < 400 ? 20 : 30,
        color: lightColors.primary,
        top: windowHeight < 800 ? "40%" : "35%",
    },
    buttoncontainer:{
        width: "100%",
        alignItems: "center",
        top: windowHeight<800 ? 240 : 390,
    },
})

export default WelcomeScreen;