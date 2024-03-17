import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { MyContext } from '../../Global/context'
import lightColors from '../colors/colors';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const EmployeeLeaveTypeBlock = ({leavetype}) => {
    const {instleaves, empleaves} = useContext(MyContext);

    var dp
    const leavenamearray = leavetype.split(' ')
    if(leavenamearray.length < 2){
        dp = leavenamearray[0].substring(0,3)
    } else {
        const firstletters = leavenamearray.map(word => word.charAt(0))
        dp = firstletters.join('')
    }
    dp = dp.toUpperCase()

  return (
    <View style={styles.leaveBlock}>
        <Text style={styles.dp}>{dp}</Text>
        <Text style={styles.leaveType}>{leavetype}</Text>
        <View style={styles.divider}></View>
        <View style={styles.valuewrapper}>
            <Text style={styles.leaveValue}>{empleaves[leavetype]} / {instleaves[leavetype]}</Text>
        </View>
    </View>
  )
}

export default EmployeeLeaveTypeBlock

const styles = StyleSheet.create({
    leaveBlock: {
        backgroundColor: lightColors.fields,
        width: windowHeight < 800 ? 120 : 150,
        height: windowHeight < 800 ? 120 : 150,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
      },
      dp:{
        marginTop: windowHeight < 800 ? 25 : 15,
        fontFamily: "Now-Bold",
        fontSize: windowHeight < 800 ? 35 : 40,
        color: lightColors.secondary,
      },
      leaveType: {
        fontFamily: 'Now-Bold',
        fontSize: windowHeight < 800 ? 10 : 15,
        color: lightColors.mainText,
      },
      divider:{
        marginTop: windowHeight < 800 ? 5 : 10,
        height: 2,
        width: "80%",
        backgroundColor: lightColors.secondary,
      },
      valuewrapper:{
        height: 80,
      },
      leaveValue: {
        marginTop: windowHeight < 800 ? 10 : 10,
        fontFamily: "Now-Bold",
        fontSize: windowHeight < 800 ? 20 : 30,
        color: lightColors.secondary,        
      },
})