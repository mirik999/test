import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Pressable, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const isIOS = Platform.OS === 'ios';

type Props = {
  placeholder: string;
  type:
    | 'default'
    | 'phone-pad'
    | 'email-address'
    | 'numeric'
    | 'decimal-pad'
    | 'number-pad';
  secure?: boolean;
  icon?: any;
  eyeIcon?: boolean;
  [key: string]: any;
};

const Input: React.FC<Props> = ({
  placeholder,
  type,
  secure,
  icon,
  eyeIcon,
  ...props
}) => {
  const [i, setI] = useState(icon);

  function _onIconPress() {
    if (eyeIcon) {
      i === 'eye' ? setI('eye-off') : setI('eye');
    }
  }

  const hide = secure && i === 'eye-off';

  return (
    <View style={[styles.container, props.styled && { ...props.styled }]}>
      <TextInput
        style={[styles.input, { paddingRight: icon ? 40 : 5 }]}
        keyboardType={type}
        placeholder={placeholder}
        placeholderTextColor="silver"
        secureTextEntry={hide}
        {...props}
      />
      {icon ? (
        <Pressable onPress={_onIconPress} style={styles.eyeIcon}>
          <Ionicons size={16} name={i} color="silver" />
        </Pressable>
      ) : null}
    </View>
  );
};

Input.defaultProps = {
  type: 'default',
  placeholder: '',
  secure: false,
};

export default Input;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    margin: 5,
  },
  labelText: {
    marginBottom: 5,
  },
  input: {
    paddingHorizontal: 10,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#f4f4f4',
    backgroundColor: '#fff',
    color: '#000',
    height: 35,
    fontSize: 12,
  },
  eyeIcon: {
    position: 'absolute',
    top: 3,
    right: 0,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
