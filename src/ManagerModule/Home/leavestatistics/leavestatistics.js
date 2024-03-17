import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Headers from "../../../components/headers";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../../../../Global/context";
import lightColors from "../../../colors/colors";
import { Dimensions } from "react-native";
import HolidayBarChart from "./barchart";
import LeaveUtilizationGaugeChart from "./donut";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const LeaveStatistics = () => {
    const {mydata} = useContext(MyContext)
    console.log(mydata)

    const navigation = useNavigation();

  const backpressed = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Headers value={"Leave Statistics"} onPress={backpressed} />
      <View style={styles.headingwrapper}>
        <Text style={styles.heading}>Leaves Used the most</Text>
      </View>
      <View style={{height: 250, width: "100%",}}>
        <HolidayBarChart />
      </View>
    </View>
  );
};

export default LeaveStatistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headingwrapper: {
    height: windowWidth < 400 ? 20 : 30,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Montserrat-Bold",
    fontSize: windowHeight < 800 ? 13 : 15,
    color: lightColors.secondary,
  },
  leavesleftgradient: {
    width: windowHeight < 800 ? "85%" : "85%",
    height: windowHeight < 800 ? 140 : 180,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: windowHeight < 800 ? 10 : 40,
  },
  progress: {
    backgroundColor: "red",
    height: windowHeight < 800 ? 180 : 250,
    width: "100%",
    marginTop: 10,
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
  },
  leavetextkey: {
    fontFamily: "Montserrat-Bold",
    fontSize: windowHeight < 800 ? 12 : 18,
    color: lightColors.background,
  },
  leavetextvalue: {
    fontFamily: "Montserrat-Bold",
    fontSize: windowHeight < 800 ? 12 : 18,
    color: lightColors.background,
  },
  valuecontainer: {
    height: "80%",
    justifyContent: "space-evenly",
    paddingHorizontal: windowHeight < 800 ? 15 : 20,
  },
});
