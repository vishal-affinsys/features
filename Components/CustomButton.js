import React from 'react';
import {Pressable, Text, StyleSheet, Animated} from 'react-native';

export default ({title, btnStyle, btnText, rippleColor, onPress}) => {
  const animation = React.useRef(new Animated.Value(1)).current;
  const bounceAnimation = value =>
    Animated.spring(animation, {
      toValue: value,
      friction: 6,
      useNativeDriver: true,
    });
  const mainAnimation = Animated.stagger(50, [
    bounceAnimation(0.7),
    bounceAnimation(1),
  ]);
  return (
    <Animated.View
      style={([style.btnContainer], {transform: [{scale: animation}]})}>
      <Pressable
        android_ripple={{color: rippleColor}}
        style={btnStyle}
        onPress={() => {
          mainAnimation.start(() => {
            mainAnimation.reset();
            onPress();
          });
        }}>
        <Text style={btnText}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  btnContainer: {},
});
