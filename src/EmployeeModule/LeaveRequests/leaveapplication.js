import { StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import lightColors from "../../colors/colors";
import { useNavigation } from "@react-navigation/native";
import Headers from "../../components/headers";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import leaveApplicationValidationSchema from "../../utils/leaveapplicationvalidationschema";
import InputBox from "../../components/textinput";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Dimensions } from "react-native";
import { Modal } from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import LeaveDropdown from "../../components/leavedropdown";
import GradientButton from "../../components/gradientbutton";
import { MyContext } from "../../../Global/context";
import axios from "axios";
import { updateNotification } from "../../utils/updatenotification";
import AppNotification from "../../utils/appnotification";

const windowHeight = Dimensions.get("window").height;

const LeaveApplication = () => {
  const {
    setcurrentleavetype,
    empinstname,
    currentleavetype,
    empempid,
    leavefromdate,
    setleavefromdate,
    leavetodate,
    setleavetodate,
  } = useContext(MyContext);

  const [openfrom, setopenfrom] = useState(false);
  const [opento, setopento] = useState(false);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [noofdays, setnoofdays] = useState();
  const [message, setmessage] = useState({
    text: "",
    type: "",
  });

  // to calculate days between the dates
  //__________________________________________________________________

  useEffect(() => {
    if (fromdate && todate) {
      const date1array = fromdate.split("/");
      const date2array = todate.split("/");

      const d1 = new Date(date1array[2], date1array[1], date1array[0]);
      const d2 = new Date(date2array[2], date2array[1], date2array[0]);

      const timediff = d2.getTime() - d1.getTime();

      const days = Math.ceil(timediff / (1000 * 60 * 60 * 24));
      setnoofdays(days + 1);
    }
  }, [fromdate, todate]);

  // _________________________________________________________________

  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );

  const [unformattedfrom, setunformattedfrom] = useState(startDate);
  const [unformattedto, setunformattedto] = useState("2099/12/30");

  const navigation = useNavigation();

  const backpressed = () => {
    navigation.goBack();
  };

  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(leaveApplicationValidationSchema),
  });

  const handlefromdatechange = (propdate) => {
    setunformattedfrom(propdate);
    const datearray = propdate.split("/");
    const newdate = datearray[2] + "/" + datearray[1] + "/" + datearray[0];
    setfromdate(newdate);
    setleavefromdate(newdate);
  };

  const handletodatechange = (propdate) => {
    setunformattedto(propdate);
    const datearray = propdate.split("/");
    const newdate = datearray[2] + "/" + datearray[1] + "/" + datearray[0];
    settodate(newdate);
    setleavetodate(newdate);
  };

  const submitpressed = async (values) => {
    try {
      const { data } = await axios.post(
        "http://192.168.50.79:8000/api/user/applyleave",
        {
          instname: empinstname,
          empid: empempid,
          fromdate: leavefromdate,
          todate: leavetodate,
          leavetype: currentleavetype,
          reason: values.reason,
          noofdays,
        }
      );
      setcurrentleavetype(null);
      navigation.goBack();
    } catch (error) {
      updateNotification(setmessage, error.response.data.error);
      console.log(error.response.data);
    }
  };

  return (
    <View style={{flex:1, width: "100%",}}>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <View style={styles.container}>
        <Headers value={"Leave Application"} onPress={backpressed} />
        <View style={styles.contentcontainer}>
          {/* fromdate */}
          <Controller
            control={control}
            name={"fromdate"}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <View
                style={[
                  styles.fromcontainer,
                  { marginVertical: windowHeight < 800 ? 5 : 10 },
                ]}
              >
                {error && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
                <TextInput
                  style={[
                    styles.inputbox,
                    {
                      backgroundColor: "#ffffff",
                      color: lightColors.fieldtext,
                    },
                  ]}
                  value={fromdate || ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={"From Date"}
                  placeholderTextColor={"#00000066"}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.iconcontainer}
                  onPress={() => {
                    setopenfrom(!openfrom);
                  }}
                >
                  <Ionicon
                    name={"calendar-outline"}
                    size={23}
                    color={lightColors.fieldtextx}
                  />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={openfrom}
                >
                  <View style={styles.centeredview}>
                    <View style={styles.modalview}>
                      <DatePicker
                        mode="calendar"
                        onDateChange={handlefromdatechange}
                        minimumDate={startDate}
                        maximumDate={unformattedto}
                      />
                      <TouchableOpacity
                        style={styles.calclose}
                        onPress={() => {
                          setopenfrom(!openfrom);
                        }}
                      >
                        <Text style={styles.closetxt}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          />
          {/* todate */}
          <Controller
            control={control}
            name={"todate"}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <View
                style={[
                  styles.fromcontainer,
                  {
                    marginTop: windowHeight < 800 ? 5 : 10,
                    marginBottom: windowHeight < 800 ? 10 : 20,
                  },
                ]}
              >
                {error && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
                <TextInput
                  style={[
                    styles.inputbox,
                    {
                      backgroundColor: "#ffffff",
                      color: lightColors.fieldtext,
                    },
                  ]}
                  value={todate || ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={"To Date"}
                  placeholderTextColor={"#00000066"}
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.iconcontainer}
                  onPress={() => {
                    setopento(!opento);
                  }}
                >
                  <Ionicon
                    name={"calendar-outline"}
                    size={23}
                    color={lightColors.fieldtextx}
                  />
                </TouchableOpacity>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={opento}
                >
                  <View style={styles.centeredview}>
                    <View style={styles.modalview}>
                      <DatePicker
                        mode="calendar"
                        onDateChange={handletodatechange}
                        minimumDate={unformattedfrom}
                      />
                      <TouchableOpacity
                        style={styles.calclose}
                        onPress={() => {
                          setopento(!opento);
                        }}
                      >
                        <Text style={styles.closetxt}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          />
          <LeaveDropdown />
          {/* Reason */}
          <Controller
            control={control}
            name={"reason"}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <View style={styles.fromcontainer}>
                {error && (
                  <Text style={styles.errorMessage}>{error?.message}</Text>
                )}
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollViewContent}
                  nestedScrollEnabled={true}
                >
                  <TextInput
                    style={styles.reasoninputbox}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder={"Reason"}
                    placeholderTextColor={"#00000066"}
                    multiline={true}
                  />
                </ScrollView>
              </View>
            )}
          />
          <View style={styles.button}>
            <GradientButton
              value={"Submit"}
              onPress={handleSubmit(submitpressed)}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LeaveApplication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    paddingHorizontal: 20,
  },
  contentcontainer: {
    alignItems: "center",
    marginTop: 10,
  },
  fromcontainer: {
    width: "90%",
  },
  errorMessage: {
    color: "#ff8888",
    paddingHorizontal: 20,
  },
  inputbox: {
    marginTop: 2,
    fontSize: windowHeight < 800 ? 15 : 20,
    fontFamily: "Inder-Regular",
    paddingHorizontal: 20,
    height: 45,
    width: "100%",
    borderRadius: 50,
  },
  reasoninputbox: {
    backgroundColor: "#ffffff",
    color: lightColors.fieldtext,
    height: 200,
    marginTop: 2,
    fontSize: windowHeight < 800 ? 15 : 20,
    fontFamily: "Inder-Regular",
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 15,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  iconcontainer: {
    position: "absolute",
    top: 13,
    right: 20,
  },
  errorMessage: {
    position: "absolute",
    top: -15,
    color: "#ff8888",
    paddingHorizontal: 20,
  },
  centeredview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalview: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  calclose: {
    backgroundColor: "#51CFFF",
    height: 30,
    width: "30%",
    marginTop: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  closetxt: {
    color: lightColors.background,
    fontFamily: "Now-Bold",
  },
  button: {
    width: "100%",
    marginTop: windowHeight < 800 ? 80 : 100,
  },
});
