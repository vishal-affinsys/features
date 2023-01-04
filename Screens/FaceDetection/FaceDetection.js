import * as React from 'react';
import {runOnJS} from 'react-native-reanimated';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {StyleSheet, View, Text, Dimensions, Image, Easing} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {Svg, Path} from 'react-native-svg';
import {Camera} from 'react-native-vision-camera';
import {scanFaces} from 'vision-camera-face-detector';

const PREVIEW_MARGIN_TOP = 50;
const PREVIEW_SIZE = 310;
const {width: windowWidth} = Dimensions.get('window');

const detections = {
  BLINK: {promptText: 'Blink both eyes', minProbability: 0.4},
  TURN_HEAD_LEFT: {promptText: 'Turn head left', maxAngle: 7.5},
  TURN_HEAD_RIGHT: {promptText: 'Turn head right', minAngle: -7.5},
  NOD: {promptText: 'Nod', minDiff: 1},
  SMILE: {promptText: 'Smile', minProbability: 0.7},
  completed: 'Done !!',
};

const actions = {
  FACE_DETECTED: 'FACE DETECTED\n',
  BLINK: 'You are blinking',
  TURN_HEAD_LEFT: "What's on left",
  TURN_HEAD_RIGHT: 'Looking right',
  NOD: 'nodding',
  SMILE: 'Your smile is cute :)',
};

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [faces, setFaces] = React.useState([]);
  const [faceDetected, setFaceDetected] = React.useState();
  const [completion, setCompletion] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);

  const devices = useCameraDevices();
  const device = devices.front;
  const rect = React.useRef(null);

  const drawFaceRect = face => {
    rect.current?.setNativeProps({
      width: face.bounds.width,
      height: face.bounds.height,
      top: face.bounds.y - face.bounds.height,
      left: face.bounds.x - face.bounds.width,
    });
  };
  const detect = React.useCallback(() => {
    const detectAction = face => {
      let ans = '';
      if (faces !== undefined && faces.length !== 0) {
        setFaceDetected(true);
      } else {
        setFaceDetected(false);
      }
      const leftEyeClosed =
        face.leftEyeOpenProbability <= detections.BLINK.minProbability;
      const rightEyeClosed =
        face.rightEyeOpenProbability <= detections.BLINK.minProbability;
      if (leftEyeClosed && rightEyeClosed && completion === 0) {
        ans += actions.BLINK;
        setCompletion(1);
      } else if (
        face.yawAngle >= detections.TURN_HEAD_LEFT.maxAngle &&
        completion === 1
      ) {
        ans += actions.TURN_HEAD_LEFT;
        setCompletion(2);
      } else if (
        face.yawAngle <= detections.TURN_HEAD_RIGHT.minAngle &&
        completion === 2
      ) {
        ans += actions.TURN_HEAD_RIGHT;
        setCompletion(3);
      } else if (
        face.smilingProbability >= detections.SMILE.minProbability &&
        completion === 3
      ) {
        ans += actions.SMILE;
        setCompletion(4);
      } else {
        ans += '';
      }
      if (completion === 4) {
        setIsActive(false);
      }
      return ans;
    };
    detectAction(faces[0]);
  }, [faces, completion]);

  const askUser = value => {
    if (faceDetected) {
      switch (value) {
        case 0:
          return detections.BLINK.promptText;
        case 1:
          return detections.TURN_HEAD_LEFT.promptText;
        case 2:
          return detections.TURN_HEAD_RIGHT.promptText;
        case 3:
          return detections.SMILE.promptText;
        case 4:
          return detections.completed;
        default:
          return '';
      }
    } else {
      return 'No face detected';
    }
  };

  var x = React.useRef(true);
  React.useEffect(() => {
    if (x.current && faces !== undefined && faces.length !== 0) {
      console.log(JSON.stringify(faces, null, 2));
      x.current = false;
    }
    if (faces !== undefined && faces.length !== 0) {
      drawFaceRect(faces[0]);
      detect();
    }
  }, [faces, detect]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  }, []);

  return device != null && hasPermission ? (
    <View style={style.body}>
      {isActive ? (
        <View>
          <Camera
            style={style.cameraView}
            device={device}
            isActive={isActive}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          <AnimatedCircularProgress
            size={PREVIEW_SIZE}
            width={8}
            style={style.animatedCircle}
            fill={completion * 25}
            easing={Easing.circle}
            duration={1000}
            tintColor="#00aa00"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="transparent"
          />
        </View>
      ) : (
        <View style={style.doneContainer}>
          <Image
            source={{
              uri: 'https://media.tenor.com/0AVbKGY_MxMAAAAC/check-mark-verified.gif',
            }}
            style={style.gifStyle}
          />
        </View>
      )}

      <View style={style.top} />
      <View style={style.left} />
      <View style={style.right} />
      <View style={style.rect} />
      <CameraPreviewMask width={'100%'} style={style.circularProgress} />

      <View style={style.promptContainer}>
        <Text style={style.textStyle}>{askUser(completion)}</Text>
      </View>
    </View>
  ) : null;
}

const CameraPreviewMask = props => (
  <Svg
    width={PREVIEW_SIZE}
    height={PREVIEW_SIZE}
    viewBox="0 0 300 300"
    fill="none"
    {...props}>
    <Path
      d="M150 0H0v300h300V0H150zm0 0c82.843 0 150 67.157 150 150s-67.157 150-150 150S0 232.843 0 150 67.157 0 150 0z"
      fill="#fff"
    />
  </Svg>
);

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  top: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: PREVIEW_MARGIN_TOP,
    backgroundColor: 'white',
    zIndex: 10,
  },
  left: {
    position: 'absolute',
    top: PREVIEW_MARGIN_TOP,
    left: 0,
    width: (windowWidth - PREVIEW_SIZE) / 2,
    height: PREVIEW_SIZE,
    backgroundColor: 'white',
    zIndex: 10,
  },
  right: {
    position: 'absolute',
    top: PREVIEW_MARGIN_TOP,
    right: 0,
    width: (windowWidth - PREVIEW_SIZE) / 2 + 1,
    height: PREVIEW_SIZE,
    backgroundColor: 'white',
    zIndex: 10,
  },
  cameraView: {
    width: windowWidth,
    height: PREVIEW_SIZE,
    padding: 4,
    position: 'absolute',
    top: PREVIEW_MARGIN_TOP,
  },
  circularProgress: {
    position: 'absolute',
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    top: PREVIEW_MARGIN_TOP,
    alignSelf: 'center',
  },
  rect: {
    width: windowWidth,
    height: PREVIEW_MARGIN_TOP,
  },
  promptContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  animatedCircle: {
    alignSelf: 'center',
    top: PREVIEW_MARGIN_TOP,
  },
  doneContainer: {
    top: PREVIEW_MARGIN_TOP,
    backgroundColor: 'tomato',
    height: 300,
    width: 300,
    alignSelf: 'center',
    borderRadius: 150,
  },
  gifStyle: {
    height: 300,
    width: 300,
    borderRadius: 150,
  },
});
