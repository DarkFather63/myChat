import React from "react";
import { StyleSheet, View, Text } from 'react-native';

//this is the chat screen, where chat can take place in UI
export default class Chat extends React.Component {

  componentDidMount() {
    //this 'routes' the props to this component, a bit like an import but still different!
    let name = this.props.route.params.name;
    // this will set the title of the screen to the state of the props (in this case, 'name')
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    let { color } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <Text>Hello Chat!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})