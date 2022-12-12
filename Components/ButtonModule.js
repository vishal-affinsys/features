import React from 'react';
import {Button} from 'react-native';

const NewModuleButton = ({onPress}) => {
  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
