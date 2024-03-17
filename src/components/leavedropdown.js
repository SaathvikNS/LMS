import React, { useContext, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import lightColors from "../colors/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MyContext } from "../../Global/context";

const windowHeight = Dimensions.get("window").height;


const LeaveDropdown = () => {
    const {instleaves, setcurrentleavetype} = useContext(MyContext)
    const leavearray = Object.keys(instleaves)

    const [selectedValue, setSelectedValue] = useState("Leave Type")
    const [isClicked, setIsClicked] = useState(false)

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdownbut} onPress={() => {
                setSelectedValue('Select Department')
                setcurrentleavetype(null)
                setIsClicked(!isClicked)
                }}>
                <Text style={styles.placeholder}>{selectedValue}</Text>
                <Ionicons name={isClicked ? "chevron-up-outline" : "chevron-down-outline"} size={23} color={lightColors.fieldtextx} />
            </TouchableOpacity>
            {
                isClicked ? (
                    <View style={styles.droppedmenu}>
                        <View style={styles.dropdownoptioncontainer}>
                            <ScrollView nestedScrollEnabled={true}>
                                {leavearray.map((leavetype, index) => (
                                    <TouchableOpacity key={index} onPress={() => {
                                        setSelectedValue(leavetype)
                                        setcurrentleavetype(leavetype)
                                        setIsClicked(!isClicked)
                                        }}>
                                        <Text style={styles.dropdowntext}>{leavetype}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                ) : null
            }            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        alignItems: "center",
        marginTop: windowHeight < 800 ? -5 : -15,
        zIndex: 1,
    },
    dropdownbut:{
        width: "90%",
        height: 45,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: lightColors.fields,
        borderRadius: 50,
        marginVertical: windowHeight < 800 ? 10 : 20,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
    },
    placeholder:{
        fontSize: windowHeight < 800 ? 15 : 20,
        fontFamily: "Inder-Regular",
        color: lightColors.placeholders,
    },
    dropdowntext:{
        fontSize: windowHeight < 800 ? 15 : 20,
        fontFamily: "Inder-Regular",
        color: lightColors.placeholders,
        marginVertical: 10,
    },
    droppedmenu:{
        top: windowHeight < 800 ? -30 : -40,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: "90%",
        height: windowHeight < 800 ? 150 : 170,
        backgroundColor: lightColors.fields,
        paddingHorizontal: 20,
        zIndex: -1,
    },
    dropdownoptioncontainer:{
        top:30,
        height: windowHeight < 800 ? 110 : 130, 
    },
})

export default LeaveDropdown;