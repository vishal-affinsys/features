import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import {alertBox} from '../../helpers/HelperFunctions';

function NFCScreen() {
  const [hasNfc, sethasNfc] = React.useState(false);

  async function readNdef() {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      alertBox('Tag found', tag);
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  async function writeNdef({type, value}) {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  async function cancelScan() {
    await NfcManager.cancelTechnologyRequest();
  }

  React.useEffect(() => {
    const checkNFC = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      sethasNfc(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkNFC();
  });

  return (
    <View style={styles.wrapper}>
      {hasNfc ? (
        <View />
      ) : (
        <View>
          <Text>NFC not supported</Text>
        </View>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnStyle}
        onPress={readNdef}>
        <Text style={styles.btnText}>Read tag</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnStyle1}
        onPress={writeNdef}>
        <Text style={styles.btnText}>Write</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnStyle2}
        onPress={cancelScan}>
        <Text style={styles.btnText}>Cancel Scan</Text>
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
  btnStyle: {
    padding: 8,
    backgroundColor: '#218871',
    borderRadius: 7,
    margin: 12,
  },
  btnStyle1: {
    padding: 8,
    backgroundColor: '#216387',
    borderRadius: 7,
    margin: 12,
  },
  btnStyle2: {
    padding: 8,
    backgroundColor: '#FF8871',
    borderRadius: 7,
    margin: 12,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
});

export default NFCScreen;
