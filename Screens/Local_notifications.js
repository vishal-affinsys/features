import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {onDisplayNotification, playSound} from '../helpers/HelperFunctions';
import messaging from '@react-native-firebase/messaging';

const LocalNotifications = () => {
  React.useEffect(() => {
    const getFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log(token);
      } catch (e) {
        console.log(e);
      }
    };
    getFCMToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));
      onDisplayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        payload: remoteMessage.notification.android.imageUrl,
      });
    });

    return unsubscribe;
  });

  return (
    <SafeAreaView style={style.body}>
      <View style={style.body}>
        <TouchableOpacity
          style={style.btnPush}
          activeOpacity={0.7}
          onPress={() => {
            onDisplayNotification({
              title: 'Local notification',
              body: 'Hi, this is your notification body',
            });
          }}>
          <Text style={style.btnText}>Push notification</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.btnPush}
          activeOpacity={0.7}
          onPress={() => {
            playSound();
          }}>
          <Text style={style.btnText}>Trigger sound</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  btnPush: {
    width: 100,
    alignSelf: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#124234',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default LocalNotifications;
