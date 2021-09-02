import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useMutation } from 'react-query';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootState, useAppDispatch } from '../../redux/store';
//constants
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
//api
import api from '../../redux/api';
//types
import { SignInProps } from '../../redux/types/auth.type';
//actions
import { save } from '../../redux/slices/user.slice';
import { show } from '../../redux/slices/loading.slice';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../redux/types/navigation.type';
import Input from '../../components/Input';

const initState = {
  username: 'superadmin@gmail.com',
  password: 'Super0000',
  grant_type: 'password',
  provider_id: Date.now().toString(),
};

interface Props {
  route: StackNavigationProp<MainStackParamList, 'Auth'>;
}

export default function SignInScreen({ route }: Props) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const mutation = useMutation(api.account.signIn);
  const { user } = useSelector((state: RootState) => state);
  //state
  const [state, setState] = useState<SignInProps>(initState);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (mutation.isSuccess) {
      dispatch(show());
      const payload = {
        ...mutation.data,
        username: state.username,
      };
      timeout = setTimeout(() => dispatch(save(payload)), 500);
    }

    return () => clearTimeout(timeout);
  }, [mutation]);

  useFocusEffect(
    useCallback(() => {
      return () => mutation.reset();
    }, [])
  );

  function _onCloseKeyboard() {
    Keyboard.dismiss();
  }

  function _onChange(key: keyof SignInProps, val: string) {
    setState((prev) => ({ ...prev, [key]: val }));
  }

  function _onSignIn() {
    Keyboard.dismiss();
    mutation.mutate(state);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Pressable style={styles.container} onPress={_onCloseKeyboard}>
        <View style={styles.contentWrap}>
          <View style={styles.wrap}>
            <View>
              <Text style={styles.heading}>Hesaba giriş</Text>
            </View>
            <Input
              placeholder="Email"
              type="email-address"
              value={state.username}
              onChangeText={(val: string) => _onChange('username', val)}
            />
            <Input
              placeholder="Password"
              type="default"
              value={state.password}
              secure={true}
              icon="eye-off"
              eyeIcon={true}
              onChangeText={(val: string) => _onChange('password', val)}
            />
            <View style={styles.enterWrap}>
              <Button text="Daxil ol" onPress={_onSignIn} disabled={mutation.isLoading} />
              {mutation.isError ? (
                <View style={styles.errorWrap}>
                  <Text style={styles.errorText}>Error</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.container,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  contentWrap: {
    position: 'relative',
    width: '80%',
    maxWidth: 500,
  },
  wrap: {
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#8b8b8b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 1,
  },
  enterWrap: {
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorWrap: {
    borderRadius: 4,
    padding: 5,
    backgroundColor: 'tomato',
    shadowColor: '#8b8b8b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.84,
    elevation: 1,
  },
  errorText: {
    marginHorizontal: 10,
    marginVertical: 5,
    color: '#f5f5f5',
  },
});
