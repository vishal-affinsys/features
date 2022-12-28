// import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';

import {
  BluetoothManager,
  // BluetoothEscposPrinter,
  // BluetoothTscPrinter,
} from '@brooons/react-native-bluetooth-escpos-printer';
import {alertBox} from '../../helpers/HelperFunctions';
import CustomButton from '../../Components/CustomButton';

const requestSMSPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ]);

    console.log(granted);
  } else {
  }
};

const BTDevices = () => {
  // const navigation = useNavigation();
  const [pairedDevices, setPairedDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);

  async function getPrinter() {
    requestSMSPermission();
    const isEnabled = await BluetoothManager.checkBluetoothEnabled();
    console.log(isEnabled);
    BluetoothManager.enableBluetooth()
      .then(val => {
        const response = val
          .reduce((acc, device) => {
            try {
              return [...acc, JSON.parse(device)];
            } catch (e) {
              return acc;
            }
          }, [])
          .filter(device => device.address);
        setPairedDevices(pre => response);
        BluetoothManager.scanDevices().then(s => {
          var ss = JSON.parse(s); //JSON string
          console.log(ss);
          setAvailableDevices(pre => ss);
        });
      })
      .catch(err => {
        console.log(err);
        alertBox('Error!', err);
      });
  }

  React.useEffect(() => {
    getPrinter();
  }, []);

  return (
    <View style={style.body}>
      <View style={style.listView}>
        <Text style={[style.textStyle]}>Paired Devices</Text>
        <FlatList
          data={pairedDevices}
          renderItem={({item}) => {
            return <FlatListItem item={item} />;
          }}
        />
      </View>
      <View style={style.listView}>
        <View style={style.loadingView}>
          <Text style={style.textStyle}>Available devices</Text>
          {availableDevices.length === 0 ? (
            <ActivityIndicator color={'black'} />
          ) : (
            <View />
          )}
        </View>
        <FlatList
          data={availableDevices.found}
          renderItem={({item}) => {
            return <FlatListItem item={item} />;
          }}
        />
      </View>
    </View>
  );
};

const FlatListItem = ({item}) => {
  async function connectBTDevice(address) {
    BluetoothManager.connect(address) // the device address scanned.
      .then(
        s => {
          console.log(s);
        },
        e => {
          console.log(e);
        },
      );
  }
  return (
    <View style={style.card}>
      <View>
        <Text style={style.title}>{item.name}</Text>
        <Text style={style.subtitle}>{item.address}</Text>
      </View>
      <CustomButton
        title={'Connect'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        rippleColor={'white'}
        onPress={() => {
          console.log(item.address);
          connectBTDevice(item.address);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(240,240,240,0.9)',
  },
  btnStyle: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(100,120,230,1)',
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  bodyTextContainer: {
    alignItems: 'center',
  },
  listView: {
    flex: 1,
  },
  loadingView: {
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 24,
    color: 'black',
    margin: 12,
    fontWeight: 'bold',
  },
  card: {
    margin: 8,
    marginHorizontal: 12,
    marginBottom: 4,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: 'blue',
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 12,
    color: '#111',
    fontStyle: 'italic',
  },
});

export default BTDevices;

// var eventListener = useRef();
// const BTdeviceModlue = NativeModules.BTPrinter;
// useFocusEffect(
//   React.useCallback(() => {
//     requestSMSPermission();
//     async function turnOnBluetooth() {
//       const loge = await BTdeviceModlue.turnOnBluetooth();
//       console.log(loge);
//       if (loge === 'Bluetooth enabled') {
//         getConnectedDevices();
//         return true;
//       } else {
//         return false;
//       }
//     }
//     async function getConnectedDevices() {
//       BTdeviceModlue.getConnectedDevices(res => {
//         setPairedDevices(previous => [...previous, JSON.stringify(res)]);
//       });
//     }
//     if (turnOnBluetooth()) {
//       const eventEmitter = new NativeEventEmitter(NativeModules.BTPrinter);
//       eventListener.current = eventEmitter.addListener('BTDevices', data => {
//         console.log(data);
//         setPairedDevices(previous => [...previous, JSON.stringify(data)]);
//       });
//       return () => {
//         eventListener.current.remove();
//       };
//     }
//   }, [BTdeviceModlue]),
// );
