import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { MyContext } from '../../../../Global/context';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import Headers from '../../../components/headers';
import lightColors from '../../../colors/colors';
import { Dimensions } from 'react-native';
import HeadTabNavigator from './headtabs/headtabnavigator';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const EmployeeManagement = () => {
    const {department} = useContext(MyContext);

    const navigation = useNavigation();

    const departmentlist = Object.entries(department).map(([key, value], index) => (
        <View key={index} style={styles.mappedcontainer}>
          <Text style={styles.mappedtext}>{key}</Text>
          <Text style={styles.mappedtext}>{value}</Text>
        </View>
    ));

    const backpressed = () => {
        navigation.goBack();
    }

  return (
    <View style={styles.container}>
        <Headers onPress={backpressed} value={"Emp. Management"}/>
        <HeadTabNavigator />
    </View>
  )
}

export default EmployeeManagement

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