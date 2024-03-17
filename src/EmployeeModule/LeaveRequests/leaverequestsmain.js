import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Headers from '../../components/headers'
import { useNavigation } from '@react-navigation/native'
import lightColors from '../../colors/colors'
import HeadTabNavigator from './headtabs/headtabnavigator'

const LeaveRequests = () => {
    const navigation = useNavigation();

    const backpressed = () => {
        navigation.goBack()
    }
  return (
    <View style={styles.container}>
      <Headers value={"Leave Applications"} onPress={backpressed} />
      <HeadTabNavigator />
    </View>
  )
}

export default LeaveRequests

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: lightColors.background,
        paddingHorizontal: 20,
    },
})