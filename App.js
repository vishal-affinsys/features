import React from 'react';
import {
  Homescreen,
  SMSReader,
  SMSReaderWeb,
  BiometricReader,
  BiometricReaderWeb,
  ErrorHandler,
  ContactReader,
  ContactReaderWeb,
  QRGen,
  QRScan,
  OnScreenQRReader,
  ScannerPage,
  NFCScreen,
} from './Screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './Store/store';
import IosWebview from './Screens/webview_ios';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Homescreen"
            component={Homescreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SMSReader"
            component={SMSReader}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SMSReaderWeb"
            component={SMSReaderWeb}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BioemetricReader"
            component={BiometricReader}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BioemetricReaderWeb"
            component={BiometricReaderWeb}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BiometricError"
            component={ErrorHandler}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContactReader"
            component={ContactReader}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ContactReaderWeb"
            component={ContactReaderWeb}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QRGen"
            component={QRGen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QRScan"
            component={QRScan}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="webview"
            component={IosWebview}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnScreenQRReader"
            component={OnScreenQRReader}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScannerPage"
            component={ScannerPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="NFCScreen"
            component={NFCScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
