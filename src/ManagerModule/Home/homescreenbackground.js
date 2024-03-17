import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Svg, { Ellipse, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import lightColors from '../../colors/colors';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const HomeScreenBackground = () => {
    return (
        <View style={styles.container}>
            <Svg>
                <Defs>
                    <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={lightColors.primary} />
                        <Stop offset="100%" stopColor={lightColors.secondary} />
                    </LinearGradient>
                </Defs>
                <Ellipse
                    cx={windowWidth < 400 ? 260 : 450}
                    cy={windowHeight < 800 ? 70 : 60}
                    rx={windowHeight < 800 ? 320 : 500}
                    ry={windowHeight < 800 ? 160 : 250}
                    fill="url(#gradient1)"
                />
            </Svg>
            <View style={styles.logocontainer}>
                <Image source={require("../../../assets/LoadingScreen/LMSTrans.png")} style={styles.logo} resizeMode="contain" />
            </View>
        </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: "100%",
        alignItems: 'center',
        backgroundColor: lightColors.background,
    },
    logocontainer:{
        height: "100%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
    },
    logo:{
        bottom: windowHeight < 800 ? windowHeight/1.85 : windowHeight/3.2,
        left: windowHeight < 800 ? -13 : -20,
        width: "80%",
        opacity: .1
    },
  })
  
  export default HomeScreenBackground;