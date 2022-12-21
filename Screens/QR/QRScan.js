import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  Button,
  useWindowDimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {runOnJS} from 'react-native-reanimated';

import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';

const QRScan = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [barcodes, setBarcodes] = React.useState([]);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
  //   checkInverted: true,
  // });

  // Alternatively you can use the underlying function:
  //
  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
      checkInverted: true,
    });
    if (detectedBarcodes.length !== 0) {
      runOnJS(setModalVisible)(false);
    }
    runOnJS(setBarcodes)(detectedBarcodes);
  }, []);

  const {width, height} = useWindowDimensions();

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={'auto'}
            />
            <View
              style={{
                ...styles.scannerBox,
                width: Math.min(width * 0.7, height * 0.7),
                top: height * 0.16,
              }}
            />
          </>
        </Modal>
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))}
        <Button
          title="Scan"
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  scannerBox: {
    aspectRatio: 1,

    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    borderStyle: 'dashed',
    position: 'absolute',
  },
  body: {
    flex: 1,
  },
});

export default QRScan;
