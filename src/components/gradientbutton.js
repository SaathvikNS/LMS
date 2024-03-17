import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import lightColors from '../colors/colors';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get("window").height;

const GradientButton = ({ value, onPress = null }) => {
  return (
    <View style={{alignItems: 'center', width: "100%",}}>
        <TouchableOpacity onPress={onPress} style={{width: "80%",}} activeOpacity={.6}>
            <View style={styles.butwrapper}>
                <LinearGradient
                colors={[ lightColors.primary, lightColors.secondary]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradientBackground}
                >
                    <Text style={styles.buttonText}>{value}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  butwrapper: {
    width: "100%",
    height: windowHeight < 800 ? 40 : 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  gradientBackground: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: "Fredoka-Bold",
    fontSize: windowHeight < 800 ? 20 : 25,
},
});

export default GradientButton;
