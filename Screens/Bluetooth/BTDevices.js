import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  Button,
  Text,
  FlatList,
} from 'react-native';

const requestSMSPermission = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
  ]);

  console.log(granted);
};

const BTDevices = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState([]);

  var eventListener = useRef();
  const BTdeviceModlue = NativeModules.BTPrinter;

  useFocusEffect(
    React.useCallback(() => {
      requestSMSPermission();
      async function turnOnBluetooth() {
        const loge = await BTdeviceModlue.turnOnBluetooth();
        console.log(loge);
        if (loge === 'Bluetooth enabled') {
          getConnectedDevices();
          return true;
        } else {
          return false;
        }
      }
      async function getConnectedDevices() {
        BTdeviceModlue.getConnectedDevices(res => {
          setMessage(previous => [...previous, JSON.stringify(res)]);
        });
      }
      if (turnOnBluetooth()) {
        const eventEmitter = new NativeEventEmitter(NativeModules.BTPrinter);
        eventListener.current = eventEmitter.addListener('BTDevices', data => {
          console.log(data);
          setMessage(previous => [...previous, JSON.stringify(data)]);
        });
        return () => {
          eventListener.current.remove();
        };
      }
    }, [BTdeviceModlue]),
  );

  // useEffect(() => {
  //   NativeModules.GooglePay.startIntent(
  //     'upi://pay?pa=7084324572@axl&pn=vishal%20singh&mc=0000&mode=02&purpose=00',
  //   );
  // });

  return (
    <View style={style.body}>
      <View style={style.bodyTextContainer}>
        <Text style={style.textStyle}>Bluetooth Devices</Text>
      </View>
      <FlatList
        data={message}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
    </View>
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

export default BTDevices;
