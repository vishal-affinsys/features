import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  FlatList,
  Button,
  SafeAreaView,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const ContactReader = () => {
  const [contactList, setContactList] = useState();
  async function fetchContactsAndroid() {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      },
    );
    console.log(status);
    Contacts.getAll()
      .then(contacts => {
        setContactList(previous => contacts);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async function fetchContactIos() {
    check(PERMISSIONS.IOS.CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CONTACTS).then(result => {
              console.log('Permission for contaacts granted');
              Contacts.getAll()
                .then(contacts => {
                  setContactList(previous => contacts);
                })
                .catch(e => {
                  console.log(e);
                });
            });
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            Contacts.getAll()
              .then(contacts => {
                setContactList(previous => contacts);
              })
              .catch(e => {
                console.log(e);
              });
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <SafeAreaView style={style.body}>
      <View style={style.body}>
        <View style={style.bodyTextContainer}>
          <Text style={style.textStyle}>Contact Reader Screen</Text>
        </View>
        <FlatList
          data={contactList}
          renderItem={({item, index}) => {
            return (
              <View>
                <Text>
                  {JSON.stringify(item.displayName)}
                  {'\n'}
                  {index}
                  {JSON.stringify(item.phoneNumbers, 'id', 5)}
                </Text>
                <Text />
              </View>
            );
          }}
        />
        <Button
          onPress={() => {
            if (Platform.OS === 'android') {
              fetchContactsAndroid();
            } else {
              fetchContactIos();
            }
          }}
          title="fetch"
        />
      </View>
    </SafeAreaView>
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
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ContactReader;
