import React from "react";
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

//this is the chat screen, where chat can take place in UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount() {
    //this 'routes' the props to this component, a bit like an import but still different!
    let name = this.props.route.params.name;

    this.setState({
      //this is mostly for development as the first message is hardcoded - will eventually replace with a state update
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          //this is a system message, which means it displays above the chat initiation (in this case letting us know we joined the chat)
          system: true,
        },
      ],
    })

    // this will set the title of the screen to the state of the props (in this case, 'name')
    this.props.navigation.setOptions({ title: name });
  }

  // allows customization of text bubbles - later will allow users to customize
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#9fede0',
          },
          right: {
            backgroundColor: '#c4afe0',
          }
        }}
      />);

  }

  // this is also a Gifted Chat function - allows state preserving of messages and appends new messages
  onSend(messages = []) {
    // 'previousState' is used to check message state as well
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    let { color } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, styles.container]}>

        {/* renders the message interface using the Gifted Chat library - chat bubbles rendered using built-in renderbubble function. 
        Also implements onSend function*/}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* KeyboardAvoidingView overrides android issue where the keyboard hides the text input - using ternary 
        conditional for React's sake. iOS doesn't have this issue so this override will be ignored if present */}
        {Platform.OS === 'android'
          ? <KeyboardAvoidingView behavior="height" />
          : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})