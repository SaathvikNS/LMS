import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import lightColors from '../../../../colors/colors'
import axios from 'axios'
import { MyContext } from '../../../../../Global/context'
import { useNavigation } from '@react-navigation/native'
import LottieView from "lottie-react-native"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ApplicationRequests = () => {
  
  const {instname, applications, setapplications, setempcontact, setempdoj, setempdept, setempdob, setempmail, setempempid, setempgender, setempname, setempverified, setemployeemodule, employeemodule,} = useContext(MyContext);
  
  const navigation = useNavigation();

  const [loading, setloading] = useState(false)
  
  useEffect(() => {
    const fetchapplications = async () => {
      try {
        const {data} = await axios.post("http://192.168.50.79:8000/api/user/getapplication", {instname})
        setapplications(data.employeeData)
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
  const acceptpressed = async (key) => {
    try {
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/verifyemployee", {empid: key})
      console.log(data)
      if(data.success){
        const updatedapplications = {...applications}
        delete updatedapplications[key]
        setapplications(updatedapplications);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  const rejectpressed = async (key) => {
    try {
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/unverifyemployee", {empid: key})
      console.log(data)
      if(data.success){
        const updatedapplications = {...applications}
        delete updatedapplications[key]
        setapplications(updatedapplications);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const applicationlists = Object.entries(applications).map(([key, value], index) => (
    <View key={index} style={styles.mappedcontainer}>
      <TouchableOpacity style={styles.touchable} onPress={()=>{mappeditempressed(key)}}>
        <Text style={styles.mappedtext}>{value}</Text>
        <View style={styles.buttonswrapper}>
          <TouchableOpacity style={styles.acceptwrapper} onPress={()=>{acceptpressed(key)}}>
            <Image source={require("../../../../../assets/customIcons/accept.png")} style={styles.accept} resizeMode='contain' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectwrapper} onPress={()=>{rejectpressed(key)}}>
            <Image source={require("../../../../../assets/customIcons/reject.png")} style={styles.reject} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  ));
  
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.container}>
          <LottieView source={require("../../../../../assets/customIcons/loader.json")} autoPlay loop style={styles.loading}/>
        </View>
      ) : applicationlists}
    </View>
  )
}

export default ApplicationRequests

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
    buttonswrapper:{
      height: "100%",
      width: windowHeight < 800? 70 :100,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    acceptwrapper:{
      height: "100%",
      width: "50%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    accept:{
      height: "70%",
      width: "70%",
    },
    rejectwrapper:{
      height: "100%",
      width: "50%",
      alignItems: 'center',
      justifyContent: 'center',
    },
    reject:{
      height: "70%",
      width: "70%",
    },
  })