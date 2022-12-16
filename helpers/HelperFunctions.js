import {Alert, NativeModules} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const Base64Converter = async uri => {
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  let data = null;
  await RNFetchBlob.config({fileCache: true})
    .fetch('GET', uri)
    .then(resp => {
      console.log(uri);
      resp.base64().then(dat => {
        NativeModules.QRDecoder.ScanImage(dat)
          .then(val => {
            alertBox(val);
            console.log(val);
          })
          .catch(e => console.log(e));
      });
    })
    .then(base64Data => {
      data = base64Data;
      // return fs.unlink(imagePath);
    });
  return 'data:image/png;base64,' + data;
};

export const alertBox = (title, message) => {
  return Alert.alert(title, JSON.stringify(message), [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};
