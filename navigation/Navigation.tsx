import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { MainStackParamList } from '../redux/types/navigation.type';
import { Text, View } from '../components/Themed';
import Constants from 'expo-constants';
import { Alert, Image, TouchableOpacity } from 'react-native';
import ShopListScreen from '../screens/ShopList.screen';
import ScannerScreen from '../screens/Scanner/Scanner.screen';
import ProductListScreen from '../screens/ProductList.screen';
import AuthScreen from '../screens/Authentication/Auth.screen';
import { useDispatch } from 'react-redux';
import { remove } from '../redux/slices/user.slice';

const StackRoot = createStackNavigator<MainStackParamList>();

export function NavigationRoot() {
  return (
    <StackRoot.Navigator
      initialRouteName="ShopList"
      screenOptions={({ route }) => screenOptions(route, true)}
    >
      <StackRoot.Screen name="ShopList" component={ShopListScreen} />
      <StackRoot.Screen name="Scanner" component={ScannerScreen} />
      <StackRoot.Screen name="Products" component={ProductListScreen} />
    </StackRoot.Navigator>
  );
}

const StackAuth = createStackNavigator<MainStackParamList>();

export function NavigationAuth() {
  return (
    <StackAuth.Navigator initialRouteName="Auth" screenOptions={screenOptions}>
      <StackAuth.Screen name="Auth" component={AuthScreen} />
    </StackAuth.Navigator>
  );
}

const screenOptions = (route: any, isUser: boolean | unknown = false): any => {
  const routesWithoutSwipe = ['ExamProcess', 'Exam', 'Result'];
  const enableGesture = !routesWithoutSwipe.includes(route.name);
  return {
    headerStyle: {
      backgroundColor: Colors.light.tint,
      height: Constants.platform?.ios ? 110 : 85,
    },
    headerTintColor: 'white',
    headerLeft: null,
    headerTitle: () => (
      <Image
        source={require('../assets/images/mstock-logo.png')}
        style={{ width: 160, height: 39 }}
      />
    ),
    headerRight: () => (isUser ? <HeaderRightButton /> : null),
    gestureEnabled: false,
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({ current, layouts }: any) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      };
    },
  };
};

function HeaderRightButton() {
  const dispatch = useDispatch();

  function _onLogout() {
    Alert.alert('Çıxış et', 'Hesabdan çıxılsın ?', [
      {
        text: 'Bəli',
        onPress: () => dispatch(remove()),
      },
      {
        text: 'Xeyr',
        onPress: () => false,
      },
    ]);
  }

  return (
    <TouchableOpacity onPress={_onLogout}>
      <View
        style={{
          width: 35,
          height: 35,
          backgroundColor: 'white',
          borderRadius: 20,
          marginRight: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="log-out" size={20} color={'#1875c1'} />
      </View>
    </TouchableOpacity>
  );
}
