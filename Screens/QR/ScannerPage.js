import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import RNQRGenerator from 'rn-qr-generator';
import {alertBox, Base64Converter} from '../../helpers/HelperFunctions';

const ScannerPage = ({route}) => {
  const uri = route.params.uri;

  async function getPermission() {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    console.log(granted);
  }

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      RNQRGenerator.detect({
        uri: uri,
      })
        .then(result => {
          alertBox(result.values);
        })
        .catch(e => console.log(e));
    } else {
      getPermission();
      Base64Converter(uri);
    }
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
