import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ErrorHandler = ({route}) => {
  return (
    <View style={style.body}>
      <Text style={style.textStyle}>{route.params.message}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ErrorHandler;
