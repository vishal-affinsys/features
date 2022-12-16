import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {alertBox} from '../../helpers/HelperFunctions';

function NFCScreen() {
  async function readNdef() {
    NfcManager.start()
      .then(res => console.log(res))
      .catch(e => {
        alertBox('Error', 'Not supported on this device');
        console.warn(e);
      });
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      console.log('Tag found', tag);
      alertBox('Tag found', tag);
    } catch (ex) {
      console.log('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  React.useEffect(() => {
    readNdef();
  });

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NFCScreen;
