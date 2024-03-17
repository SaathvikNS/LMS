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

const Approved = ({ route }) => {
  const { instname } = useContext(MyContext);

  const [Approved, setApproved] = useState([]);
  const [expandedContainerId, setExpandedContainerId] = useState(null);

  const fetchApproved = async () => {
    try {
      const { data } = await axios.post("http://192.168.50.79:8000/api/user/managerfetchleaves", { status: route.name, instname });
      setApproved(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchApproved();
        return () => {};
    }, [])
  );

  const renderItem = ({ item }) => (
    <View>
        <TouchableOpacity
          key={item._id}
          style={styles.mappedcontainer}
          onPress={() => setExpandedContainerId(expandedContainerId === item._id ? null : item._id)}
        >
          <Text style={styles.mappedtext}>{item.name}</Text>
        </TouchableOpacity>
      {expandedContainerId === item._id && (
        <View style={styles.dropdown}>
          <View style={{position: 'absolute', width:"100%", height: 50,backgroundColor: lightColors.fields, top: -30, zIndex:-5}}></View>
          <View style={{ height: 2, width: '95%', backgroundColor: lightColors.secondary }}></View>
          <View style={styles.depcontainer}>
            <Text style={styles.deptext}>{item.department}</Text>
          </View>
          <View style={styles.datecontainer}>
            <Text style={styles.datetext}>{item.fromdate}</Text>
            <Text style={styles.datetext}> - </Text>
            <Text style={styles.datetext}>{item.todate}</Text>
          </View>
          <View style={styles.depcontainer}>
            <Text style={styles.noofdays}>Leave Type: {item.leavetype}</Text>
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
      {Approved.length != 0 ? (
        <FlatList
          data={Approved}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
        />
      ) : (<Text style={styles.notext}>No Applications Found</Text>)}
    </View>
  );
};

export default Approved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    paddingTop: 15,
    paddingBottom: 70,
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
  deptext: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 14 : 16,
    color: lightColors.secondary,
  },
  datetext: {
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 12 : 14,
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
  depcontainer:{
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 5,
  },
  datecontainer:{
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 20,
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
