import React from 'react';
import { StyleSheet, View } from 'react-native';
//res
import cs from '../constants/Layout';

const { window } = cs;

type Props = {
  horizontal?: boolean;
  bordered?: boolean;
  sm?: boolean;
};

export default function Divider({ horizontal, bordered, sm }: Props) {
  if (horizontal) {
    return (
      <View
        style={[
          bordered ? styles.dividerHorizontalLine : styles.dividerHorizontal,
          sm && { width: 10 },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        bordered ? styles.dividerVerticalLine : styles.dividerVertical,
        sm && { height: 10 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dividerVertical: {
    width: '100%',
    height: 20,
  },
  dividerVerticalLine: {
    width: '100%',
    height: 20,
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 1,
  },
  dividerHorizontal: {
    width: 20,
    height: 'auto',
  },
  dividerHorizontalLine: {
    width: 20,
    height: 'auto',
    borderRightColor: 'rgba(255,255,255,0.3)',
    borderRightWidth: 1,
  },
});
