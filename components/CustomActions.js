import React from "react";
import { StyleSheet, View, Button } from 'react-native';


export default class CustomActions extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Button />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})