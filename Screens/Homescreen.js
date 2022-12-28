import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Button, StyleSheet, Platform} from 'react-native';
import CustomButton from '../Components/CustomButton';

const Homescreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style.body}>
      <View style={{display: Platform.OS === 'ios' ? 'none' : null}}>
        {Platform.OS === 'ios' ? (
          <View />
        ) : (
          <CustomButton
            title={'SMS Reader'}
            rippleColor={'white'}
            btnStyle={style.btnStyle}
            btnText={style.btnText}
            onPress={() => {
              navigation.navigate('SMSReader');
            }}
          />
        )}
      </View>

      <CustomButton
        title={'Biometric'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('BioemetricReader');
        }}
      />

      <CustomButton
        title={'Contact Reader'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('ContactReader');
        }}
      />

      <CustomButton
        title={'QR generator'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('QRGen');
        }}
      />

      <CustomButton
        title={'QR Scanner'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('QRScan');
        }}
      />

      <CustomButton
        title={'webview'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('webview');
        }}
      />

      <CustomButton
        title={'On Screen QR reader'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('OnScreenQRReader');
        }}
      />

      <CustomButton
        title={'NFC'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('NFCScreen');
        }}
      />

      <CustomButton
        title={'BT printer'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('BTDevices');
        }}
      />

      <CustomButton
        title={'Notifications'}
        rippleColor={'white'}
        btnStyle={style.btnStyle}
        btnText={style.btnText}
        onPress={() => {
          navigation.navigate('LocalNotifications');
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btnStyle: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(100,120,230,1)',
  },
  btnText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Homescreen;
