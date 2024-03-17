import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import lightColors from "../colors/colors";
import GradientBackground from "./Backgrounds/GradientBackground";
import InputBox from "../components/textinput";
import GradientButton from "../components/gradientbutton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import forgotPasswordValidationSchema from "../utils/forgotpasswordvalidationschema";
import MyDropdown from "../components/dropdown";
import { MyContext } from "../../Global/context";
import { StackActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { updateNotification } from "../utils/updatenotification";
import AppNotification from "../utils/appnotification";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const ForgotPasswordScreen = () => {
    const {module, setModule} = useContext(MyContext)

    const navigation = useNavigation()

    const [message, setmessage] = useState({
        text: '',
        type: '',
    })

    const { control, handleSubmit, errors} = useForm({
        resolver: yupResolver(forgotPasswordValidationSchema)
    })

    const backpressed = () => {
        navigation.goBack()
    }

    const submitpressed = async (values) => {
        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/forgotpassword", {...values, module})
            console.log(data);
            navigation.dispatch(StackActions.replace("Login"))
        } catch (error) {
            updateNotification(setmessage, error.response.data.error)
            console.log(error.response.data);
        }
    }

    return(
        <View style={styles.container}>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <TouchableOpacity style={styles.backbut} onPress={backpressed}>
                <Ionicons name="chevron-back-outline" size={windowWidth < 400 ? 40 : 50} color={lightColors.background} />
            </TouchableOpacity>
            <View style={styles.contentwrapper}>
                <View style={styles.fieldscontainer}>
                    <View style={styles.dropdownholder}>
                        <MyDropdown />
                    </View>
                    <View style={styles.inputcontainer}>
                        <InputBox control={control} name="email" placeholder="E-mail"/>
                        <InputBox control={control} name="password" placeholder="New Password" hide pass/>
                        <InputBox control={control} name="confirmpassword" placeholder="Confirm New Password" hide pass/>
                    </View>
                    <View style={styles.buttonwrapper}>
                        <GradientButton value={"Submit"} onPress={handleSubmit(submitpressed)} />
                        <View style={styles.signupquestion}>
                            <Text style={styles.donthaveaccount}>Remember Password? <Text style={styles.signup} onPress={backpressed}> Login </Text></Text>
                        </View>
                    </View>
                </View>
            </View>
            <GradientBackground value={'Forgot Password'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    backbut:{
        left: "2%",
        top: 25,
        position: 'absolute',
        zIndex: 2,
    },
    contentwrapper:{
        position: "absolute",
        height: "100%",
        width: "100%",
        alignItems: "center",
    },
    fieldscontainer:{
        paddingTop: 30,
        height: "75%",
        width: "90%",
        backgroundColor: lightColors.background,
        top: windowHeight < 800 ? 210 : 310,
        borderRadius: windowWidth < 400 ? 30 : 50,
        alignItems: 'center',
        overflow: "hidden",
    },
    inputcontainer:{
        width: "100%",
        height: windowHeight - (windowHeight*.2),
        alignItems: "center",
        marginTop: 20,
    },
    buttonwrapper:{
        width: "100%",
        top: windowHeight < 800 ? 150 : 200,
    },
    signupquestion:{
        width: "100%",
        marginVertical: windowHeight < 800 ? 10 : 20,
        alignItems: "center",
    },
    donthaveaccount:{
        fontFamily: "Inder-Regular",
        color: lightColors.fieldtext,
        fontSize: windowWidth < 400 ? 12 : 15
    },
    signup:{
        fontFamily: "Inder-Regular",
        color: lightColors.secondary,
        fontSize: windowWidth < 400 ? 12 : 15
    },
    dropdownholder:{
        width: "100%",
        top: windowHeight < 800 ? 30 : 40,
        position: "absolute",
        zIndex: 1,
    },
    inputcontainer:{
        width: "100%",
        alignItems: "center",
        top: windowHeight < 800 ? 50 : 75,
    },
})

export default ForgotPasswordScreen;