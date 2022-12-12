/* eslint-disable no-unused-vars */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform, SafeAreaView} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const BiometricReader = () => {
  const rnBiometrics = new ReactNativeBiometrics();
  const navigation = useNavigation();

  function checkSensors() {
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      console.log(resultObject);

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log('TouchID is supported');
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log('FaceID is supported');
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        console.log('Biometrics is supported');
      } else {
        console.log('Biometrics not supported');
      }
    });
  }

  function createKey() {
    rnBiometrics.createKeys().then(resultObject => {
      //   const {publicKey} = resultObject;
      console.log(resultObject);
    });
  }

  async function checkKeyExist() {
    const key = await rnBiometrics.biometricKeysExist();
    const {keysExist} = key;
    console.log('Hello this is key exist:' + keysExist);
    return keysExist;
  }

  function deleteKey() {
    rnBiometrics.deleteKeys().then(resultObject => {
      const {keysDeleted} = resultObject;

      if (keysDeleted) {
        console.log('Successful deletion');
      } else {
        console.log(
          'Unsuccessful deletion because there were no keys to delete',
        );
      }
    });
  }

  function createSignature() {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';
    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then(resultObject => {
        const {success, signature} = resultObject;
        console.log(resultObject);

        if (success) {
          console.log(signature);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function prompt() {
    rnBiometrics
      .simplePrompt({
        promptMessage: 'Confirm fingerprint',
        fallbackPromptMessage: 'failed to verify fingerprint',
      })
      .then(resultObject => {
        const {success} = resultObject;
        console.log(resultObject);
        if (success) {
          console.log('successful biometrics provided');
        } else {
          navigation.pop();
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(err => {
        navigation.pop();
        navigation.navigate('BiometricError', err);
        console.log('biometrics failed');
      });
  }

  async function accessCamera() {
    check(PERMISSIONS.IOS.FACE_ID)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.FACE_ID, res => {
              console.log('Permission granted for FaceID');
              checkKeyExist().then(val => {
                if (val) {
                  prompt();
                } else {
                  createKey();
                  createSignature();
                }
              });
            });
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            checkKeyExist().then(val => {
              if (val) {
                prompt();
              } else {
                createKey();
                createSignature();
              }
            });

            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkKeyExist().then(val => {
        if (val) {
          prompt();
        } else {
          createKey();
          createSignature();
        }
      });
    } else {
      accessCamera();
    }
  });
  return (
    <SafeAreaView style={style.body}>
      <View style={style.body}>
        <View style={style.bodyTextContainer}>
          <Text style={style.textStyle}>Biometric Reader Screen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  bodyTextContainer: {
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BiometricReader;
