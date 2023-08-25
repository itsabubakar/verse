import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './components/Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ReadMore from './Screens/ReadMore';
import Author from './Screens/Author';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "eczarRegular": require("./assets/fonts/Eczar-Regular.ttf"),
    "ecsarMedium": require("./assets/fonts/Eczar-Medium.ttf"),
    "eczarSemiBold": require("./assets/fonts/Eczar-SemiBold.ttf"),
    "cormorantRegular": require("./assets/fonts/Cormorant-Regular.ttf"),
    "cormorantMedium": require("./assets/fonts/Cormorant-Medium.ttf"),
    "cormorantSemiBold": require("./assets/fonts/Cormorant-SemiBold.ttf"),
    "cormorantBold": require("./assets/fonts/Cormorant-Bold.ttf"),
  })

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])


  if (!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync();
  }


  return (
    <NavigationContainer>
      <SafeAreaView className='flex-1 bg-black'>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="HomeScreen" component={MyTabs} />
          <Stack.Screen name="readmore" component={ReadMore} />
          <Stack.Screen name="author" component={Author} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}