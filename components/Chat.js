import React from "react";
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { initializeApp } from "firebase";
import * as firebase from 'firebase';

require('firebase/firestore');

//this is the chat screen, where chat can take place in UI
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
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

    //this is your reference to firestore to load messages
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        }
      });
    });
    this.setState({
      messages: messages,
    });
  };

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,

    });
  }

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message)
    }
  };

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }


  componentDidMount() {
    //this 'routes' the props to this component, a bit like an import but still different!
    let name = this.props.route.params.name;

    // this will set the title of the screen to the state of the props (in this case, 'name')
    this.props.navigation.setOptions({ title: name });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
      } else {
        console.log('offline');
      }
    })

    //this is your reference to firestore to load messages
    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.getMessages();

    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

      this.setState({
        uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: user.name,
          avatar: 'https://placeimg.com/140/140/any',
        },
      });

      this.referenceMessagesUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

      this.unsubscribe = this.referenceChatMessages.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
    });

    //removed hardcoded message and user info here. Using asyncStorage now.
  }

  componentWillUnmount() {
    if (this.referenceChatMessages !== null) {
      this.authUnsubscribe();
    } else {
      alert('Messages are empty. Please try reloading the app.')
    }
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
        }} />);
  }

  renderInputToolbar(props) {
    if (this.state.isConnected == false) {

    } else {
      return (
        <InputToolbar
          {...props}
        />
      );
    }
  }

  // this is also a Gifted Chat function - allows state preserving of messages and appends new messages
  onSend(messages = []) {
    // 'previousState' is used to check message state as well
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    )
  }

  render() {
    let { color } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        {/* renders the message interface using the Gifted Chat library - chat bubbles rendered using built-in renderbubble function. 
        Also implements onSend function*/}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.user.name,
            avatar: this.state.user.avatar,
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