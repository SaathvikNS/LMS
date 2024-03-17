import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View, } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import lightColors from "../colors/colors";
import { TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { Controller } from "react-hook-form";

const windowHeight = Dimensions.get("window").height;

const InputBox = ({control, name, placeholder = "placeholder", hide, pass = false}) => {
    const [hidden, setHidden] = useState(true);
    const [show, setShow] = useState(hide)

    return(
        <>
            <Controller     
                control={control} 
                name={name}
                render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                    <View style={styles.container}>
                        {error &&(
                            <Text style={styles.errorMessage}>{error?.message}</Text> 
                        )}
                        <TextInput 
                        style={[styles.inputbox, { backgroundColor: "#ffffff", color: lightColors.fieldtext}]}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder} 
                        placeholderTextColor={"#00000066"}
                        secureTextEntry={show}
                        />
                        {pass ? (<TouchableOpacity style={styles.iconcontainer} onPress={() => {
                            setShow(!show)
                            setHidden(!hidden)
                        }}>
                                <Ionicon name={hidden ? "eye-outline" : "eye-off-outline"} size={23} color={lightColors.fieldtextx}/>
                            </TouchableOpacity>
                            ) : null}
                    </View>
                )}
            />  
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginVertical: windowHeight < 800 ? 5 : 10,
    },
    errorMessage:{
        color: "#ff8888",
        paddingHorizontal: 20,
    },
    inputbox:{
        marginTop: 2,
        fontSize: windowHeight < 800 ? 15 : 20,
        fontFamily: 'Inder-Regular',
        paddingHorizontal: 20,
        height: 45,
        width: '100%',
        borderRadius: 50,
    },
    iconcontainer:{
        position: "absolute",
        top: 13,
        right: 20,
    },
    errorMessage:{
        position: "absolute",
        top: -15,
        color: "#ff8888",
        paddingHorizontal: 20,
    },
})

export default InputBox