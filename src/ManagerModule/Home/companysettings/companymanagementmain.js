import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ProfileInfoBlocks from '../../../components/profileinfoblocks'
import GradientButton from '../../../components/gradientbutton'
import { MyContext } from '../../../../Global/context'
import { Dimensions } from 'react-native'
import lightColors from '../../../colors/colors'
import Headers from '../../../components/headers'
import { ScrollView } from 'react-native'

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const CompanyManagementMain = ({navigation}) => {
  const {instname, area, city, state, country, pincode, yoe, companymail, companycontact, empcount, leaves, } = useContext(MyContext);

  const leavelist = Object.entries(leaves).map(([key], index) => (
    <View key={index} style={styles.mappedcontainer}>
      <Text style={styles.mappedtext}>• {key}</Text>
    </View>
  ));

  const backpressed = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Headers value={"Company Management"} onPress={backpressed}/>
      <View style={styles.profilecontainer}>
          <View style={styles.piccontainer}>
              <Image source={require("../../../../assets/customIcons/dp.png")} style={styles.dp} resizeMode="contain" />
          </View>
          <View style={styles.profileinfo}>
              <Text style={styles.name}>{instname}</Text>
          </View>
      </View>
      <View style={styles.divider}></View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentwrapper}>
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/address.png")} keyplace={"Area"} valueplace={area || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/blank.png")} keyplace={"City"} valueplace={city || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/blank.png")} keyplace={"State"} valueplace={state || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/blank.png")} keyplace={"Country"} valueplace={country || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/blank.png")} keyplace={"Pincode"} valueplace={pincode || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/doj.png")} keyplace={"Established Year"} valueplace={yoe || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/email.png")} keyplace={"E-mail"} valueplace={companymail || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/contact.png")} keyplace={"Contact"} valueplace={companycontact || "----"} />
            <ProfileInfoBlocks source={require("../../../../assets/profileicons/employeecount.png")} keyplace={"Employee Count"} valueplace={empcount} />
        </View>
        <View style={styles.leaveswrapper}>
          <View style={styles.heading}>
            <Text style={styles.leaveheading}>Types of Leaves Available</Text>
          </View>
          <View style={styles.leavelist}>
            {leavelist}
          </View>
        </View>
        <View style={styles.buttonwrapper}>
            <GradientButton value={"Edit Profile"} onPress={()=>{navigation.navigate("editcompanymanagement")}}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default CompanyManagementMain

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: windowWidth < 400 ? 20 : 25 ,
    flex:1,
    backgroundColor: lightColors.background,
    paddingBottom: 60,
  },
  profilecontainer:{
    height: windowHeight < 800 ? 200 : 270,
    width: "100%",
    alignItems: "center",
    marginTop: windowHeight < 800 ? 10 : 20,
  },
  piccontainer:{
    borderRadius: 100,
    backgroundColor: lightColors.fields,
    height: windowHeight < 800 ? 150 : 200,
    width: windowHeight < 800 ? 150 : 200,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  dp:{
    height: windowHeight < 800 ? 220 : 300,
    width: windowHeight < 800 ? 220 : 300,
  },
  profileinfo:{
    marginTop: 10,
    alignItems: "center",
  },
  name:{
    fontFamily: "Now-Bold",
    color: lightColors.secondary,
    fontSize: windowWidth < 400 ? 20 : 25,
    textAlign: 'center',
    top: -5,
  },
  divider:{
    alignSelf: 'center',
    width: "100%",
    height: 2,
    backgroundColor: lightColors.secondary,
    marginVertical: windowHeight < 800 ? 10 : 10,
    opacity: .7,
  },
  contentwrapper:{
    width: "100%",
    marginTop: windowHeight < 800 ? 10 : 20,
    alignSelf: 'center',
  },
  buttonwrapper:{
    width: "100%",
    marginTop: windowHeight < 800 ? 30 : 50,
    marginBottom: 20,
  },
  leaveswrapper:{
    marginTop: 10,
  },
  heading:{
    width: "100%",
  },
  leaveheading:{
    fontFamily: "Now-Bold",
    fontSize: windowWidth < 400 ? 16 : 20,
    color: lightColors.secondary,
  },
  leavelist:{
    marginTop: windowHeight < 800 ? 10 : 20,
  },
  mappedtext:{
    fontFamily: "Now-Bold",
    color: lightColors.mainText,
    fontSize: windowWidth < 400 ? 13 : 18,
  },
})