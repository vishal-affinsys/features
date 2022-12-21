import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  PermissionsAndroid,
  NativeModules,
  FlatList,
  Button,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import {PERMISSIONS} from 'react-native-permissions';
import {accessPermissioniOS} from '../../helpers/iOSPermissionhandler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const QRScan = () => {
  const [QRtext, setQRText] = React.useState([]);
  const requestCameraPermission = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    console.log(granted);
  };

  const module = React.useRef();
  const device = useCameraDevices('wide-angle-camera').back;

  React.useEffect(() => {
    async function managePermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();
      return [newCameraPermission, newMicrophonePermission];
    }
    managePermission();
    if (Platform.OS === 'android') {
      requestCameraPermission();
      module.current = NativeModules.Scanner;
    } else {
      accessPermissioniOS(PERMISSIONS.IOS.CAMERA, () => {});
      module.current = NativeModules.Scanner;
    }
  }, []);

  const refCamera = React.useRef();

  return (
    <SafeAreaView style={style.body}>
      <View style={style.body}>
        {device === undefined || device === null ? (
          <ActivityIndicator />
        ) : (
          <Camera
            ref={refCamera}
            style={{flex: 1}}
            device={device}
            isActive={true}
            frameProcessorFps={'auto'}
            photo={true}
            // frameProcessor={frameProcessor}
          />
        )}

        {/* <FlatList
          data={QRtext}
          renderItem={({item}) => {
            return (
              <View>
                <Text>{item}</Text>
              </View>
            );
          }}
        /> 
        <Button onPress={() => {}} title="Scan" />*/}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pressable: {
    padding: 12,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#f38218ff',
  },
  outerContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default QRScan;
