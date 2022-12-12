import React, {useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  Button,
} from 'react-native';

import {WebView} from 'react-native-webview';

const requestSMSPermission = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
  ]);

  console.log(granted);
};

function onMessage(data) {
  // eslint-disable-next-line no-alert
  alert(data.nativeEvent.data);
}

const SMSReaderWeb = () => {
  const webviewRef = useRef();

  function sendDataToWebview(message) {
    webviewRef.current.injectJavaScript(`
    (function() {
      document.dispatchEvent(new MessageEvent('message', {
        data: ${JSON.stringify(message)}
      }));
    })();
  `);
  }
  var eventListener = useRef();
  useFocusEffect(
    React.useCallback(() => {
      requestSMSPermission();
      const eventEmitter = new NativeEventEmitter(NativeModules.SMSReader);
      eventListener.current = eventEmitter.addListener('SMSReceiver', data => {
        console.log(data);
        sendDataToWebview(JSON.stringify(data));
      });

      return () => {
        eventListener.current.remove();
      };
    }, []),
  );
  return (
    <View style={style.body}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        // injectedJavaScript={}
        source={{html: html}}
        mixedContentMode="compatibility"
        onMessage={onMessage}
      />
      <Button
        title="Data to web"
        onPress={() => {
          sendDataToWebview('Hello this is native');
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  textStyle: {
    fontSize: 20,
    fontFamily: 'OpenSansHebrew-Regular',
  },
  inputText: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 8,
    borderRadius: 12,
  },
});

export default SMSReaderWeb;

const html = `<!DOCTYPE html>
<html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
            "
          >
            <button
            onclick="sendDataToReactNativeApp()"
              style="
                padding: 20;
                width: 200;
                font-size: 20;
                color: white;
                background-color: #6751ff;
              "
            >
              Send Data To React Native App
            </button>
            <p id="para"></p>
            <script>
              const sendDataToReactNativeApp = async () => {
                window.ReactNativeWebView.postMessage('Data from WebView / Website');
              };
              document.addEventListener("message", message => {
                document.getElementById("para").innerHTML = message.data
              });
            </script>
          </body>
        </html> `;
