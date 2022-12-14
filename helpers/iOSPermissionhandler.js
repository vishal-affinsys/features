import {check, RESULTS, request} from 'react-native-permissions';

export const accessPermissioniOS = async (permission, methods) => {
  request(permission).then(result => {
    console.log(permission, result);

    check(permission).then(res => {
      switch (res) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
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
    });
  });
};
