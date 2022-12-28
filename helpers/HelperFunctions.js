/* eslint-disable no-unused-vars */
import {Alert, Linking, NativeModules, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {Notifications} from 'react-native-notifications';
import Sound from 'react-native-sound';

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

export const getScanner = setQRText => {
  if (Platform.OS === 'android') {
    module.current
      .getScanner()
      .then(res => {
        console.log(res);
        setQRText(previous => [...previous, res]);
      })
      .catch(e => console.error(e));
  } else {
    // module.current.getScanner('Vishal', 'location', res => {
    //   console.log(res);
    // });
    module.current.addEvent(res => {
      console.log(res);
    });
    module.current
      .resolvePromise()
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    module.current.naming('Vishal', res => console.log(res));
  }
};

export const onDisplayNotification = ({title, body, payload}) => {
  Notifications.postLocalNotification({
    title: title,
    body: body,
    payload: payload,
    sound: 'notification.mp3',
  });
};

export const playSound = () => {
  // Enable playback in silence mode
  Sound.setCategory('Playback');

  // --> Notification.mp3 is placed inside /android/main/src/res/raw folder
  // --> Remember mp3 file name should be in smallcase tih not tab and spaces.
  var whoosh = new Sound('notification.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });

  // Reduce the volume by half
  whoosh.setVolume(0.5);

  // Position the sound to the full right in a stereo field
  whoosh.setPan(1);

  // Loop indefinitely until stop() is called
  whoosh.setNumberOfLoops(-1);

  // Get properties of the player instance
  console.log('volume: ' + whoosh.getVolume());
  console.log('pan: ' + whoosh.getPan());
  console.log('loops: ' + whoosh.getNumberOfLoops());

  // Seek to a specific point in seconds
  whoosh.setCurrentTime(2.5);

  // Get the current playback point in seconds
  whoosh.getCurrentTime(seconds => console.log('at ' + seconds));

  // Pause the sound
  whoosh.pause();

  // Stop the sound and rewind to the beginning
  whoosh.stop(() => {
    // Note: If you want to play a sound after stopping and rewinding it,
    // it is important to call play() in a callback.
    whoosh.play();
  });

  // Release the audio player resource
  whoosh.release();
};
