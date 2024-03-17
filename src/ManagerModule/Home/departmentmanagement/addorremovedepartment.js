import { View, Text, Dimensions, ScrollView, } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import lightColors from '../../../colors/colors'
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Headers from '../../../components/headers'
import { MyContext } from '../../../../Global/context'
import GradientButton from '../../../components/gradientbutton'
import axios from 'axios'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddOrRemoveDepartment = () => {
    const {department, setdepartment, instname} = useContext(MyContext);

    const handledeletedepartment = async (key) => {
        const updateddepartment = {...department};
        delete updateddepartment[key]
        setdepartment(updateddepartment)

        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/adddepartment", {instname, department: updateddepartment})
            console.log(data)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const submitpressed = () => {
        navigation.navigate("departmentmanagement")
    }

    const departmentlist = Object.entries(department).map(([key, value], index) => (
        <View key={index} style={styles.mappedcontainer}>
          <Text style={styles.mappedtext}>{key}</Text>
          <TouchableOpacity style={styles.delcontainer} onPress={()=>{handledeletedepartment(key)}}>
            <Ionicons name='trash' size={windowWidth < 400 ? 20 : 30} color={"#FF0000"}/>
          </TouchableOpacity>
        </View>
    ));

    console.log(department);

    const navigation = useNavigation()

    const backpressed = () => {
        navigation.goBack()
    }

  return (
    <View style={styles.container}>
        <Headers onPress={backpressed} value={"Dept. Management"}/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentwrapper}>
                {departmentlist}
            </View>
            <TouchableOpacity style={styles.addwrapper} onPress={()=>{navigation.navigate("adddepartment")}}>
                <View style={styles.adder}>
                    <Text style={styles.add}>+</Text>
                </View>
            </TouchableOpacity>
            <View style={{marginTop: 40,}}>
                <GradientButton value={"SUBMIT"} onPress={submitpressed} />
            </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: lightColors.background,
        paddingHorizontal: 20,
    },
    backbut:{
        left: "2%",
        top: 25,
        position: 'absolute',
        zIndex: 2,
    },
    addremovebut:{
        marginTop: 20,
        height: 25,
        width: windowWidth < 400 ? 120 : 150,
        backgroundColor: lightColors.fields,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
    },
    addremovetext:{
        fontFamily: 'Montserrat-Bold',
        fontSize: windowWidth < 400 ? 10 : 12,
        color: lightColors.secondary,
    },
    contentwrapper:{
        width: "100%",
        marginTop: 10,
    },
    mappedcontainer:{
        marginVertical: 10,
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: windowHeight < 800 ? 40 : 50,
        width: "100%",
        backgroundColor: lightColors.fields,
    },
    mappedtext:{
        fontFamily: "Now-Bold",
        fontSize: windowWidth < 400 ? 14 : 16,
        color: lightColors.secondary,
    },
    delcontainer:{
        width: windowWidth < 400 ? 30 : 40,
        borderLeftColor: lightColors.background,
        borderLeftWidth: 2,
        height: "100%",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    addwrapper:{
        width: "100%",
        alignItems: 'center',
        marginTop: 20,
    },
    adder:{
        height: windowHeight < 800 ? 40 : 50,
        width: windowHeight < 800 ? 40 : 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: lightColors.fields
    },
    add:{
        fontFamily: "LilitaOne-Regular",
        fontSize: 30,
        color: lightColors.secondary,
    },
})

export default AddOrRemoveDepartment