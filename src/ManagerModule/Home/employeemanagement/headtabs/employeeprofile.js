import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ProfileInfoBlocks from "../../../../components/profileinfoblocks";
import GradientButton from "../../../../components/gradientbutton";
import { Dimensions } from "react-native";
import lightColors from "../../../../colors/colors";
import Headers from "../../../../components/headers";
import { ScrollView } from "react-native";
import { MyContext } from "../../../../../Global/context";
import { TouchableOpacity } from "react-native";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const CompanyManagementMain = ({ navigation }) => {
  const {
    empname,
    empempid,
    employeemodule,
    empdept,
    empmail,
    empcontact,
    empdoj,
    empdob,
    empgender,
    empverified,
    applications,
    setapplications,
    setemployeelist,
    employeelist,
  } = useContext(MyContext);

  const backpressed = () => {
    navigation.goBack();
  };

  const acceptpressed = async () => {
    try {
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/verifyemployee", {empid: empempid})
      console.log(data)
      if(data.success){
        const updatedapplications = {...applications}
        delete updatedapplications[empempid]
        setapplications(updatedapplications);
        const updatedemployeelist = {...employeelist}
        updatedemployeelist[empempid] = empname
        setemployeelist(updatedemployeelist)
      }
      navigation.goBack()
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const rejectpressed = async () => {
    try {
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/unverifyemployee", {empid: empempid})
      console.log(data)
      if(data.success){
        const updatedapplications = {...applications}
        delete updatedapplications[empempid]
        setapplications(updatedapplications);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const removepressed = async () => {
    try {
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/removeemployee", {empid: empempid})
      console.log(data)
      if(data.success){
        const updatedemployeelist = {...employeelist}
        delete updatedemployeelist[empempid]
        setemployeelist(updatedemployeelist)
      }
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <View style={styles.container}>
      <Headers value={"Employee Profile"} onPress={backpressed} />
      <View style={styles.profilecontainer}>
        <View style={styles.piccontainer}>
          <Image
            source={require("../../../../../assets/customIcons/dp.png")}
            style={styles.dp}
            resizeMode="contain"
          />
        </View>
        <View style={styles.profileinfo}>
          <Text style={styles.name}>{empname}</Text>
          <Text style={styles.empid}>{empempid}</Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentwrapper}>
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/jobtitle.png")}
            keyplace={"Job Title"}
            valueplace={employeemodule || "-"}
          />
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/department.png")}
            keyplace={"Department"}
            valueplace={empdept || "-"}
          />
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/email.png")}
            keyplace={"E mail"}
            valueplace={empmail || "-"}
          />
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/contact.png")}
            keyplace={"Contact"}
            valueplace={empcontact || "-"}
          />
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/doj.png")}
            keyplace={"Date of Joining"}
            valueplace={empdoj || "-"}
          />
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/dob.png")}
            keyplace={"Date of Birth"}
            valueplace={empdob || "-"}
          />
          <ProfileInfoBlocks
            source={require("../../../../../assets/profileicons/gender.png")}
            keyplace={"Gender"}
            valueplace={empgender || "-"}
          />
        </View>
        <View style={styles.buttonwrapper}>
          {empverified ? (
            <View style={styles.verifiedbuttons}>
              <TouchableOpacity style={styles.butwrapper} onPress={removepressed}>
                <Text style={styles.buttext}>Remove</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.unverifiedbutton}>
              <TouchableOpacity style={styles.acceptbutwrapper} onPress={acceptpressed}>
                <Text style={styles.buttext}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.butwrapper} onPress={rejectpressed}>
                <Text style={styles.buttext}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CompanyManagementMain;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth < 400 ? 20 : 25,
    flex: 1,
    backgroundColor: lightColors.background,
    paddingBottom: 60,
  },
  profilecontainer: {
    height: windowHeight < 800 ? 250 : 320,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: windowHeight < 800 ? 20 : 40,
  },
  piccontainer: {
    borderRadius: 100,
    backgroundColor: lightColors.fields,
    height: windowHeight < 800 ? 150 : 200,
    width: windowHeight < 800 ? 150 : 200,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  dp: {
    height: windowHeight < 800 ? 240 : 320,
    width: windowHeight < 800 ? 240 : 320,
  },
  profileinfo: {
    alignItems: "center",
  },
  name: {
    fontFamily: "Now-Bold",
    color: lightColors.secondary,
    fontSize: windowWidth < 400 ? 20 : 25,
    marginBottom: 5,
  },
  empid: {
    fontFamily: "Now-Bold",
    color: lightColors.secondary,
    fontSize: windowWidth < 400 ? 15 : 20,
  },
  divider: {
    alignSelf: "center",
    width: "100%",
    height: 2,
    backgroundColor: lightColors.secondary,
    marginVertical: windowHeight < 800 ? 5 : 5,
    opacity: 0.7,
  },
  contentwrapper: {
    width: "100%",
    marginTop: windowHeight < 800 ? 10 : 20,
    alignSelf: "center",
  },
  buttonwrapper: {
    width: "100%",
    marginTop: windowHeight < 800 ? 30 : 50,
    marginBottom: 20,
  },
  leaveswrapper: {
    marginTop: 10,
  },
  heading: {
    width: "100%",
  },
  leaveheading: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 16 : 20,
    color: lightColors.secondary,
  },
  leavelist: {
    marginTop: windowHeight < 800 ? 10 : 20,
  },
  mappedtext: {
    fontFamily: "Now-Bold",
    color: lightColors.mainText,
    fontSize: windowWidth < 400 ? 13 : 18,
  },
  verifiedbuttons: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  unverifiedbutton: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  butwrapper: {
    width: "80%",
    height: windowHeight < 800 ? 40 : 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 50,
    marginVertical: windowHeight < 800 ? 5 : 10,
    zIndex: 1,
  },
  acceptbutwrapper: {
    width: "80%",
    height: windowHeight < 800 ? 40 : 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 50,
    marginVertical: windowHeight < 800 ? 5 : 10,
    zIndex: 1,
  },
  buttext: {
    fontFamily: "Fredoka-Bold",
    fontSize: windowHeight < 800 ? 20 : 25,
    color: lightColors.background,
  },
});
