import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultTheme, useTheme} from 'styled-components';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useAuth} from '../contexts/auth';
import { EditProfile } from '../screens/app/EditProfile';
import { Explorer } from '../screens/app/Explorer';
import { Feed } from '../screens/app/Feed';
import { LocaleDetails } from '../screens/app/LocalDetails';
import { Notifications } from '../screens/app/Notifications';
import { PostDetails } from '../screens/app/PostDetails';
import { RoadMapDetails } from '../screens/app/RoadMapDetails';
import { SavedTrip } from '../screens/app/SavedTrip';
import { RoadMap } from '../screens/app/SavedTrip/RoadMap';
import {Profile} from '../screens/app/Profile';

import { SelectedMedia } from '../screens/app/NewPost/SelectedMedia';
import { Camera } from '../screens/app/NewPost/Camera';
import { ContinueTrip } from '../screens/app/NewPost/ContinueTrip';
import { PreviewImageAndAddInformation } from '../screens/app/NewPost/PreviewImageAndAddInformation';

const Top = createMaterialTopTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabScreenOptions = {
  headerShown: false,
};

const stackScreenOptions = {
  headerShown: false,
};

const getTopTabBarIcon = (iconName: string, color: string) => {
  return <Feather name={iconName} size={20} color={color} />;
};

function FeedStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Seguindo"
      screenOptions={stackScreenOptions}>
      <Stack.Screen name="FeedTopTabScreen" component={FeedTopTabScreen} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="RoadMapDetails" component={RoadMapDetails} />
      <Stack.Screen name="LocaleDetails" component={LocaleDetails} />
    </Stack.Navigator>
  );
}

function FeedTopTabScreen() {
  const theme = useTheme();
  return (
    <Top.Navigator
      initialRouteName="Seguindo"
      screenOptions={() => ({
        tabBarActiveTintColor: theme.colors.background,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarIndicator: () => null,

        tabBarStyle: {
          height: 80,
          justifyContent: 'flex-end',
          backgroundColor: theme.colors.primary,
          // borderBottomEndRadius: theme.metrics.fullRadius,
          //borderBottomStartRadius: theme.metrics.fullRadius,
        },
      })}>
      {/*  <Top.Screen
        name="Logout"
        component={FeedStackScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => (
            <Image source={require('../assets/images/icon/icon.png')} />
          ),
          tabBarLabel: () => null, // oculta o texto na tabBar
        }}
      /> */}
      <Top.Screen name="Seguindo" component={Feed} />
      <Top.Screen name="Explorar" component={Explorer} />
      {/*   <Top.Screen
        name="Mensagens"
        component={Feed}
        options={{
          tabBarIcon: ({color}) => getTopTabBarIcon('message-circle', color),
          tabBarLabel: () => null, // oculta o texto na tabBar
        }}
      /> */}
    </Top.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="SavedTrip" component={SavedTrip} />
      <Stack.Screen name="RoadMap" component={RoadMap} />
    </Stack.Navigator>
  );
}

const ProfileScreenRightButton = () => {
  const {signOut} = useAuth();
  return (
    <TouchableOpacity onPress={signOut}>
      <Feather name="log-out" size={20} />
    </TouchableOpacity>
  );
};

function ProfileStackScreen() {
  const {user} = useAuth();
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyProfile"
        component={Profile}
        initialParams={{userCuid: user?.user.cuid}}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerRight: ProfileScreenRightButton,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerBackVisible: false,
          headerRight: ProfileScreenRightButton,
        }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function PublishStackScreen() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="SelectedMedia" component={SelectedMedia} />
      <Stack.Screen
        name="PreviewImageAndAddInformation"
        component={PreviewImageAndAddInformation}
      />
      <Stack.Screen name="ContinueTrip" component={ContinueTrip} />
    </Stack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
    </Stack.Navigator>
  );
}

const getTabBarIcon = (
  routeName: string,
  color: string,
  size: number,
  theme: DefaultTheme,
  focused: boolean,
) => {
  let iconName = 'home';
  if (routeName === 'FeedTopTabScreen') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'SearchStackScreen') {
    iconName = focused ? 'bookmark' : 'bookmark-outline';
  } else if (routeName === 'PublishStackScreen') {
    return (
      <MaterialCommunityIcons
        name={'plus-circle'}
        size={50}
        color={theme.colors.primary}
      />
    );
  } else if (routeName === 'NotificationsStackScreen') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (routeName === 'ProfileStackScreen') {
    iconName = focused ? 'account' : 'account-outline';
  }

  return (
    <MaterialCommunityIcons
      name={iconName}
      size={size}
      color={focused ? theme.colors.primary : color}
    />
  );
};

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(route.name, color, size, theme, focused),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.border,
        tabBarLabel: () => null,
        tabBarStyle: {
          height: theme.metrics.tabBarHeight,
          //borderTopEndRadius: theme.metrics.fullRadius,
          //borderTopStartRadius: theme.metrics.fullRadius,
          //backgroundColor: theme.colors.card,
        },
      })}>
      <Tab.Screen
        name="FeedStackScreen"
        component={FeedStackScreen}
        options={{
          ...tabScreenOptions,
        }}
      />
      <Tab.Screen
        name="SearchStackScreen"
        component={SearchStackScreen}
        options={tabScreenOptions}
      />
      <Tab.Screen
        name="PublishStackScreen"
        component={PublishStackScreen}
        options={tabScreenOptions}
      />
      <Tab.Screen
        name="NotificationsStackScreen"
        component={NotificationsStackScreen}
        options={tabScreenOptions}
      />
      <Tab.Screen
        name="ProfileStackScreen"
        component={ProfileStackScreen}
        options={tabScreenOptions}
      />
    </Tab.Navigator>
  );
}
