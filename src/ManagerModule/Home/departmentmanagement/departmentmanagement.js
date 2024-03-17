import { View, Text, Dimensions, ScrollView, } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import lightColors from '../../../colors/colors'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Headers from '../../../components/headers'
import { MyContext } from '../../../../Global/context'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DepartmentManagement = () => {
    const {department} = useContext(MyContext);

    const departmentlist = Object.entries(department).map(([key, value], index) => (
        <View key={index} style={styles.mappedcontainer}>
          <Text style={styles.mappedtext}>{key}</Text>
          <Text style={styles.mappedtext}>{value}</Text>
        </View>
    ));

    console.log(department);

    const navigation = useNavigation()

    const backpressed = () => {
        navigation.goBack()
    }

    const addorremovedepartmentpressed = () => {
        navigation.navigate("addorremovedepartment")
    }

  return (
    <View style={styles.container}>
        <Headers onPress={backpressed} value={"Dept. Management"}/>
        <TouchableOpacity style={styles.addremovebut} onPress={addorremovedepartmentpressed}>
            <Text style={styles.addremovetext}>Add / Remove Dept.</Text>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.contentwrapper}>
                {departmentlist}
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
})

export default DepartmentManagement