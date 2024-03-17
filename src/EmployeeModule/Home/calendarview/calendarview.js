import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Dimensions } from 'react-native'
import lightColors from '../../../colors/colors'
import { Calendar } from 'react-native-calendars'
import Headers from '../../../components/headers'

const windowWidth = Dimensions.get("window").width

const CalendarView = ({navigation}) => {

    const backpressed = () => {
        navigation.goBack()
    }

    const onDayPress = (day) => {
        console.log('Selected day', day);
      };

  return (
    <View style={styles.container}>
        <Headers onPress={backpressed} value={"Calendar View"}/>
        <Calendar
        // markedDates={{
        //   '2023-07-01': { selected: true, marked: true, selectedColor: 'blue' },
        //   '2023-07-10': { marked: true, dotColor: 'green' },
        //   '2023-07-15': { marked: true, dotColor: 'red' },
        // }}
        onDayPress={onDayPress}
        style={styles.calendar}
      />
      <Text style={styles.futureupdate}>Feature available in future updates</Text>
    </View>
  )
}

export default CalendarView

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
    },
    calendar:{
        marginTop: 20,
    },
    futureupdate:{
        alignSelf: 'center',
        marginTop: 30,
        fontFamily: "Now-Bold",
        color: lightColors.secondary,
    },
})