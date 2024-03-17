import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import lightColors from "../colors/colors";
import { LinearGradient } from "expo-linear-gradient";
import HomeNavigator from "./Home/Homenavigation";
import LeaveRequests from "./LeaveRequests/LeaveRequestsNavigation";
import ProfileNavigator from "./Profile/ProfileNavigator";

const BottomNavigator = ({ route }) => {
  const { screen } = route.params;
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(screen);

  const handleTabPress = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const renderTabIcon = (tabIndex, activeIcon, inactiveIcon, text) => (
    <TouchableOpacity
      onPress={() => handleTabPress(tabIndex)}
      activeOpacity={0.6}
      key={tabIndex}
    >
      {selectedTab === tabIndex ? (
        <View style={styles.activeIcon}>
          <LinearGradient
            colors={[lightColors.primary, lightColors.secondary]}
            start={[1, 0]}
            end={[0, 0]}
            style={styles.gradientBackground}
          >
            <Image source={activeIcon} style={styles.activeIconImage} resizeMode="contain" />
            <Text style={styles.buttonText}>{text}</Text>
          </LinearGradient>
        </View>
      ) : (
        <View style={styles.inactiveIcon}>
          <Image source={inactiveIcon} style={styles.inactiveIconImage} resizeMode="contain" />
        </View>
      )}
    </TouchableOpacity>
  );

  const childScreens = React.Children.map(route.children, (child, index) => {
    return React.cloneElement(child, { navigation });
  });

  return (
    <View style={{ flex: 1 }}>
        { selectedTab == 0 ? ( <HomeNavigator /> )
        : selectedTab == 1 ? ( <LeaveRequests /> )
        : ( <ProfileNavigator />)}
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {renderTabIcon(0, require("../../assets/customIcons/homeactive.png"), require("../../assets/customIcons/home.png"), "Home")}
          {renderTabIcon(1, require("../../assets/customIcons/searchactive.png"), require("../../assets/customIcons/search.png"), "Leaves")}
          {renderTabIcon(2, require("../../assets/customIcons/profileactive.png"), require("../../assets/customIcons/profile.png"), "Profile")}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    bottom: 0,
    position: "absolute",
    backgroundColor: lightColors.fields,
    alignItems: "center",
    overflow: "hidden",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  activeIcon: {
    height: "100%",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveIcon: {
    height: "100%",
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  gradientBackground: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 100,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  buttonText: {
    fontFamily: "Now-Bold",
    color: lightColors.fields,
  },
  activeIconImage: {
    width: 25,
  },
  inactiveIconImage: {
    width: 25,
  },
});

export default BottomNavigator;
