import {Dimensions, Platform, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

export const metrics = {
  smallMargin: 10,
  baseMargin: 20,
  biggerMargin: 30,
  smallPadding: 4,
  basePadding: 8,
  biggerPadding: 16,
  hugePadding: 24,
  smallRadius: 2,
  baseRadius: 4,
  biggerRadius: 8,
  fullRadius: 20,
  circleRadius: 100,
  smallBorder: 1,
  baseBorder: 2,
  biggerBorder: 4,
  baseElevation: 5,
  baseLineHeight: 20,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  baseWidth: 60,
  bigWidth: 80,
  fullWidth: '100%',
  baseHeight: 60,
  tabBarHeight: 100,
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  statusBarHeight: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
};
