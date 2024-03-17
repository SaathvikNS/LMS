import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import lightColors from '../../../colors/colors'
import { Dimensions } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { MyContext } from '../../../../Global/context'
import Ionicons from "react-native-vector-icons/Ionicons"

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Pending = ({ route }) => {
  const { empempid } = useContext(MyContext);

  const [Pending, setPending] = useState([]);
  const [expandedContainerId, setExpandedContainerId] = useState(null);

  const navigation = useNavigation();

  const fetchPending = async () => {
    try {
      const { data } = await axios.post("http://192.168.50.79:8000/api/user/employeefetchleaves", { status: route.name, empid: empempid });
      setPending(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPending();
        return () => {};
    }, [])
  );

  const addApplicationPressed = () => {
    navigation.navigate("leaveapplication");
  };

  const handledeleteapplication = async (id) => {
    try {
      const {data} = await axios.post("http://192.168.50.79:8000/api/user/deleteapplication", {id})
      console.log(data);
      fetchPending();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const renderItem = ({ item }) => (
    <View>
        <TouchableOpacity
          key={item._id}
          style={styles.mappedcontainer}
          onPress={() => setExpandedContainerId(expandedContainerId === item._id ? null : item._id)}
        >
          <Text style={styles.mappedtext}>{item.leavetype}</Text>
        <TouchableOpacity style={{height: "100%", aspectRatio: 1, justifyContent: "center", alignItems: "center",}} onPress={()=>{handledeleteapplication(item._id)}}>
          <Ionicons name='trash' size={windowWidth < 400 ? 20 : 30} color={"#FF0000"}/>
        </TouchableOpacity>
        </TouchableOpacity>
      {expandedContainerId === item._id && (
        <View style={styles.dropdown}>
          <View style={{position: 'absolute', width:"100%", height: 50,backgroundColor: lightColors.fields, top: -30, zIndex:-5}}></View>
          <View style={{ height: 2, width: '95%', backgroundColor: lightColors.secondary }}></View>
          <View style={styles.datecontainer}>
            <Text style={styles.datetext}>{item.fromdate}</Text>
            <Text style={styles.datetext}> - </Text>
            <Text style={styles.datetext}>{item.todate}</Text>
          </View>
          <View style={styles.datecontainer}>
            <Text style={styles.noofdays}>Number of days: {item.noofdays}</Text>
          </View>
          <View style={styles.reason}>
            <Text style={{fontFamily: "Inder-Regular"}}>{item.reason}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const Separator = () => <View style={{ height: 10 }} />;

  return (
    <View style={styles.container}>
      {Pending.length != 0 ? (
        <FlatList
          data={Pending}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={Separator}
        />
      ) : (<Text style={styles.notext}>No Applications Found</Text>)}

      <View style={styles.addbuttonwrapper}>
        <TouchableOpacity style={styles.addbuttoncontainer} onPress={addApplicationPressed}>
          <Text style={styles.addbutton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Pending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    paddingTop: 15,
  },
  addbuttonwrapper: {
    position: 'absolute',
    height: windowHeight < 800 ? 45 : 50,
    alignItems: 'flex-end',
    right: 0,
    bottom: 90,
    paddingHorizontal: 10,
  },
  addbuttoncontainer: {
    backgroundColor: lightColors.fields,
    height: "100%",
    aspectRatio: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addbutton: {
    fontFamily: "LilitaOne-Regular",
    fontSize: 30,
    color: lightColors.secondary,
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
    height: 150,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    alignItems: 'center',
    zIndex: -5
  },
  datecontainer:{
    flexDirection: "row",
    width: "100%",
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
