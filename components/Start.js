import React from "react";
import * as Font from 'expo-font';
import { StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

//Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE

// this will be our home screen 
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: this.colors.default,
      fontsLoaded: false
    };
  }

  changeColor = (newColor) => {
    this.setState({ color: newColor });
  };


  //background colors to pass to changeColor function
  colors = {
    black: '#090C08',
    darkPurple: '#474056',
    gray: '#8A95A5',
    green: '#B9C6AE',
    default: '#ffffff'
  }

  async loadFonts() {
    await Font.loadAsync({
      'Poppins': require('../assets/fonts/Poppins-Light.ttf'),
    });
    this.setState({ fontsLoaded: true })
  }

  componentDidMount() {
    this.loadFonts();
  }



  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/background-image.png')} style={styles.backgroundImage}>
            <Text style={styles.titleText}>myChat</Text>

            <View style={styles.signInContainer}>

              <TextInput placeholder="Your Name" style={styles.textInput}
                //onChangeText is a built in function that takes a prop and can manipulate its state for text elements
                onChangeText={(name) => this.setState({ name })} />

              <Text style={styles.colorText}>Choose background color:</Text>
              <View style={styles.colorSelect}>
                <TouchableOpacity style={styles.color1} onPress={() => this.changeColor(this.colors.black)}></TouchableOpacity>
                <TouchableOpacity style={styles.color2} onPress={() => this.changeColor(this.colors.darkPurple)}></TouchableOpacity>
                <TouchableOpacity style={styles.color3} onPress={() => this.changeColor(this.colors.gray)}></TouchableOpacity>
                <TouchableOpacity style={styles.color4} onPress={() => this.changeColor(this.colors.green)}></TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  title="Go to Chat"
                  //this is where react-natives navigate functions come in handy again - allows navigation between screens/views
                  onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })} />
              </View>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return null;
    }
  }
}

//continue styling - refer to brief
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'Poppins',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover'
  },
  titleText: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    margin: 'auto',
    padding: '30%',
    flexWrap: 'nowrap'
  },
  signInContainer: {
    backgroundColor: '#fff',
    margin: '6%',
    justifyContent: 'space-evenly',
  },
  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    justifyContent: 'flex-start',
    margin: 20
  },
  colorSelect: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  color1: {
    backgroundColor: '#090C08',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    margin: 15
  },
  color2: {
    backgroundColor: '#474056',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    margin: 15
  },
  color3: {
    backgroundColor: '#8A95A5',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    margin: 15
  },
  color4: {
    backgroundColor: '#B9C6AE',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    margin: 15
  },
  textInput: {
    fontFamily: 'Poppins',
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    margin: '10%',
    padding: 10
  },
  buttonContainer: {
    width: '95%',
    margin: '2.5%',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    color: '#757083',
  },
})