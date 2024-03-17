import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Image } from 'react-native'
import { MyContext } from '../../../Global/context'
import lightColors from '../../colors/colors'
import { Dimensions } from 'react-native'
import ProfileInfoBlocks from '../../components/profileinfoblocks'
import GradientButton from '../../components/gradientbutton'

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ProfileMain = ({navigation}) => {
    const {module, username, email, empid, profilecontact, profiledateofjoin, profiledateofbirth, profilegender, } = useContext(MyContext);
  return (
    <View style={styles.container}>
        <View style={styles.profilecontainer}>
            <View style={styles.piccontainer}>
                <Image source={require("../../../assets/customIcons/dp.png")} style={styles.dp} resizeMode="contain" />
            </View>
            <View style={styles.profileinfo}>
                <Text style={styles.name}>{username}</Text>
                <Text style={styles.empid}>{empid}</Text>
            </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.contentwrapper}>
            <ProfileInfoBlocks source={require("../../../assets/profileicons/jobtitle.png")} keyplace={"Job Title"} valueplace={module || "-"}/>
            <ProfileInfoBlocks source={require("../../../assets/profileicons/email.png")} keyplace={"E mail"} valueplace={email || "-"}/>
            <ProfileInfoBlocks source={require("../../../assets/profileicons/contact.png")} keyplace={"Contact"} valueplace={profilecontact || "-"}/>
            <ProfileInfoBlocks source={require("../../../assets/profileicons/doj.png")} keyplace={"Date of Joining"} valueplace={profiledateofjoin || "-"}/>
            <ProfileInfoBlocks source={require("../../../assets/profileicons/dob.png")} keyplace={"Date of Birth"} valueplace={profiledateofbirth || "-"}/>
            <ProfileInfoBlocks source={require("../../../assets/profileicons/gender.png")} keyplace={"Gender"} valueplace={profilegender || "-"}/>
        </View>
        <View style={styles.buttonwrapper}>
            <GradientButton value={"Edit Profile"} onPress={()=>{navigation.navigate("editprofile")}}/>
        </View>
    </View>
  )
}

export default ProfileMain

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: lightColors.background,
    },
    profilecontainer:{
        height: windowHeight < 800 ? 250 : 320,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        marginTop: windowHeight < 800 ? 40 : 40,
    },
    piccontainer:{
        borderRadius: 100,
        backgroundColor: lightColors.fields,
        height: windowHeight < 800 ? 150 : 200,
        width: windowHeight < 800 ? 150 : 200,
        alignItems: "center",
        justifyContent: "center",
        overflow: 'hidden',
    },
    dp:{
        height: windowHeight < 800 ? 240 : 320,
        width: windowHeight < 800 ? 240 : 320,
    },
    profileinfo:{
        alignItems: "center",
    },
    name:{
        fontFamily: "Now-Bold",
        color: lightColors.secondary,
        fontSize: windowWidth < 400 ? 20 : 25,
        marginBottom: 5,
    },
    empid:{
        fontFamily: "Now-Bold",
        color: lightColors.secondary,
        fontSize: windowWidth < 400 ? 15 : 20,
    },
    divider:{
        alignSelf: 'center',
        width: "90%",
        height: 2,
        backgroundColor: lightColors.secondary,
        marginVertical: windowHeight < 800 ? 10 : 20,
        opacity: .7,
    },
    contentwrapper:{
        width: "90%",
        alignSelf: 'center',
    },
    buttonwrapper:{
        width: "100%",
        marginTop: windowHeight < 800 ? 30 : 50,
    },
})