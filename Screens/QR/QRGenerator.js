import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import Share from 'react-native-share';

const QRGen = () => {
  const [value, setValue] = React.useState(null);
  const [editingText, setEditingText] = React.useState(null);
  const [baseValue, setBaseValue] = React.useState(null);
  const input = React.useRef();
  const {width, height} = useWindowDimensions();

  return (
    <View style={style.body}>
      <TextInput
        ref={input}
        style={style.textInput}
        placeholder="Enter your amount"
        placeholderTextColor={style.textInput.color}
        onChangeText={val => {
          setEditingText(val);
        }}
      />
      <View style={style.bodyTextContainer}>
        {value === null ? (
          <View />
        ) : (
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
        )}
      </View>
      <View style={{...style.outerContainer, marginBottom: height * 0.02}}>
        <View style={style.buttonContainer}>
          <Pressable
            onPress={() => {
              setValue(editingText === null ? value : editingText);
              setEditingText(null);
              input.current.clear();
              input.current.blur();
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
            }}
            style={style.pressable}
            android_ripple={{color: 'white'}}>
            <Text style={style.buttonText}>Share QR</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
