import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native';

import RNQRGenerator from 'rn-qr-generator';
import {
  alertBox,
  Base64Converter,
  scanWithBase64,
} from '../../helpers/HelperFunctions';

const ScannerPage = ({route}) => {
  const uri = route.params.uri;
  const base64 = route.params.base64;

  React.useEffect(() => {
    console.log(base64, uri);
    if (Platform.OS === 'ios') {
      RNQRGenerator.detect({
        uri: uri,
      })
        .then(result => {
          if (result.values.length !== 0) {
            alertBox(result.values);
          }
        })
        .catch(e => console.log(e));
    } else {
      if (base64 === undefined) {
        Base64Converter(uri);
      } else {
        scanWithBase64(base64);
      }
    }
  });

  return (
    <SafeAreaView style={style.body}>
      <View style={style.imageContainer}>
        <Pressable onPress={() => {}}>
          <Image
            source={{uri: uri === undefined ? null : uri}}
            style={style.imageStyle}
          />
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
