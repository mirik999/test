import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFound.screen';
import { RootStackParamList } from '../redux/types/navigation.type';
import { NavigationRoot, NavigationAuth } from './Navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';

const queryClient = new QueryClient();

export default function NavigationConfig({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user } = useSelector((state: RootState) => state);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.token ? (
        <Stack.Screen name="MainRoot" component={NavigationRoot} />
      ) : (
        <Stack.Screen name="AuthRoot" component={NavigationAuth} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}
