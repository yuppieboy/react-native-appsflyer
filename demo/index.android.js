/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';


import appsFlyer from 'react-native-appsflyer';
import PushNotification from 'react-native-push-notification';

import Button from 'react-native-button';

import AfBase from './index.base';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class demo extends Component {

  constructor(props) {
    super(props);

     this.state = {
      initSdkResponse: "not initialized yet",
      gcmProjectNumberResponse: "not called yet",
      tokenResponse: "not called yet"
    };

    this.initSdk                    = this.initSdk.bind(this);
    this.enableUninstallTracking    = this.enableUninstallTracking.bind(this);
    this.updateServerUninstallToken = this.updateServerUninstallToken.bind(this);

    this.initSdk();

    this.initPush();
  }


  initPush(){
    PushNotification.configure({

      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(tokenObj) {
        console.log( 'TOKEN:', tokenObj );

        this.updateServerUninstallToken(tokenObj.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true,
    });
  }


  initSdk(){

    let options = {
      devKey:  'WdpTVAcYwmxsaQ4WeTspmh',
      isDebug: true
    };

    appsFlyer.initSdk(options,
        (result) => {
           this.setState( { ...this.state, initSdkResponse: result });
         },
        (error) => {
          console.error(error);
        })


  }

  enableUninstallTracking(){

    const  gcmProjectNumber = "997186475229";

    appsFlyer.enableUninstallTracking(gcmProjectNumber,
        (gcmProjectID) => {
          this.setState( { ...this.state, gcmProjectNumberResponse: gcmProjectID });
        })
  }

  updateServerUninstallToken(_token){

    //const token = "xxxxxxxxxxxxx";

    appsFlyer.updateServerUninstallToken(_token,
        (response) => {
          this.setState( { ...this.state, tokenResponse: response });
        })
  }


  render() {
    return (
        <View style={{
          flex: 1,
          marginTop:10,
          flexDirection: 'column',
          justifyContent: 'flex-start', // 'center'
          alignItems: 'stretch' //'flex-start' //'center'
        }}>


            <View style={styles.api_wrapper}>
              <View style={{height: 60, width: 100, backgroundColor: 'powderblue'}}>
                <Button
                    style={styles.sdk_button}
                    styleDisabled={{color: 'red'}}
                    disabled={this.isDisabled}
                    onPress={() => this.initSdk()}>
                  initSDK
                </Button>
              </View>
              <View style={{height: 60,  flex: 1, justifyContent: 'flex-start', alignItems: 'stretch',  backgroundColor: 'skyblue'}}>
                <Text style={styles.json_wrap}>
                  {this.state.initSdkResponse}
                </Text>
              </View>
            </View>

            <AfBase></AfBase>

            <View style={styles.api_wrapper}>
              <View style={{height: 60, width: 100, backgroundColor: 'powderblue'}}>
                <Button
                    style={styles.sdk_button}
                    onPress={() => this.enableUninstallTracking()}>
                  setGCMProjectID
                </Button>
              </View>
              <View style={{height: 60,  flex: 1, justifyContent: 'flex-start', alignItems: 'stretch',  backgroundColor: 'skyblue'}}>
                <Text style={styles.json_wrap}>
                  {this.state.gcmProjectNumberResponse}
                </Text>
              </View>
            </View>

            <View style={styles.api_wrapper}>
              <View style={{height: 60, width: 100, backgroundColor: 'powderblue'}}>
                <Button
                    style={styles.sdk_button}
                    onPress={() => this.updateServerUninstallToken()}>
                  update Uninstall Token
                </Button>
              </View>
              <View style={{height: 60,  flex: 1, justifyContent: 'flex-start', alignItems: 'stretch',  backgroundColor: 'skyblue'}}>
                <Text style={styles.json_wrap}>
                  {this.state.tokenResponse}
                </Text>
              </View>
            </View>


        </View>


    );
  }
}

AppRegistry.registerComponent('demo', () => demo);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    height: 60,
    lineHeight:60
  },
  api_wrapper:{
    height: 60,
    maxHeight:60,
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: 'black',
    borderTopWidth: 1
  },
  sdk_button:{
    fontSize: 14,
    color: 'green',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },

  sdk_button_font_mini:{
    fontSize: 12,
    color: 'green',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },

  json_wrap:{
    fontSize:9,
    marginTop: 3,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10
  }
});