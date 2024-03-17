import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppNavigator from './src/AppNavigator';

export default function App() {
  let[fontsLoaded] = useFonts({
      "Montserrat-Bold": require("./assets/Fonts/Montserrat-Bold.ttf"),
      'LilitaOne-Regular': require("./assets/Fonts/LilitaOne-Regular.ttf"),
      'Fredoka-Bold': require("./assets/Fonts/Fredoka-Bold.ttf"),
      'Inder-Regular': require("./assets/Fonts/Inder-Regular.ttf"),
      'Now-Bold': require("./assets/Fonts/Now-Bold.otf"),
  })

  if(!fontsLoaded){
      return null;
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
