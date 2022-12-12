import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';

export const accessPermissioniOS = async (permission, methods) => {
  check(permission)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          request(PERMISSIONS.IOS.CONTACTS).then(result => {
            console.log('Permission for camera granted');
            ///TODO: invoke native functions here
            methods();
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
          ///TODO: invoke native functions here
          methods();
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(error => {
      console.log(error);
    });
};
