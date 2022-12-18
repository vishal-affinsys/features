import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  useWindowDimensions,
  SafeAreaView,
  Linking,
} from 'react-native';
import Share from 'react-native-share';
import {useNavigation} from '@react-navigation/native';

const QRGen = () => {
  const navigate = useNavigation();
  const [value, setValue] = React.useState(null);
  const [editingText, setEditingText] = React.useState(null);
  const [baseValue, setBaseValue] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const input = React.useRef();
  const {width, height} = useWindowDimensions();

  function generateUrl(amount) {
    let url =
      'upi://pay?pa=' + // payment method.
      '7084324572@axl' + // VPA number.
      '&am=' +
      amount + // this param is for fixed amount (non editable).
      '&pn=Vishal%20Singh' + // to showing your name in app.
      '&cu=INR' + // Currency code.
      '&mode=02' + // mode O2 for Secure QR Code.
      '&orgid=000000'; //If the transaction is initiated by any PSP app then the respective orgID needs to be passed.
    // '&sign=MEYCIQC8bLDdRbDhpsPAt9wR1a0pcEssDaV' + // Base 64 encoded Digital signature needs to be passed in this tag
    // 'Q7lugo8mfJhDk6wIhANZkbXOWWR2lhJOH2Qs/OQRaRFD2oBuPCGtrMaVFR23t';
    return url;
  }

  return (
    <SafeAreaView style={style.body}>
      <View style={style.body}>
        <TextInput
          ref={input}
          style={{
            ...style.textInput,
            borderColor: errorMessage ? 'red' : 'grey',
          }}
          placeholder="Enter your amount"
          keyboardType="decimal-pad"
          placeholderTextColor={style.textInput.color}
          onChangeText={val => {
            setEditingText(val);
            setErrorMessage(false);
          }}
        />
        <View style={style.bodyTextContainer}>
          {value === null ? (
            <View />
          ) : (
            <Pressable
              onPress={() => {
                baseValue.toDataURL(base => {
                  navigate.navigate('ScannerPage', {
                    base64: base,
                  });
                });
              }}>
              <QRCode
                // ref={qrRef}
                getRef={c => {
                  setBaseValue(c);
                }}
                size={Math.min(width * 0.7, height * 0.3)}
                value={value}
                logoSize={50}
                logoBackgroundColor="black"
              />
            </Pressable>
          )}
        </View>
        <View style={{...style.outerContainer, marginBottom: height * 0.02}}>
          <View style={style.buttonContainer}>
            <Pressable
              onPress={() => {
                if (editingText === null) {
                  setErrorMessage(true);
                  return;
                } else {
                  setValue(
                    editingText === null ? value : generateUrl(editingText),
                  );
                  setEditingText(null);
                  input.current.clear();
                  input.current.blur();
                }
              }}
              style={style.pressable}
              android_ripple={{color: 'white'}}>
              <Text style={style.buttonText}>Generate QR</Text>
            </Pressable>
          </View>
        </View>
        <View style={{...style.outerContainer, marginBottom: height * 0.04}}>
          <View style={style.buttonContainer}>
            <Pressable
              onPress={async () => {
                console.log(baseValue !== null);
                if (baseValue !== null) {
                  function callback(dataURL) {
                    let link = `data:image/png;base64,${dataURL}`;
                    let shareImageBase64 = {
                      message: 'Pay using this link',
                      url: link,
                      title: 'Pay using this url',
                    };
                    Share.open(shareImageBase64)
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        err && console.log(err);
                      });
                  }
                  baseValue.toDataURL(cla => callback(cla));
                } else {
                  setErrorMessage(true);
                }
              }}
              style={style.pressable}
              android_ripple={{color: 'white'}}>
              <Text style={style.buttonText}>Share QR</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  bodyTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textStyle: {
    fontFamily: 'OpenSansHebrew-Regular',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  pressable: {
    padding: 12,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#f38218ff',
  },
  outerContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default QRGen;
