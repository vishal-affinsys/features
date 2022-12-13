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
} from 'react-native';

import {PERMISSIONS, RESULTS, request, check} from 'react-native-permissions';
import {accessPermissioniOS} from '../../helpers/iOSPermissionhandler';
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

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
      module.current = NativeModules.Scanner;
    } else {
      accessPermissioniOS(PERMISSIONS.IOS.CAMERA, () => {});
      module.current = NativeModules.Scanner;
      // module.current = NativeModules.RCTCalendarmodule;
      // module.current.createCalendarEvent('Vishal', 'Ghazipur', res => {
      //   console.log(res);
      // });
    }
  }, []);

  return (
    <SafeAreaView style={style.body}>
      <View style={style.body}>
        <Text style={style.textStyle}>QR Scanner Screen</Text>
        <FlatList
          data={QRtext}
          renderItem={({item}) => {
            return (
              <View>
                <Text>{item}</Text>
              </View>
            );
          }}
        />
        <Button
          onPress={() => {
            if (Platform.OS === 'android') {
              module.current
                .getScanner()
                .then(res => {
                  console.log(res);
                  setQRText(previous => [...previous, res]);
                })
                .catch(e => console.error(e));
            } else {
              // module.current.getScanner('Vishal', 'location', res => {
              //   console.log(res);
              // });
              module.current.addEvent(res => {
                console.log(res);
              });
              module.current
                .resolvePromise()
                .then(res => {
                  console.log(res);
                })
                .catch(error => {
                  console.log(error);
                });
              module.current.naming('Vishal', res => console.log(res));
            }
          }}
          title="Scan"
        />
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
