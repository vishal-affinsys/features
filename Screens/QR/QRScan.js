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
} from 'react-native';
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
      module.current
        .getScanner()
        .then(res => {
          console.log(res);
          setQRText(previous => [...previous, res]);
        })
        .catch(e => console.log(e));
    }
  }, []);

  return (
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
          module.current
            .getScanner()
            .then(res => {
              console.log(res);
              setQRText(previous => [...previous, res]);
            })
            .catch(e => console.log(e));
        }}
        title="Scan"
      />
    </View>
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
