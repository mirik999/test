import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveInAsyncStorage(key: string, value: any) {
  try {
    await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
  } catch (e) {
    console.log('could not save in async storage key => ', key);
  }
}

export async function getFromAsyncStorage(key: string): Promise<any> {
  try {
    const strValue = await AsyncStorage.getItem(`@${key}`);
    if (strValue) {
      return JSON.parse(strValue);
    }
  } catch (e) {
    console.log('could not read key =>', key);
  }
}

export async function removeFromAsyncStorage(key: string) {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    console.log('could not remove key =>', key);
  }
}

export async function clearAsyncStorage() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log('could not clear storage');
  }
}
