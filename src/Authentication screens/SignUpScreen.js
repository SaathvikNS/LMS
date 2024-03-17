import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GradientBackground from "./Backgrounds/GradientBackground";
import lightColors from "../colors/colors";
import MyDropdown from "../components/dropdown";
import InputBox from "../components/textinput";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import GradientButton from "../components/gradientbutton";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import GenderDropdown from "../components/genderdropdown";
import { StackActions, useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import signupValidationSchema from "../utils/signupvalidations";
import { MyContext } from "../../Global/context";
import axios from "axios";
import { updateNotification } from "../utils/updatenotification";
import AppNotification from "../utils/appnotification";
import InstituteDropdown from "../components/institutedropdown";
import DepartmentDropdown from "../components/departmentdropdown";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const SignUpScreen = () => {
    const {module, setModule, gender, employeeinst, employeedepartment} = useContext(MyContext)

    const navigation = useNavigation();

    const date = new Date()
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1;
    var curr_year = date.getFullYear();

    var dateofjoin
    if(curr_month < 10){
        dateofjoin = (curr_date + "/0" + curr_month + "/" + curr_year)
    } else{
        dateofjoin = (curr_date + "/" + curr_month + "/" + curr_year)
    }

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(signupValidationSchema)
    })

    const [message, setmessage] = useState({
        text: '',
        type: '',
    })

    const backPressed = () => {
        navigation.goBack()
        setModule(null)
    }

    const signupPressed = async (values) => {
        if (module === "Manager") {
            try {
                const {data} = await axios.post("http://192.168.50.79:8000/api/user/createmanager", {...values, gender, dateofjoin})
                console.log(data)
                setModule(null)
                navigation.dispatch(StackActions.replace('Login'))
            } catch (error) {
                updateNotification(setmessage, error.response.data.error)
                console.log(error.response.data);
            }
        } else if (module === "Employee") {
            try {
                const {data} = await axios.post("http://192.168.50.79:8000/api/user/createemployee", {...values, gender, instname: employeeinst, dateofjoin, department: employeedepartment})
                console.log(data)
                setModule(null)
                navigation.dispatch(StackActions.replace('Login'))
            } catch (error) {
                updateNotification(setmessage, error.response.data.error)
                console.log(error.response.data);
            }
        }
    }

    const loginPressed = () => {
        navigation.navigate("Login")
    }

    return(
        <View style={styles.container}>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <TouchableOpacity style={styles.backbut} onPress={() => {backPressed()}}>
                <Ionicons name="chevron-back-outline" size={windowWidth < 400 ? 40 : 50} color={lightColors.background} />
            </TouchableOpacity>
            <View style={styles.contentwrapper}>
                <View style={styles.fieldscontainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.scrollcontainer}>
                            <View style={styles.profilepiccontainer}>
                                <Image source={require("../../assets/customIcons/dp.png")} style={styles.dp} resizeMode="contain" />
                            </View>
                            <TouchableOpacity style={styles.adddp} activeOpacity={.7}>
                                <Text style={styles.adddptxt}>+</Text>
                            </TouchableOpacity>
                            <View style={styles.inputcontainer}>
                                <InputBox control={control} name="name" placeholder="Name" />
                                <InputBox control={control} name="email" placeholder="E-mail" />
                                <InputBox control={control} name="password" placeholder="Password" hide pass/>
                                <InputBox control={control} name="confirmpassword" placeholder="Confirm Password" hide pass/>
                                <View style={styles.genderdrop}>
                                    <GenderDropdown />
                                </View>
                                <View style={styles.moduledrop}>
                                    <MyDropdown />
                                </View>
                                {module == "Manager" ? (
                                    <View style={{width: "100%", alignItems: "center",}}>
                                        <InputBox control={control} name="instname" placeholder="Institute Name" />
                                        <InputBox control={control} name="empid" placeholder="Emp. Id" />
                                    </View>
                                ) : ( module == "Employee" ? (
                                    <View style={{width: "100%", alignItems: "center", zIndex: 1,}}>
                                        <InputBox control={control} name="empid" placeholder="Emp. Id" />
                                        <InstituteDropdown />
                                        {employeeinst ? (
                                            <DepartmentDropdown />
                                        ) : null}
                                    </View>
                                ) : null)}
                                <View style={styles.buttonwrapper}>
                                    <GradientButton value={"SIGNUP"} onPress={handleSubmit(signupPressed)} />
                                    <View style={styles.signupquestion}>
                                        <Text style={styles.alreadyhaveaccount}>Already have an account?<Text style={styles.login} onPress={() => {loginPressed()}}> Login </Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <GradientBackground value={'SIGNUP'}/>
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
        height: windowHeight < 800 ? "75%" : "75%",
        paddingBottom: windowHeight < 800 ? 0 : 40,
        width: "90%",
        backgroundColor: lightColors.background,
        top: windowHeight < 800 ? 210 : 310,
        borderRadius: windowWidth < 400 ? 30 : 50,
        overflow: "hidden",
    },
    scrollcontainer:{
        alignItems: "center",
        height: windowHeight < 800 ? 1000 : 1250,
    },
    profilepiccontainer:{
        borderRadius: 100,
        backgroundColor: lightColors.fields,
        height: windowHeight < 800 ? 100 : 125,
        width: windowHeight < 800 ? 100 : 125,
        alignItems: "center",
        justifyContent: "center",
    },
    dp:{
        height: windowHeight < 800 ? 150 : 185,
        width: windowHeight < 800 ? 150 : 185,
    },
    adddp:{
        height: windowWidth < 400 ? 25 : 30,
        width: windowWidth < 400 ? 25 : 30,
        borderRadius: 100,
        top: windowWidth < 400 ? 75 : 95,
        left: windowWidth < 400 ? 185 : 295,
        backgroundColor: lightColors.fields,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    },
    adddptxt:{
        fontFamily: "LilitaOne-Regular",
        fontSize: windowWidth < 400 ? 18 : 20,
        color: lightColors.secondary,
    },
    inputcontainer:{
        width: "100%",
        height: windowHeight - (windowHeight*.2),
        alignItems: "center",
        marginTop: 20,
    },
    genderdrop:{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5,
    },
    moduledrop:{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 4,
    },
    buttonwrapper:{
        width: "100%",
        top: windowHeight < 800 ? 40 : 100,
    },
    signupquestion:{
        width: "100%",
        marginVertical: windowHeight < 800 ? 10 : 20,
        alignItems: "center",
    },
    alreadyhaveaccount:{
        fontFamily: "Inder-Regular",
        color: lightColors.fieldtext,
        fontSize: windowWidth < 400 ? 12 : 15,
    },
    login:{
        fontFamily: "Inder-Regular",
        color: lightColors.secondary,
        fontSize: windowWidth < 400 ? 12 : 15
    },
})

export default SignUpScreen;