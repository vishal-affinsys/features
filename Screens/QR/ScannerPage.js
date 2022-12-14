import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

import QRgenerator from 'rn-qr-generator';

const ScannerPage = ({route}) => {
  const uri = route.params.uri;

  React.useEffect(() => {
    QRgenerator.detect({
      uri: uri,
    })
      .then(response => {
        const {values} = response; // Array of detected QR code values. Empty if nothing found.
        console.log(values);
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
