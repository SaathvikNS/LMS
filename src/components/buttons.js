import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import lightColors from "../colors/colors";

const windowHeight = Dimensions.get('window').height;

const Buttons = ({value, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.butwrapper} activeOpacity={.7}>
            <Text style={styles.buttext}>{value}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    butwrapper:{
        width: "80%",
        height: windowHeight < 800 ? 40 : 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: lightColors.background,
        borderRadius: 50,
        marginVertical: windowHeight < 800 ? 10 : 20,
        zIndex: 1,
    },
    buttext:{
        fontFamily: 'Fredoka-Bold',
        fontSize: windowHeight < 800 ? 20 : 25,
        color: lightColors.secondary,
    },
})

export default Buttons;