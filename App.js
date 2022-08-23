import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';


//this variable uses a built in function (for react native) to create a navigator/routing system
const Stack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Screen1'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//not necessarily needed in this file, but for reference this is a way to style components. Just pass them in as props.
const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins',
  },
});
