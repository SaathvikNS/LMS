import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import lightColors from "../../colors/colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const GradientBackground = ({value}) => {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.title}>{value}</Text>
                </View>
            </View>
            <Svg>
                <Defs>
                    <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={lightColors.primary} />
                        <Stop offset="100%" stopColor={lightColors.secondary} />
                    </LinearGradient>
                </Defs>
                <Rect
                    x={0}
                    y={0}
                    height={windowHeight+100}
                    width={windowWidth}
                    fill="url(#gradient1)"
                />
            </Svg>
            <View style={styles.logocontainer}>
                <Image source={require("../../../assets/LoadingScreen/LMSTrans.png")} style={styles.logo} resizeMode="contain" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        top: 45,
        position: "absolute",
        zIndex: 1,
        width: "100%",
        alignItems: "center",
    },
    container:{
        zIndex: -100,
    },
    logocontainer:{
        height: "100%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
    },
    logo:{
        bottom: windowHeight < 800 ? windowHeight/1.85 : windowHeight/3.2,
        left: windowHeight < 800 ? -13 : -20,
        width: "80%",
        opacity: .3
    },
    backbut:{
        width: "95%",
        top: 25,
    },
    titlecontainer:{
        width: "100%",
        alignItems: "center",
        top: windowWidth < 400 ? 75 : 100,
    },
    title:{
        fontFamily: "Fredoka-Bold",
        fontSize: windowWidth < 400 ? 30 : 50,
        color: lightColors.background,
    },
})

export default GradientBackground;