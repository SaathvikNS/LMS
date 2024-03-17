import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "react-native";
import { MyContext } from "../../../Global/context";
import lightColors from "../../colors/colors";
import { Dimensions } from "react-native";
import GradientButton from "../../components/gradientbutton";
import EditProfileInfoBlocks from "../../components/editprofileinfoblocks";
import { ScrollView } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AppNotification from "../../utils/appnotification";
import { updateNotification } from "../../utils/updatenotification";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const EditProfileMain = ({ navigation }) => {
  const {
    module,
    empname,
    empmail,
    setempmail,
    setempcontact,
    setempdoj,
    setempdob,
    empempid,
    empcontact,
    empdoj,
    empdob,
    empgender,
  } = useContext(MyContext);

  var newMail, newContact, newDOJ, newDOB;

  const [message, setmessage] = useState({
    text: "",
    type: "",
  });

  const submitpressed = async () => {
    if (!newMail) {
      newMail = empmail;
    }
    if (!newContact) {
      newContact = empcontact;
    }
    if (!newDOJ) {
      newDOJ = empdoj;
    }
    if (!newDOB) {
      newDOB = empdob;
    }
    await setempmail(newMail);
    await setempcontact(newContact);
    await setempdoj(newDOJ);
    await setempdob(newDOB);

    try {
      const { data } = await axios.post(
        "http://192.168.50.79:8000/api/user/updateprofile",
        {
          module,
          empid: empempid,
          email: newMail || empmail,
          profilecontact: newContact || empcontact,
          profiledateofjoin: newDOJ || empdoj,
          profiledateofbirth: newDOB || empdob,
        }
      );
      console.log(data);
      navigation.navigate("profilemain");
    } catch (error) {
      updateNotification(setmessage, error.response.data.error);
      console.log(error.response.data);
    }
  };

  const mailchanged = (event) => {
    newMail = event;
  };

  const contactchanged = (event) => {
    newContact = event;
  };

  const dateofjoiningchanged = (event) => {
    newDOJ = event;
  };

  const dateofbirthchanged = (event) => {
    newDOB = event;
  };

  const backpressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <TouchableOpacity style={styles.backbut} onPress={backpressed}>
        <Ionicons
          name="chevron-back-outline"
          size={windowWidth < 400 ? 35 : 50}
          color={lightColors.secondary}
        />
      </TouchableOpacity>
      <View style={styles.profilecontainer}>
        <View style={styles.piccontainer}>
          <Image
            source={require("../../../assets/customIcons/dp.png")}
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
          <EditProfileInfoBlocks
            source={require("../../../assets/profileicons/jobtitle.png")}
            keyplace={"Job Title"}
            valueplace={module}
            editable={false}
          />
          <EditProfileInfoBlocks
            source={require("../../../assets/profileicons/email.png")}
            keyplace={"E mail"}
            valueplace={newMail}
            onChangeText={mailchanged}
            editable={true}
            placeholder={empmail || "Your Mail?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../assets/profileicons/contact.png")}
            keyplace={"Contact"}
            valueplace={newContact}
            onChangeText={contactchanged}
            editable={true}
            placeholder={empcontact || "Your Contact?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../assets/profileicons/doj.png")}
            keyplace={"Date of Joining"}
            valueplace={newDOJ}
            onChangeText={dateofjoiningchanged}
            editable={true}
            placeholder={empdoj || "dd/mm/yyyy"}
          />
          <EditProfileInfoBlocks
            source={require("../../../assets/profileicons/dob.png")}
            keyplace={"Date of Birth"}
            valueplace={newDOB}
            onChangeText={dateofbirthchanged}
            editable={true}
            placeholder={empdob || "dd/mm/yyyy"}
          />
          <EditProfileInfoBlocks
            source={require("../../../assets/profileicons/gender.png")}
            keyplace={"Gender"}
            valueplace={empgender}
            editable={false}
          />
        </View>
        <View style={styles.buttonwrapper}>
          <GradientButton value={"Submit"} onPress={submitpressed} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  profilecontainer: {
    height: windowHeight < 800 ? 250 : 320,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: windowHeight < 800 ? 40 : 40,
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
    width: "90%",
    height: 2,
    backgroundColor: lightColors.secondary,
    marginVertical: windowHeight < 800 ? 10 : 20,
    opacity: 0.7,
  },
  contentwrapper: {
    width: "90%",
    alignSelf: "center",
  },
  buttonwrapper: {
    width: "100%",
    marginTop: windowHeight < 800 ? 30 : 50,
  },
  backbut: {
    zIndex: 2,
    position: "absolute",
    marginTop: 25,
    marginLeft: 10,
  },
});
