import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const Homescreen = () => {
  const navigation = useNavigation();

  return (
    <View style={style.body}>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('SMSReader');
          }}
          title="SMS Reader"
        />
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('BioemetricReader');
          }}
          title="Biometric"
        />
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('ContactReader');
          }}
          title="Contact Reader"
        />
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('QRGen');
          }}
          title="QR generator"
        />
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('QRScan');
          }}
          title="QR Scanner"
        />
      </View>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('webview');
          }}
          title="webview"
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
});

export default Homescreen;
