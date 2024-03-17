import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import lightColors from '../colors/colors';
import { TextInput } from 'react-native';

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const EditProfileInfoBlocks = ({source, placeholder, keyplace, valueplace, onChangeText, editable,}) => {
  return (
    <View style={styles.container}>
      <Image source={source} resizeMode='contain' style={styles.icon} />
      <View style={styles.textcontainer}>
        <Text style={styles.key}>{keyplace}</Text>
        <TextInput
          style={styles.value}
          value={valueplace}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={lightColors.placeholders}
        />
      </View>
    </View>
  )
}

export default EditProfileInfoBlocks

const styles = StyleSheet.create({
  container:{
    height: 40,
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: windowHeight < 800 ? 10 : 25,
  },
  icon:{
    width: windowWidth < 400 ? 40 : 55,
  },
  textcontainer:{
    flexDirection: 'row',
    width: "80%",
    height: "100%",
    alignItems: 'center',
  },
  key:{
    color: lightColors.sideText,
    fontFamily: "Now-Bold",
    fontSize: windowHeight < 800 ? 15 : 20,
    marginRight: windowHeight < 800 ? 5 : 10,
  },
  value:{
    color: lightColors.mainText,
    fontFamily: "Now-Bold",
    fontSize: windowHeight < 800 ? 15 : 20,
    width: "100%",
  },
})