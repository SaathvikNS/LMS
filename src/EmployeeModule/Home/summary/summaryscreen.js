import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import lightColors from '../../../colors/colors'
import { Dimensions } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { MyContext } from '../../../../Global/context'
import Ionicons from "react-native-vector-icons/Ionicons"
import Headers from '../../../components/headers'

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Summary = () => {
  const { empempid, empleaves, } = useContext(MyContext);

  const [summaryData, setSummaryData] = useState([]);
  const [expandedContainerId, setExpandedContainerId] = useState(null);
  const [expandedAppId, setExpandedAppId] = useState(null);
  const [height, setheight] = useState(0)
  
  const navigation = useNavigation();

  const fetchSummary = async () => {
    try {
      const { data } = await axios.post("http://192.168.50.79:8000/api/user/employeefetchleavesummary", { empid: empempid });
      setSummaryData(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const uniqueLeaveTypes = Array.from(new Set(summaryData.map(item => item.leavetype)));

  const renderItem = ({ item }) => {
    const applications = summaryData.filter(app => app.leavetype === item);
    const dropdownHeight = applications.length * (windowHeight < 800 ? 50 : 60) + (height);
    
    return (
      <View>
        <TouchableOpacity
          style={styles.mappedcontainer}
          onPress={() => setExpandedContainerId(expandedContainerId === item ? null : item)}
        >
          <Text style={styles.mappedtext}>{item}</Text>
          <View style={{height: "100%", aspectRatio: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.mappedtext}>{empleaves[item]}</Text>
          </View>
        </TouchableOpacity>
        {expandedContainerId === item && (
          <View style={[styles.dropdown, { height: dropdownHeight }]}>
            <View style={{position: 'absolute', width:"100%", height: 50,backgroundColor: lightColors.fields, top: -30, zIndex:-5}}></View>
            <View style={{ height: 2, width: '95%', backgroundColor: lightColors.secondary, marginBottom: 10}}></View>
            {applications.map(app => (
              <TouchableOpacity
                style={{width: "100%",marginVertical: windowHeight < 800 ? 5 : 10,}}
                key={app._id}
                onPress={() => {
                  setExpandedAppId(expandedAppId === app._id ? null : app._id)
                  setheight(expandedAppId === app._id ? 0 : 50)
                }}
              >
                <View style={styles.datecontainer}>
                  <Text style={styles.datetext}>{app.fromdate} - {app.todate}</Text>
                </View>
                { app.status == "pending" ? (<View style={{height: 10, width: 10, borderRadius: 100, backgroundColor: 'yellow', position: 'absolute', right: windowHeight < 800 ? 35 : 40, top: 10}}></View>)
                : app.status == "approved" ? (<View style={{height: 10, width: 10, borderRadius: 100, backgroundColor: 'green', position: 'absolute', right: windowHeight < 800 ? 35 : 40, top: 10}}></View>)
                : app.status == "rejected" ? (<View style={{height: 10, width: 10, borderRadius: 100, backgroundColor: 'red', position: 'absolute', right: windowHeight < 800 ? 35 : 40, top: 10}}></View>)
                : null}
                {expandedAppId === app._id && (
                  <View>
                    <View style={styles.datecontainer}>
                      <Text style={styles.noofdays}>Number of days: {app.noofdays}</Text>
                    </View>
                    <View style={styles.reason}>
                      <Text>{app.reason}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const Separator = () => <View style={{ height: 10 }} />;

  const backpressed = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Headers value={"Summary"} onPress={backpressed} />
      <View style={styles.heading}>
        <Text style={styles.headingtext}>Leave Type</Text>
        <Text style={styles.headingtext}>Remaining</Text>
      </View>
      {uniqueLeaveTypes.length !== 0 ? (
        <FlatList
          data={uniqueLeaveTypes}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={Separator}
        />
      ) : (<Text style={styles.notext}>No Applications Found</Text>)}
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  heading:{
    height: 20,
    marginTop: 20,
    marginBottom: windowHeight < 800 ? 2 : 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingtext:{
    fontFamily: "Montserrat-Bold",
    fontSize: windowHeight < 800 ? 11 : 13,
    color: lightColors.sideText,
  },
  mappedcontainer: {
    marginVertical: 5,
    borderRadius: 100,
    height: windowHeight < 800 ? 40 : 50,
    backgroundColor: lightColors.fields,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mappedtext: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 14 : 16,
    color: lightColors.secondary,
  },
  datetext: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 14 : 16,
    color: lightColors.secondary,
  },
  noofdays: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 12 : 14,
    color: lightColors.secondary,
  },
  dropdown: {
    backgroundColor: lightColors.fields,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    alignItems: 'center',
    zIndex: -5
  },
  datecontainer:{
    flexDirection: "row",
    width: windowWidth < 400 ? "85%" : "90%",
    paddingHorizontal: 15,
    marginTop: 5,
  },
  reason:{
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  notext:{
    fontFamily: 'Montserrat-Bold',
    color: lightColors.secondary,
    alignSelf: 'center',
    marginTop: 20,
  },
});
