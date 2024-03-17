import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import lightColors from "./colors/colors";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const LoadingScreen = ({navigation}) => {
    useEffect( () => {
        setTimeout(() => {
            navigation.navigate('Welcome');
        }, 3000);
    },  [])
    return(
        <View style={styles.container}>
            <View style={styles.imgcontainer}>
                <Image source={require("../assets/LoadingScreen/LMS.png")} style={styles.img} />
                <Text style={styles.imgtxt}>LMS</Text>
            </View>
            <View style={styles.loadingContainer}>
                <Image source={require("../assets/LoadingScreen/Loading.gif")} style={styles.loader} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white",
    },
    imgcontainer:{
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
    },
    img:{
        width: windowWidth < 400 ? 100 : 150,
        height: windowWidth < 400 ? 100 : 150,
    },
    imgtxt:{
        paddingVertical: 10,
        fontFamily: 'LilitaOne-Regular',
        fontSize: windowWidth < 400 ? 25 : 35,
        color: lightColors.primary,
    },
    loadingContainer:{
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    loader:{
        height: windowHeight < 800 ? 100 : 150,
        width: windowHeight < 800 ? 100 : 150,
    },
})

export default LoadingScreen;