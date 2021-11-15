import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Home from './screens/Home/Home';
import Header from './components/Header/Header';
import Login from './screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <>
      {/* <ImageBackground
          style={{width: '100%', height: '100%'}}
          source={require('./assets/images/vien.png')}>
          <Header />
          <Home /> 
          <Login />
        </ImageBackground>  */}
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={require('./assets/images/vien.png')}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    // flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 50,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
