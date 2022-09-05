# myChat
React native app for chatting

##About

This is a chat app built using Expo, Gifted Chat, Firebase/Firestore, and React Native. Users can sign in anonymously with a display name and chat with other users, send and take photos, and share locations.

##To Use:

###Installing Dependencies:

**Please read these instructions before installing anything.**
First, download this project from github and make sure all files are downloaded and will open in your choice of IDE.

To use this app locally, you must have the following dependencies installed:

  * "@expo/react-native-action-sheet": "^3.13.0",
  * "@react-native-async-storage/async-storage": "~1.17.3",
    "@react-native-community/masked-view": "^0.1.11",
  * "@react-native-community/netinfo": "8.2.0",
    "@react-navigation/native": "^6.0.11",
    "@react-navigation/stack": "^6.2.2",
  * "expo": "~45.0.0",
  * "expo-image-picker": "~13.1.1",
  * "expo-location": "~14.2.2",
  * "expo-permissions": "~13.2.0",
    "expo-status-bar": "~1.3.0",
  * "firebase": "^7.9.0",
    "path": "^0.12.7",
    "prop-types": "^15.8.1",
    "querystring": "^0.2.1",
  * "react": "17.0.2",
  * "react-dom": "17.0.2",
  * "react-native": "0.68.2",
    "react-native-gesture-handler": "~2.2.1",
  * "react-native-gifted-chat": "^1.0.4",
  * "react-native-maps": "0.30.2",
    "react-native-safe-area-context": "4.2.4",
    "react-native-screens": "~3.11.1",
    "react-native-web": "0.17.7",
    "react-navigation": "^4.4.4",
    "zlib": "^1.0.5"
    
    
    To install these, do NOT simply go through this list - many of these dependencies are installed as packages within larger libraries or frameworks. You will need to install the dependencies marked by asterisk, using the versions listed. To do so:
    
    **First make sure you are in the root folder of the project!**
    
    Install React and React Native if you don't already have them:
    `npm install react react-dom react-native`
    
    Start with expo, using this command:
    `npm install expo-cli --global`
    
    Next:
    
    `npm install react-native-gifted-chat --save`
    
    `npm install --save firebase@7.9.0`
    
    `expo install @react-native-async-storage/async-storage`
    
    `expo install @react-native-community/netinfo`
    
    `expo install expo-image-picker`
    `expo install expo-location`
    `expo install react-native-maps`
   
Note the difference in using expo and npm to install - this will cause errors if done incorrectly.

###Running the app:

To begin running the app, open your terminal and run 'expo start' while in the root folder of the project (once downloaded from github). This will start a local server and give you a QR code.
    
Next, if you have an android phone, download Expo Go from the app store. Once downloaded, follow the steps to login/create an account and wait for the menu screen to load. Once it does, use the option 'Scan QR code' to scan the code your terminal displays. This will load the app. NOTE: your local machine and your phone must be on the same network to run the app this way.

###Setting Up an Emulator:

If you do not have an android phone, download android studio to create an emulator on your computer: [Download Android Studio](https://developer.android.com/studio/?gclid=CjwKCAjwvNaYBhA3EiwACgndgp93rH50vWIpTzBLHPaTkq80z14PNxoZbQ7BASWiywGhQ5bnl7j_sxoCDqoQAvD_BwE&gclsrc=aw.ds&authuser=1)

  Once Android studio is downloaded and opened (usually you'll find it in your applications folder):
  
  Generally, you can keep clicking Next through the default settings. However, note the following two exceptions:

1. If you’re asked to Select Components to Install, make sure “Android Virtual Device” is selected.
2. You may also need to define the location on your device where you want to install Android Studio. Make sure you add a logical file path before completing the rest of the instructions.

At the end of the installation, you’ll need to accept the license agreement. Then, press the Finish button to start downloading all selected components.

Next, from the welcome screen, you'll see some options and a dropdown menu beneath for 'More Options'. Click this menu and select 'SDK manager'.
The SDK Manager allows you to view, install, update, and uninstall packages for the Android SDK.

A modal will open with a list of Android SDK options. By default, you’ll be shown the list of items in the SDK Platforms tab. You’ll need to navigate to the 'SDK Tools' tab right next to it. 

NOTE: Check that you have “Android SDK Build-Tools” installed. In order to run the command to build your app later, you’ll need this set of tools. If it’s not installed, check the box next to “Android SDK Build-Tools,” then click Apply at the bottom of the modal (and confirm that you’d like to download the latest version). 
**Windows Users Only:**

AMD CPU Users (on Windows) Only: If you have an AMD CPU, you’ll need to enable and install “Android Emulator Hypervisor Driver for AMD processors (installer).” If it’s not already installed, tick its box, then apply it.

Intel CPU Users (on Windows) Only: If you have an Intel CPU, you’ll need to enable and install “Intel x86 Emulator Accelerator (HAXM installer).” If it’s not already installed, tick its box, then apply it.

**MacOS Users Only:**

1. Copy the path next to “Android SDK Location”
2. Check what shell your terminal is using. 
3. Locate and open your “~/.bash_profile” or “~/.bashrc” file (or “~/.zshrc” if you have zsh terminal instead of bash).
4. Add the default stored location of ANDROID_SDK on your system by adding the following to your “~/.bash_profile” or “~/.bashrc” file (or “~/.zshrc” if you have zsh terminal instead of bash):

export ANDROID_SDK=/Users/myuser/Library/Android/sdk. (This path will be different depending on your device, so be sure to edit it accordingly.)

5. Add the location for the tools you’ll need to interact with the Android device by adding Platform-Tools (which is located as a sub-directory of ANDROID_SDK on your system). To do so, add it to your “~/.bash_profile” or “~/.bashrc” file (or “~/.zshrc” if you have zsh terminal instead of bash) via the following line of code (edited to correspond with your own device):

export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH

Once you’ve installed these additional components, you can continue with your set up! Close the “SDK Manager” window by pressing OK.

###Using an Emulator:

From your Android Studio Welcome Screen, click More Actions again, followed by Virtual Device Manager.
Then, select Create Virtual Device, along with the device you’d like to create. Pick whichever mobile phone device you want, followed by Next.

This will take you to the System Image interface, where you’ll need to select an operating system and download the system images. Click on the Recommended tab and select a suitable operating system. It might be worth doing a quick Google search to see which OS your chosen device uses. Google Pixel 5, for example, uses the Android 11 OS. You can see Android 11 listed in the Target column, so select this row.

Click the Download link next to whichever OS you want to install, after which, Android Studio will download the corresponding system images.In the next window, give your device a name, then click Finish.

Head back to the Virtual Device Manager and click Play to start your newly created emulator. This will render the selected device on your screen, ready to emulate your code! Once your emulator is rendered to your screen, you can connect with Expo in the browser to run and view your React Native project.

From your CLI, when you start the app, choose the option to run on android (for Mac users, this is as simple as pressing 'a' while the app is running).

##Setting up Firebase

This app also uses Firebase as a database server. It's already set up to use CRUD operations on a collection created by myself, but if you want to edit this and create your own, follow these steps:

1. Create a Firebase account: [Firebase](https://console.firebase.google.com/u/0/)
2. Create a project from the main console dashboard and name it something you can remember and associate with this app. As you’re just getting set up, you need to create a database, so click Develop from the menu on the left-hand side and, from the additional menu that appears, select Cloud Firestore (be careful not to click the "Realtime Database" option), then select Create Database. 
3. Go with the 'Start in test mode' option for now, which will likely give you the warning message “Anyone with your database reference will be able to read or write to your database.” This is fine for unpublished apps.
4. In the Firestore project in your browser, open up your “Project Settings” (by clicking on the gear icon). Under the General tab, you’ll find a section called Your Apps, which is where you can generate configurations for different platforms. Click the Firestore for Web button (it may be shown as the </> icon).
5. This will open a new screen asking you to register your web application, which will connect to the Cloud Firestore database you just created. For now, only fill in a name for your chat application (e.g., “chat_web_app”), then click Register to generate the configuration code.
6. Copy the contents of the config object (from { apiKey:… to messagingSenderId:…}) in this modal. You’ll be integrating this configuration info into your “App.js” file, which is what will allow your app to connect to Firestore. But before you can simply paste it into your file, you first need to create a constructor in your App class that will initialize the Firestore app. Within that constructor, you can paste the data you copied from the config object.
7. Next up, you’ll need to create a reference to your Firestore collection (the above code connected your database but didn’t reference any specific collection within that database). To do so (in the code of Chat.js), use the following line:
`this.referenceYourCollection = firebase.firestore().collection('yourcollection');`
Just make sure you replace 'yourcollection' with the name of your database collection in firestore!

And that's it! If there are any issues or anything that needs clarification, please feel free to message me or create an issue in github.

Thank you!













    

    
