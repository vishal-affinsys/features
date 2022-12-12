import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  Button,
  Text,
  FlatList,
} from 'react-native';

const requestSMSPermission = async () => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    PermissionsAndroid.PERMISSIONS.READ_SMS,
    PermissionsAndroid.PERMISSIONS.SEND_SMS,
  ]);

  console.log(granted);
};

const SMSReader = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState([]);

  var eventListener = useRef();

  useFocusEffect(
    React.useCallback(() => {
      requestSMSPermission();
      const eventEmitter = new NativeEventEmitter(NativeModules.SMSReader);
      eventListener.current = eventEmitter.addListener('SMSReceiver', data => {
        console.log(data);
        setMessage(previous => [...previous, JSON.stringify(data)]);
      });
    }, []),
  );

  useEffect(() => {
    return () => {
      eventListener.current.remove();
    };
  });

  return (
    <View style={style.body}>
      <View style={style.bodyTextContainer}>
        <Text style={style.textStyle}>SMS Reader Screen</Text>
      </View>
      <FlatList
        data={message}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
      <Button
        onPress={() => {
          eventListener.current.remove();
          navigation.navigate('SMSReaderWeb');
        }}
        title="Web"
      />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
  },
  bodyTextContainer: {
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'OpenSansHebrew-Regular',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SMSReader;
