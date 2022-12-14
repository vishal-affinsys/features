import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Alert,
  Pressable,
} from 'react-native';

import RNQRGenerator from 'rn-qr-generator';
import {Base64Converter} from '../../helpers/Base64Converter';

const ScannerPage = ({route}) => {
  const uri = route.params.uri;
  function alertBox(message) {
    return Alert.alert('QR detected', JSON.stringify(message), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }

  React.useEffect(() => {
    console.log(uri);
    RNQRGenerator.detect({uri: uri})
      .then(result => {
        console.log(result.values);
      })
      .catch(e => console.log(e));
    // Base64Converter(uri).then(base64 => {
    //   RNQRGenerator.detect({
    //     base64: base64,
    //   })
    //     .then(results => {
    //       const {values} = results;
    //       console.log(results);
    //       if (!values.length === 0) {
    //         alertBox(values);
    //       }
    //     })
    //     .catch(er => console.log(er));
    // });
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
