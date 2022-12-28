import Sound from 'react-native-sound';

var whoosh = new Sound('notification.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
class SoundModule {
  constructor() {
    console.log();
    Sound.setCategory('Playback');
    // --> Notification.mp3 is placed inside /android/main/src/res/raw folder
    // --> Remember mp3 file name should be in smallcase tih not tab and spaces.
  }
  playSound = () => {
    console.info(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  pauseSound = () => {
    whoosh.pause();
  };
  setVolume = volumePercentage => {
    // volumePercentage should be in decimals 0<volumePercentage<1
    whoosh.setVolume(volumePercentage);
  };

  setPan = value => {
    // Position the sound to the full right in a stereo field
    whoosh.setPan(1);
  };

  stopSound = () => {
    // Stop the sound and rewind to the beginning
    whoosh.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      // whoosh.play();
    });
    // Release the audio player resource
    whoosh.release();
  };
}
export default SoundModule;
