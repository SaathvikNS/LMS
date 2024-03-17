import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import lightColors from '../../../../colors/colors'
import axios from 'axios'
import { MyContext } from '../../../../../Global/context'
import { useNavigation } from '@react-navigation/native'
import LottieView from "lottie-react-native"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EmployeeList = () => {
  
  const {instname, employeelist, setemployeelist, setempcontact, setempdoj, setempdept, setempdob, setempmail, setempempid, setempgender, setempname, setempverified, setemployeemodule, employeemodule} = useContext(MyContext);
  
  const navigation = useNavigation();

  const [loading, setloading] = useState(false)
  
  useEffect(() => {
    const fetchapplications = async () => {
      try {
        const {data} = await axios.post("http://192.168.50.79:8000/api/user/getemployees", {instname})
        setemployeelist(data.employeeData)
      } catch (error) {
        console.log(error.response.data);
      }
    }
    fetchapplications()
  }, [])

  const mappeditempressed = async (key) => {
    setloading(true)
    try {
      setemployeemodule("Employee")
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/fetchprofile", {module: employeemodule,empid: key })
      setempname(data.user.name);
      setempempid(data.user.empid);
      setempdept(data.user.department);
      setempmail(data.user.email);
      setempcontact(data.user.number);
      setempdoj(data.user.doj);
      setempdob(data.user.dob);
      setempgender(data.user.gender);
      setloading(false)
      setempverified(data.user.verified)
      navigation.navigate("employeeprofile")
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const employeelists = Object.entries(employeelist).map(([key, value], index) => (
    <View key={index} style={styles.mappedcontainer}>
      <TouchableOpacity style={styles.touchable} onPress={()=>{mappeditempressed(key)}}>
        <Text style={styles.mappedtext}>{value}</Text>
      </TouchableOpacity>
    </View>
  ));
  
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <LottieView source={require("../../../../../assets/customIcons/loader.json")} autoPlay loop style={styles.loading}/>
        </View>
      ) : employeelists}
    </View>
  )
}

export default EmployeeList

const styles = StyleSheet.create({
  container:{
    paddingTop: 10,
    backgroundColor: lightColors.background,
    flex: 1,
  },
  loader:{
    paddingTop: 10,
    backgroundColor: lightColors.background,
    flex: 1,
  },
  loading:{
    alignSelf:'center',
    height: 150,
    width: 150,
  },
    mappedcontainer:{
        marginVertical: 10,
        borderRadius: 100,
        height: windowHeight < 800 ? 40 : 50,
        width: "100%",
        backgroundColor: lightColors.fields,
    },
    touchable:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      height: "100%",
    },
    mappedtext:{
        fontFamily: "Now-Bold",
        fontSize: windowWidth < 400 ? 14 : 16,
        color: lightColors.secondary,
    },
  })