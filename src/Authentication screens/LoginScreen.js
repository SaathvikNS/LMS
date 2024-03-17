import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import GradientBackground from "./Backgrounds/GradientBackground";
import lightColors from "../colors/colors";
import MyDropdown from "../components/dropdown";
import InputBox from "../components/textinput";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import GradientButton from "../components/gradientbutton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidationSchema from "../utils/loginvalidationschema";
import { MyContext } from "../../Global/context";
import axios from "axios";
import { updateNotification } from "../utils/updatenotification";
import AppNotification from "../utils/appnotification";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const LoginScreen = () => {
    const {module, setusername, setemail, setempid, setinstname, setprofilecontact, setprofiledateofjoin, setprofiledateofbirth, setprofilegender, } = useContext(MyContext)
    const { setempcontact, setempdoj, setempdept, setempdob, setempmail, setempempid, setempgender, setempinstname, setempleaves, setempname, setempverified, setinstleaves} = useContext(MyContext);

    const navigation = useNavigation()

    const [message, setmessage] = useState({
        text: '',
        type: '',
    })

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(loginValidationSchema)
    })

    const backpressed = () => {
        navigation.goBack()
    }

    const forgotpasswordpressed = () => {
        navigation.navigate('ForgotPassword')
    }

    const loginpressed = async (values) => {
        if (module === "Manager") {
            try {
                const {data} = await axios.post("http://192.168.50.79:8000/api/user/login", {...values, module})
                console.log(data);
    
                setprofilecontact(data.user.contact)
                setprofiledateofjoin(data.user.dateofjoining)
                setprofiledateofbirth(data.user.dob)
                setprofilegender(data.user.gender)
    
                setusername(data.user.name);
                setempid(data.user.empid);
                setemail(data.user.email);
                setinstname(data.user.instname);
                navigation.navigate('ManagerDrawerNavigator')
            } catch (error) {
                updateNotification(setmessage, error.response.data.error)
                console.log(error.response.data);
            }
        } else {
            try {
                const {data} = await axios.post("http://192.168.50.79:8000/api/user/login", {...values, module})
                console.log(data);
                setempcontact(data.user.contact);
                setempdoj(data.user.dateofjoining);
                setempdept(data.user.department);
                setempdob(data.user.dob);
                setempmail(data.user.email);
                setempempid(data.user.empid);
                setempgender(data.user.gender);
                setempinstname(data.user.instname);
                setempleaves(data.user.leaves);
                setempname(data.user.name);
                setempverified(data.user.verified);
                setinstleaves(data.user.instituteleaves)
                navigation.navigate('EmployeeDrawerNavigator')
            } catch (error) {
                updateNotification(setmessage, error.response.data.error)
                console.log(error);
            }
        }
    }

    const signuppressed = () => {
        navigation.navigate('Signup')
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
                        <InputBox control={control} name="email" placeholder="E-mail" />
                        <InputBox control={control} name="password" placeholder="Password" hide pass/>
                        <TouchableOpacity style={styles.forgotpasswordcontainer} onPress={forgotpasswordpressed}>
                            <Text style={styles.forgotpassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonwrapper}>
                        <GradientButton value={"LOGIN"} onPress={handleSubmit(loginpressed)}/>
                        <View style={styles.signupquestion}>
                            <Text style={styles.donthaveaccount}>Don't have an account?<Text style={styles.signup} onPress={signuppressed}> Sign Up </Text></Text>
                        </View>
                    </View>
                </View>
            </View>
            <GradientBackground value={'LOGIN'}/>
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
        height: "100%",
        width: "90%",
        backgroundColor: lightColors.background,
        top: windowHeight < 800 ? 210 : 310,
        borderRadius: windowWidth < 400 ? 30 : 50,
    },
    inputcontainer:{
        width: "100%",
        alignItems: "center",
        top: windowHeight < 800 ? 80 : 105,
    },
    forgotpasswordcontainer:{
        width: "90%",
    },
    forgotpassword:{
        alignSelf: "flex-end",
        fontFamily: "Inder-Regular",
        fontSize: windowWidth < 400 ? 12 : 15,
        marginTop: 10,
        color: lightColors.placeholders,
    },
    buttonwrapper:{
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
})

export default LoginScreen;