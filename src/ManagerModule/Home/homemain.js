import React, { useContext } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import lightColors from '../../colors/colors';
import { Dimensions } from 'react-native';
import HomeScreenBackground from './homescreenbackground';
import { Image } from 'react-native';
import HomeScreenBlocks from '../../components/homescreenblocks';
import { MyContext } from '../../../Global/context';
import axios from 'axios';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const HomeMain = ({navigation}) => {
    const {username, empid, instname, setdepartment, setmydata} = useContext(MyContext)
    const {setarea, setcity, setstate, setcountry, setpincode, setyoe, setcompanymail, setcompanycontact, setempcount, setleaves, } = useContext(MyContext);
    
    const companysettingspressed = async () => {
        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/fetchcompanydetails", {instname})
            console.log(data)
            setarea(data.institution.area)
            setcity(data.institution.city)
            setstate(data.institution.state)
            setcountry(data.institution.country)
            setpincode(data.institution.pincode)
            setyoe(data.institution.yoe)
            setcompanymail(data.institution.companymail)
            setcompanycontact(data.institution.companycontact)
            setempcount(data.institution.empcount)
            setleaves(data.institution.leaves)
            navigation.navigate("companymanagementnavigator")
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const departmentmanagementpressed = async () => {
        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/fetchdepartment", {instname})
            console.log(data)
            setdepartment(data.departments)
            navigation.navigate("departmentmanagement")
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const profilepressed = () => {
        navigation.navigate("profilescreen")
    }

    const calendarviewpressed = () => {
        navigation.navigate("calendarview")
    }
    const employeemanagementpressed = () => {
        navigation.navigate("employeemanagementnavigator")
    }
    const leaverequestspressed = () => {
        navigation.navigate("leaverequestsscreen")
    }
    const leavestatisticspressed = async () => {
        try {
            const { data } = await axios.post("http://192.168.50.79:8000/api/user/statistics", { status: "approved", instname });
            setmydata(data)
            navigation.navigate("leavestatistics")
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={{alignItems: 'center', width: "100%", backgroundColor: lightColors.background}}>
            <View style={styles.backgroundcontainer}>
                <HomeScreenBackground />
            </View>
            {/* menu */}
            <TouchableOpacity onPress={()=>{navigation.openDrawer()}} style={styles.menucontainer}>
                <Image source={require("../../../assets/customIcons/menuinactive.png")} style={styles.menuicon} resizeMode="contain" />
            </TouchableOpacity>
            {/* profilepic */}
            <TouchableOpacity style={styles.profilecontainer} activeOpacity={1} onPress={profilepressed}>
                <View style={styles.profileinfo}>
                    <Text style={styles.name}>{username}</Text>
                    <Text style={styles.empid}>{empid}</Text>
                </View>
                <View style={styles.piccontainer}>
                    <Image source={require("../../../assets/customIcons/dp.png")} style={styles.dp} resizeMode="contain" />
                </View>
            </TouchableOpacity>
            {/* contents */}
            <View style={styles.contentcontainer}>
                <View style={styles.placeholders}>
                    <View style={styles.rows}>
                        <HomeScreenBlocks text={"Dept. Management"} source={require("../../../assets/managerhomicons/departmentmanagement.png")} onPress={departmentmanagementpressed} />
                        <HomeScreenBlocks text={"Emp. Management"} source={require("../../../assets/managerhomicons/employeemanagement.png")} onPress={employeemanagementpressed}/>
                    </View>
                    <View style={styles.rows}>
                        <HomeScreenBlocks text={"Leave Requests"} source={require("../../../assets/managerhomicons/leaverequests.png")} onPress={leaverequestspressed}/>
                        <HomeScreenBlocks text={"Calendar View"} source={require("../../../assets/managerhomicons/calendarview.png")} onPress={calendarviewpressed}/>
                    </View> 
                    <View style={styles.rows}>
                        <HomeScreenBlocks text={"Company Settings"} source={require("../../../assets/managerhomicons/companysettings.png")} onPress={companysettingspressed}/>
                        <HomeScreenBlocks text={"My Profile"} source={require("../../../assets/managerhomicons/myprofile.png")} onPress={profilepressed}/>
                    </View>
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
        top: windowWidth < 400 ? 25 : 30,
        left: windowWidth < 400 ? 20 : 25,
        zIndex: 100,
    },
    menuicon:{
        height: windowWidth < 400 ? 35 : 40,
        width: windowWidth < 400 ? 35 : 40,
    },
    profilecontainer:{
        height: windowHeight < 800 ? 230 : 310,
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
        height: windowHeight < 800 ? 100 : 125,
        width: windowHeight < 800 ? 100 : 125,
        alignItems: "center",
        justifyContent: "center",
    },
    dp:{
        height: windowHeight < 800 ? 160 : 200,
        width: windowHeight < 800 ? 160 : 200,
    },
    profileinfo:{
        marginHorizontal: windowWidth < 400 ? 10 : 20,
        alignItems: "flex-end",
    },
    name:{
        fontFamily: "Now-Bold",
        color: lightColors.fields,
        fontSize: windowWidth < 400 ? 15 : 20,
        marginBottom: windowWidth < 400 ? 2 : 5,
    },
    empid:{
        marginTop: 5,
        fontFamily: "Now-Bold",
        color: lightColors.fields,
        fontSize: windowWidth < 400 ? 11 : 15,
    },
    contentcontainer:{
        // backgroundColor: 'red',
        height: windowHeight < 800 ? 520 : 700,
        width: "100%",
        paddingHorizontal: windowWidth < 400 ? 20 : 30,
        paddingVertical: windowWidth < 400 ? 20 : 30,
    },
    placeholders:{
        // backgroundColor: 'blue',
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