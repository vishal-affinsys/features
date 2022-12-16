import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  PermissionsAndroid,
} from 'react-native';

const OnScreenQRReader = () => {
  const navigate = useNavigation();
  return (
    <SafeAreaView style={style.body}>
      <Pressable
        onPress={() => {
          navigate.navigate('ScannerPage', {
            uri: 'https://i.ibb.co/KKRRYff/index.jpg',
          });
        }}>
        <Image
          source={{
            uri: 'https://i.ibb.co/KKRRYff/index.jpg',
          }}
          style={style.imageStyle}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigate.navigate('ScannerPage', {
            uri: 'https://media.cnn.com/api/v1/images/stellar/prod/220818142713-dogs-tears-emotions-wellness-stock.jpg?c=16x9&q=h_720,w_1280,c_fill',
          });
        }}>
        <Image
          source={{
            uri: 'https://media.cnn.com/api/v1/images/stellar/prod/220818142713-dogs-tears-emotions-wellness-stock.jpg?c=16x9&q=h_720,w_1280,c_fill',
          }}
          style={style.imageStyle}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    height: 250,
    width: 250,
    marginBottom: 50,
    borderRadius: 12,
  },
});

export default OnScreenQRReader;
