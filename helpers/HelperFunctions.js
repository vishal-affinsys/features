import {Alert, Linking, NativeModules, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const Base64Converter = async uri => {
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  let data = null;
  await RNFetchBlob.config({fileCache: true})
    .fetch('GET', uri)
    .then(resp => {
      imagePath =
        Platform.OS === 'android' ? 'file://' + resp.path() : resp.path();
      resp.base64().then(dat => {
        scanWithBase64(dat);
      });
    })
    .then(base64Data => {
      data = base64Data;
      // fs.unlink(imagePath).catch(er => {
      //   console.warn('Something went wrong while deleting cache');
      // });
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

export async function getFileType(response) {
  console.log(await response.blob());
  let fileType = `${response.respInfo.headers['content-type']}`
    .split('')
    .reverse()
    .join('');
  let ext =
    '.' + fileType.slice(0, fileType.indexOf('/')).split('').reverse().join('');
  console.log(ext);
  return ext;
}

export const scanWithBase64 = base64 => {
  NativeModules.QRDecoder.ScanImage(base64)
    .then(val => {
      // alertBox('QR detected', val);
      if (`${val}`.includes('upi://pay?', 0)) {
        // NativeModules.GooglePay.startIntent(val);
        Linking.openURL(val);
      } else {
        alertBox('QR detected', val);
      }
    })
    .catch(e => console.log(e));
};
