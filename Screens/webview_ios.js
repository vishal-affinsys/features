import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  LoadingIndicatorView,
  Platform,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import WebView from 'react-native-webview';
import {PERMISSIONS} from 'react-native-permissions';
import {accessPermissioniOS} from '../helpers/iOSPermissionhandler';

const IosWebview = () => {
  const webView = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);
    }
  }, []);

  const HandleBackPressed = () => {
    if (webView.current.canGoBack) {
      webView.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    async function getPermissions() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        console.log(granted);
        return granted;
      } else {
        accessPermissioniOS(PERMISSIONS.IOS.CAMERA, () => {});
        accessPermissioniOS(PERMISSIONS.IOS.LOCATION_ALWAYS, () => {});
        accessPermissioniOS(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, () => {});
      }
    }
    getPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.body}>
        <WebView
          useWebView2={Platform.OS === 'ios'}
          ref={webView}
          onNavigationStateChange={navState => {
            webView.current.canGoBack = navState.canGoBack;
          }}
          source={{uri: 'https://google.com'}}
          geolocationEnabled={true}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          allowFileAccess={true}
          allowsFullscreenVideo={true}
          contentMode="mobile"
          lackPermissionToDownloadMessage="Cannot download as permission was denied"
          downloadingMessage="Downloading"
          domStorageEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default IosWebview;
