import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import lightColors from '../../colors/colors';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import HomeScreenBlocks from '../../components/homescreenblocks';
import { MyContext } from '../../../Global/context';
import { object } from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';
import { ScrollView } from 'react-native';
import EmployeeLeaveTypeBlock from '../../components/employeeleavetypeblock';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const HomeMain = ({navigation}) => {
    const {empempid, empname, setempleaves, instleaves, empleaves} = useContext(MyContext)

    const fetchleaves = async () => {
        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/fetchleaves", {empid: empempid})
            setempleaves(data.leaves)
        } catch (error) {
            console.log(error.response.log);
        }
    }

    useFocusEffect(
        React.useCallback(()=>{
            fetchleaves()
            return ()=>{};
        }, [])
    )

    // date fetch
    const days = new Array("Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat")
    const months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

    const d = new Date();
    const day = d.getDay();
    const date = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    
    // total leaves calculation
    const empleavevalues = Object.values(empleaves)
    var totalempleaves = 0
    empleavevalues.forEach((value) => {totalempleaves += value})
    
    const instleavevalues = Object.values(instleaves)
    var totalinstleaves = 0
    instleavevalues.forEach((value) => {totalinstleaves += value})
    
    const percentage = ((totalinstleaves - totalempleaves)/totalinstleaves)*100
    
    // buttonpress handlers

    const profilepressed = () => {
        navigation.navigate("profilescreen")
    }

    const leaverequestspressed = () => {
        navigation.navigate("leaverequests")
    }

    const calendarviewpressed = () => {
        navigation.navigate("calendarview")
    }

    const handlesummarypress = () => {
        navigation.navigate("summary")
    }

    
    return (
        <View style={{alignItems: 'center', width: "100%", backgroundColor: lightColors.background}}>
            {/* menu */}
            <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={styles.menucontainer}>
                <Image source={require("../../../assets/customIcons/menuactive.png")} style={styles.menuicon} resizeMode="contain" />
            </TouchableOpacity>
            {/* profile */}
            <View style={styles.profilecontainer}>
                <TouchableOpacity style={styles.piccontainer} activeOpacity={1} onPress={profilepressed}>
                    <Image source={require("../../../assets/customIcons/dp.png")} style={styles.dp} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            {/* greet */}
            <View style={styles.greetContainer}>
                <Text style={styles.date}>{days[day]}, {date} {months[month]} {year}</Text>
                <View>
                    <Text style={styles.greet}>Hello! 👋</Text>
                    <Text style={styles.name}>{empname}</Text>
                </View>
            </View>
            {/* totalleavesleft */}
            <LinearGradient colors={[lightColors.secondary, lightColors.primary]} start={[0,1]} end={[1,-1]} style={styles.leavesleftgradient} >
                <View style={styles.progress}>
                    <CircularProgress
                        radius={windowHeight < 800 ? 50 : 70}
                        value={percentage}
                        progressValueColor={lightColors.background}
                        progressValueFontSize={windowHeight < 800 ? 25 : 30}
                        valueSuffix='%'
                        activeStrokeColor={lightColors.background}
                        activeStrokeWidth={8}
                        inActiveStrokeWidth={6}
                        duration={2000}
                    />
                </View>
                <View style={styles.divider}></View>
                <View style={styles.valuecontainer}>
                    <View style={styles.leavetextrow}><Text style={styles.leavetextkey}>Leaves Taken</Text><Text style={styles.leavetextvalue}>{totalinstleaves-totalempleaves}</Text></View>
                    <View style={styles.leavetextrow}><Text style={styles.leavetextkey}>Leaves Available</Text><Text style={styles.leavetextvalue}>{totalempleaves}</Text></View>
                    <View style={styles.leavetextrow}><Text style={styles.leavetextkey}>Total Leaves</Text><Text style={styles.leavetextvalue}>{totalinstleaves}</Text></View>
                </View>
            </LinearGradient>
            <View style={{width: "90%", flexDirection: 'row',justifyContent: 'space-between', marginTop:20}}>
                <Text style={styles.summary}>Summary</Text>
                <TouchableOpacity style={styles.addremovebut} onPress={handlesummarypress}>
                    <Text style={styles.addremovetext}>Details</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollwrapper}>
                <ScrollView horizontal style={styles.scroller} showsHorizontalScrollIndicator={false}>
                    {Object.keys(empleaves).map((leavetype) => (
                        <EmployeeLeaveTypeBlock 
                            key={leavetype}
                            leavetype={leavetype}
                        />
                    ))}
                </ScrollView>
            </View>
            {/* contents */}
            <View style={styles.contentcontainer}>
                <View style={styles.rows}>
                    <HomeScreenBlocks text={"Leave Application"} source={require("../../../assets/managerhomicons/companysettings.png")} onPress={leaverequestspressed}/>
                    <HomeScreenBlocks text={"Calendar View"} source={require("../../../assets/managerhomicons/calendarview.png")} onPress={calendarviewpressed}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundcontainer:{
        position: 'absolute',
        height: "100%",
        width: "100%",
        zIndex: -100,
    },
    menucontainer:{
        height: 50,
        width: 50,
        position:'absolute',
        top: windowWidth < 400 ? 35 : 30,
        left: windowWidth < 400 ? 20 : 25,
        zIndex: 100,
    },
    menuicon:{
        height: windowWidth < 400 ? 35 : 40,
        width: windowWidth < 400 ? 35 : 40,
    },
    profilecontainer:{
        height: windowHeight < 800 ? 90 : 100,
        flexDirection: 'row',
        width: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center',
        top: 10,
        paddingHorizontal: windowWidth < 400 ? 20 : 40,
    },
    piccontainer:{
        borderRadius: 100,
        backgroundColor: lightColors.fields,
        height: windowHeight < 800 ? 45 : 60,
        width: windowHeight < 800 ? 45 : 60,
        alignItems: "center",
        justifyContent: "center",
    },
    dp:{
        height: windowHeight < 800 ? 65 : 95,
        width: windowHeight < 800 ? 65 : 95,
    },
    profileinfo:{
        marginHorizontal: windowWidth < 400 ? 10 : 20,
        alignItems: "flex-end",
    },
    greetContainer:{
        width: windowHeight < 800 ? "85%" : "90%",
        height: windowHeight < 800 ? 100 : 120,
        justifyContent: 'space-around',
    },
    date:{
        fontFamily: "Now-Bold",
        fontSize: windowHeight < 800 ? 13 : 15,
        color: lightColors.sideText
    },
    greet:{
        fontFamily: "Now-Bold",
        fontSize: windowHeight < 800 ? 20 : 24,
        color: lightColors.secondary,
    },
    name:{
        fontFamily: "Now-Bold",
        fontSize: windowHeight < 800 ? 20 : 24,
        color: lightColors.secondary,
    },
    leavesleftgradient:{
        width: windowHeight < 800 ? "85%" : "85%",
        height: windowHeight < 800 ? 140 : 180,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: windowHeight < 800 ? 10 : 40
    },
    progress:{
        height: "100%",
        width: windowHeight < 800 ? 130 : 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    valuecontainer:{
        height: "80%",
        width: windowHeight < 800 ? 160 : 250,
        justifyContent: 'space-evenly',
        paddingHorizontal: windowHeight < 800 ? 15 : 20,
    },
    divider:{
        height: "100%",
        width: 2,
        backgroundColor: lightColors.background,
    },
    leavetextkey:{
        fontFamily: "Montserrat-Bold",
        fontSize: windowHeight < 800 ? 12 : 18,
        color: lightColors.background,
    },
    leavetextvalue:{
        fontFamily: "Montserrat-Bold",
        fontSize: windowHeight < 800 ? 12 : 18,
        color: lightColors.background,
    },
    leavetextrow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summary:{
        fontFamily: 'Now-Bold',
        fontSize: windowHeight < 800 ? 15 : 20,
        color: lightColors.secondary,
    },
    addremovebut: {
      height: 25,
      width: windowWidth < 400 ? 80 : 100,
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
    scrollwrapper:{
        height: windowHeight < 800 ? 130 : 150,
        width: "100%",
        marginTop: 20,
    },
    scroller:{
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    contentcontainer:{
        height: windowHeight < 800 ? 520 : 700,
        width: "100%",
        paddingHorizontal: windowWidth < 400 ? 20 : 30,
        paddingVertical: windowWidth < 400 ? 20 : 30,
    },
    placeholders:{
        height: "100%",
        width: "100%",
        justifyContent: "space-around",
    },
    rows:{
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default HomeMain;