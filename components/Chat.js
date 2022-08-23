import React from "react";
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { initializeApp } from "firebase";
import * as firebase from 'firebase';

require('firebase/firestore');

//this is the chat screen, where chat can take place in UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: '',

    }

    const firebaseConfig = {
      apiKey: "AIzaSyCTBr-AfH0ltRBdxqM8aptOuCipg7kevmM",
      authDomain: "mychat-d84dd.firebaseapp.com",
      projectId: "mychat-d84dd",
      storageBucket: "mychat-d84dd.appspot.com",
      messagingSenderId: "284520885498",
      appId: "1:284520885498:web:fef7da9106cc7ac1032d43",
      measurementId: "G-RR6PFWFXLG"
    };

    if (!firebase.apps.length) {
      initializeApp(firebaseConfig);
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };


  componentDidMount() {
    //this 'routes' the props to this component, a bit like an import but still different!
    let name = this.props.route.params.name;

    //this is also where you will insert your reference to firestore - like the 'this.referenceShoppingLists'
    //in the exercise. Be sure to check that your 'messages' collection isn't empty in a statement, usually an if-else
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      this.setState({
        uid: user.uid,
        loggedInText: `Welcome, ${user}`
      });
    });

    //this v is important, though unsubscribe can be called in componentwillunmount, vs here
    // if (this.referenceChatMessages !== null) {
    //   this.unsubscribe();
    // } else {
    //   alert('Messages are empty. Please try reloading the app.')
    // }

    this.setState({
      //this is mostly for development as the first message is hardcoded - will eventually replace with a state update
      // also note: while using Firebase, this is how data/'documents' will be formatted, in the 'messages' collection (because it's a noSQL database!)
      // ^ this means that each document consists of a set of key-value pairs, i.e. 'text: "hello"' 
      // furthermore, most chat apps will have sub-collections for each chatroom, i.e. 'weather'
      // when setting up your database, use 'test mode' to make development a bit easier
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