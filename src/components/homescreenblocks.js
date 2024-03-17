import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import lightColors from '../colors/colors';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreenBlocks = ({text, source, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.content}>
            <Image source={source} resizeMode='contain' style={styles.img} />
            <Text style={styles.text}>{text}</Text>
        </View>
        <LinearGradient 
            colors={[lightColors.secondary, lightColors.primary]}
            start={[0,0]}
            end={[1,0]}
            style={styles.bottomborder}
        />
    </TouchableOpacity>
  )
}

export default HomeScreenBlocks

const styles = StyleSheet.create({
    container:{
        height: windowHeight < 800 ? 90 : 130,
        width: windowHeight < 800 ? 130 : 200,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    bottomborder:{
        height: 5,
        width: "100%",
        position: 'absolute',
        bottom: 0,
    },
    content:{
        height: "100%",
        width: "100%",
        paddingBottom: windowHeight < 800 ? 5 : 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5,
        paddingBottom: windowWidth < 400 ? 10 : 15,
    },
    img:{
        height: windowHeight < 800 ? 50 : 70,
        width: windowHeight < 800 ? 50 : 70,
    },
    text:{
        fontFamily: "Now-Bold",
        fontSize: windowHeight < 800 ? 11 : 16,
    },
})