import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Svg, { Ellipse, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import lightColors from '../../colors/colors';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const WelcomeScreenBackground = () => {
    return (
        <View style={styles.container}>
            <Svg>
                <Defs>
                    <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0%" stopColor={lightColors.primary} />
                        <Stop offset="100%" stopColor={lightColors.secondary} />
                    </LinearGradient>
                    <LinearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#3FFFF7" />
                        <Stop offset="100%" stopColor="#4D908D" />
                    </LinearGradient>
                    <LinearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#447BF8" />
                        <Stop offset="100%" stopColor="#4F6493" />
                    </LinearGradient>
                </Defs>
                {/* top two circles */}
                <Circle
                    cx={windowHeight < 800 ? 60 : 100}
                    cy={windowHeight < 800 ? 85 : 90}
                    r={windowHeight < 800 ? 10 : 15}
                    fill="url(#gradient2)"
                />
                <Circle
                    cx={windowHeight < 800 ? 40 : 70}
                    cy={windowHeight < 800 ? 105 : 130}
                    r={windowHeight < 800 ? 5 : 10}
                    fill="url(#gradient3)"
                />
                {/* bottom two circles */}
                <Circle
                    cx={windowHeight < 800 ? 320 : 520}
                    cy={windowHeight < 800 ? 200 : 250}
                    r={windowHeight < 800 ? 10 : 15}
                    fill="url(#gradient2)"
                />
                <Circle
                    cx={windowHeight < 800 ? 340 : 550}
                    cy={windowHeight < 800 ? 180 : 210}
                    r={windowHeight < 800 ? 5 : 10}
                    fill="url(#gradient3)"
                />
                {/* background */}
                <Ellipse
                    cx={windowWidth/2}
                    cy={windowHeight < 800 ? windowHeight - (windowHeight/5) : windowHeight - (windowHeight/6)}
                    rx={windowHeight < 800 ? 800 : 1200}
                    ry={windowHeight < 800 ? 400 : 600}
                    fill="url(#gradient1)"
                />
            </Svg>
            <View style={styles.logocontainer}>
                <Image source={require("../../../assets/LoadingScreen/LMSTrans.png")} style={styles.logo} resizeMode='contain' />
            </View>
        </View>
    );
  };

  const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        width: "100%",
        alignItems: 'center',
        backgroundColor: lightColors.background,
        zIndex: -100,
    },
    logocontainer:{
        width: "100%",
        height: "100%",
        alignItems: 'center',
        position: 'absolute',
    },
    logo:{
        bottom: windowHeight < 800 ? windowHeight/3 : windowHeight/10,
        width: "80%",
        opacity: .3,
    },
  })
  
  export default WelcomeScreenBackground;