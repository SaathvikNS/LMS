import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useRef } from "react";
import ProfileInfoBlocks from "../../../components/profileinfoblocks";
import GradientButton from "../../../components/gradientbutton";
import { MyContext } from "../../../../Global/context";
import { Dimensions } from "react-native";
import lightColors from "../../../colors/colors";
import Headers from "../../../components/headers";
import { ScrollView } from "react-native";
import EditProfileInfoBlocks from "../../../components/editprofileinfoblocks";
import axios from "axios";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const EditCompanyManagement = ({ navigation }) => {
  const {
    instname,
    area,
    city,
    state,
    country,
    pincode,
    yoe,
    companymail,
    companycontact,
    empcount,
    leaves,
  } = useContext(MyContext);
  const {
    setarea,
    setcity,
    setstate,
    setcountry,
    setpincode,
    setyoe,
    setcompanymail,
    setcompanycontact,
  } = useContext(MyContext);

  const newArea = useRef("");
  const newCity = useRef("");
  const newState = useRef("");
  const newCountry = useRef("");
  const newPincode = useRef("");
  const newYOE = useRef("");
  const newEmail = useRef("");
  const newContact = useRef("");

  const leavelist = Object.entries(leaves).map(([key], index) => (
    <View key={index} style={styles.mappedcontainer}>
      <Text style={styles.mappedtext}>• {key}</Text>
    </View>
  ));

  const submitpressed = async () => {
    if (!newArea.current) {
      newArea.current = area;
    }
    if (!newCity.current) {
      newCity.current = city;
    }
    if (!newState.current) {
      newState.current = state;
    }
    if (!newCountry.current) {
      newCountry.current = country;
    }
    if (!newPincode.current) {
      newPincode.current = pincode;
    }
    if (!newYOE.current) {
      newYOE.current = yoe;
    }
    if (!newEmail.current) {
      newEmail.current = companymail;
    }
    if (!newContact.current) {
      newContact.current = companycontact;
    }

    console.log(
      "before setstate: ",
      newArea.current,
      newCity.current,
      newState.current,
      newCountry.current,
      newPincode.current,
      newYOE.current,
      newEmail.current,
      newContact.current
    );

    setarea(newArea.current);
    setcity(newCity.current);
    setstate(newState.current);
    setcountry(newCountry.current);
    setpincode(newPincode.current);
    setyoe(newYOE.current);
    setcompanymail(newEmail.current);
    setcompanycontact(newContact.current);

    console.log(
      "after setstate:",
      area,
      city,
      state,
      country,
      pincode,
      yoe,
      companymail,
      companycontact
    );

    try {
      const { data } = await axios.post(
        "http://192.168.50.79:8000/api/user/updatecompany",
        {
          instname,
          area: newArea.current,
          city: newCity.current,
          state: newState.current,
          country: newCountry.current,
          pincode: newPincode.current,
          yoe: newYOE.current,
          companymail: newEmail.current,
          companycontact: newContact.current,
          leaves,
        }
      );
      console.log(data);
      navigation.navigate("companymanagementmain");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const areachanged = (event) => {
    newArea.current = event;
    console.log(newArea.current);
  };
  const citychanged = (event) => {
    newCity.current = event;
    console.log(newCity.current);
  };
  const statechanged = (event) => {
    newState.current = event;
    console.log(newState.current);
  };
  const countrychanged = (event) => {
    newCountry.current = event;
    console.log(newCountry.current);
  };
  const pincodechanged = (event) => {
    newPincode.current = event;
    console.log(newPincode.current);
  };
  const yoechanged = (event) => {
    newYOE.current = event;
    console.log(newYOE.current);
  };
  const mailchanged = (event) => {
    newEmail.current = event;
    console.log(newEmail.current);
  };
  const contactchanged = (event) => {
    newContact.current = event;
    console.log(newContact.current);
  };

  const backpressed = () => {
    navigation.goBack();
  };

  const modifyleaves = () => {
    navigation.navigate("modifyleaves");
  };

  return (
    <View style={styles.container}>
      <Headers value={"Company Management"} onPress={backpressed} />
      <View style={styles.profilecontainer}>
        <View style={styles.piccontainer}>
          <Image
            source={require("../../../../assets/customIcons/dp.png")}
            style={styles.dp}
            resizeMode="contain"
          />
        </View>
        <View style={styles.profileinfo}>
          <Text style={styles.name}>{instname}</Text>
        </View>
      </View>
      <View style={styles.divider}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentwrapper}>
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/address.png")}
            keyplace={"Area"}
            valueplace={newArea}
            editable={true}
            onChangeText={areachanged}
            placeholder={area || "Area?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/blank.png")}
            keyplace={"City"}
            valueplace={newCity}
            editable={true}
            onChangeText={citychanged}
            placeholder={city || "City?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/blank.png")}
            keyplace={"State"}
            valueplace={newState}
            editable={true}
            onChangeText={statechanged}
            placeholder={state || "State?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/blank.png")}
            keyplace={"Country"}
            valueplace={newCountry}
            editable={true}
            onChangeText={countrychanged}
            placeholder={country || "Country?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/blank.png")}
            keyplace={"Pincode"}
            valueplace={newPincode}
            editable={true}
            onChangeText={pincodechanged}
            placeholder={pincode || "000000"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/doj.png")}
            keyplace={"Established Year"}
            valueplace={newYOE}
            editable={true}
            onChangeText={yoechanged}
            placeholder={yoe || "dd/mm/yyyy"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/email.png")}
            keyplace={"E-mail"}
            valueplace={newEmail}
            editable={true}
            onChangeText={mailchanged}
            placeholder={companymail || "E-Mail?"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/contact.png")}
            keyplace={"Contact"}
            valueplace={newContact}
            editable={true}
            onChangeText={contactchanged}
            placeholder={companycontact || "0000000000"}
          />
          <EditProfileInfoBlocks
            source={require("../../../../assets/profileicons/employeecount.png")}
            keyplace={"Employee Count"}
            valueplace={String(empcount)}
            editable={false}
          />
        </View>
        <View style={styles.leaveswrapper}>
          <View style={styles.heading}>
            <Text style={styles.leaveheading}>Types of Leaves Available</Text>
          </View>
          <TouchableOpacity style={styles.addremovebut} onPress={modifyleaves}>
            <Text style={styles.addremovetext}>Modify</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leavelist}>{leavelist}</View>
        <View style={styles.buttonwrapper}>
          <GradientButton value={"Submit"} onPress={submitpressed} />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditCompanyManagement;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth < 400 ? 20 : 25,
    flex: 1,
    backgroundColor: lightColors.background,
    paddingBottom: 60,
  },
  profilecontainer: {
    height: windowHeight < 800 ? 200 : 270,
    width: "100%",
    alignItems: "center",
    marginTop: windowHeight < 800 ? 10 : 20,
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
    height: windowHeight < 800 ? 220 : 300,
    width: windowHeight < 800 ? 220 : 300,
  },
  profileinfo: {
    marginTop: 10,
    alignItems: "center",
  },
  name: {
    fontFamily: "Now-Bold",
    color: lightColors.secondary,
    fontSize: windowWidth < 400 ? 20 : 25,
    textAlign: "center",
    top: -5,
  },
  divider: {
    alignSelf: "center",
    width: "100%",
    height: 2,
    backgroundColor: lightColors.secondary,
    marginVertical: windowHeight < 800 ? 10 : 10,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leaveheading: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 15 : 20,
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
  addremovebut: {
    height: 25,
    width: windowWidth < 400 ? 90 : 110,
    backgroundColor: lightColors.fields,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  addremovetext: {
    fontFamily: "Montserrat-Bold",
    fontSize: windowWidth < 400 ? 10 : 12,
    color: lightColors.secondary,
  },
});
