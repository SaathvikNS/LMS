import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import lightColors from '../colors/colors'
import { JumpingTransition } from 'react-native-reanimated'

const windowWidth = Dimensions.get("window").width

const Headers = ({onPress, value}) => {
  return (
    <View style={styles.wrapper}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.backbut} onPress={onPress}>
                <Ionicons name="chevron-back-outline" size={windowWidth < 400 ? 35 : 50} color={lightColors.secondary} />
            </TouchableOpacity>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>{value}</Text>
            </View>
        </View>
        <View style={styles.divider}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: "5%",
        marginBottom: "1%",
        height: 60,
        flexDirection: "row",
        alignItems: 'center',
    },
    backbut:{
        zIndex: 2,
    },
    titlecontainer:{
        width: "90%",
        alignItems: 'center',
    },
    title:{
        fontFamily: "Fredoka-Bold",
        fontSize: windowWidth < 400 ? 22 : 28,
        color: lightColors.secondary,
    },
    divider:{
        alignSelf: 'center',
        width: "100%",
        height: 2,
        backgroundColor: lightColors.secondary,
        opacity: .6,
    },
})

export default Headers