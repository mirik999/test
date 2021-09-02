import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { getFromAsyncStorage } from '../redux/utils/async-storage.utility';
import { load } from '../redux/slices/user.slice';
import store from '../redux/store';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    let timer: NodeJS.Timer;
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
        // if user exists load
        const user = await getFromAsyncStorage('user');
        user && store.dispatch(load(JSON.parse(user)));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        timer = setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 300);
      }
    }

    loadResourcesAndDataAsync();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isLoadingComplete;
}
