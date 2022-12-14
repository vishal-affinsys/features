import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  ToastAndroid,
  Image,
  Alert,
  Pressable,
} from 'react-native';

import QRgenerator from 'rn-qr-generator';

const ScannerPage = ({route}) => {
  const uri = route.params.uri;
  function alertBox(message) {
    Alert.alert('QR detected', JSON.stringify(message), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  React.useEffect(() => {
    QRgenerator.detect({
      uri: uri,
    })
      .then(response => {
        const {values} = response; // Array of detected QR code values. Empty if nothing found.
        if (values.length === 0) {
          console.log('No QR detected: ', values);
        } else {
          console.log(values);
          alertBox(values);
        }
      })
      .catch(error => console.log('Cannot detect QR code in image', error));
  });
  return (
    <SafeAreaView style={style.body}>
      <View style={style.imageContainer}>
        <Pressable onPress={() => {}}>
          <Image source={{uri: uri}} style={style.imageStyle} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '90%',
    aspectRatio: 1,
    padding: 12,
  },
  imageContainer: {
    alignItems: 'center',
  },
});

export default ScannerPage;
