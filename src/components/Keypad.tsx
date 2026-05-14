import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalcButton } from './CalcButton';

interface KeypadProps {
  onPress: (val: string) => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onPress }) => {
  return (
    <View style={styles.keypadGrid}>
      <View style={styles.row}>
        <CalcButton title="C" onPress={() => onPress('C')} type="action" />
        <CalcButton title="±" onPress={() => onPress('±')} type="operator" />
        <CalcButton title="%" onPress={() => onPress('%')} type="operator" />
        <CalcButton title="÷" onPress={() => onPress('÷')} type="operator" />
      </View>
      <View style={styles.row}>
        <CalcButton title="7" onPress={() => onPress('7')} />
        <CalcButton title="8" onPress={() => onPress('8')} />
        <CalcButton title="9" onPress={() => onPress('9')} />
        <CalcButton title="×" onPress={() => onPress('×')} type="operator" />
      </View>
      <View style={styles.row}>
        <CalcButton title="4" onPress={() => onPress('4')} />
        <CalcButton title="5" onPress={() => onPress('5')} />
        <CalcButton title="6" onPress={() => onPress('6')} />
        <CalcButton title="-" onPress={() => onPress('-')} type="operator" />
      </View>
      <View style={styles.row}>
        <CalcButton title="1" onPress={() => onPress('1')} />
        <CalcButton title="2" onPress={() => onPress('2')} />
        <CalcButton title="3" onPress={() => onPress('3')} />
        <CalcButton title="+" onPress={() => onPress('+')} type="operator" />
      </View>
      <View style={styles.row}>
        <CalcButton title="0" onPress={() => onPress('0')} isZero />
        <CalcButton title="." onPress={() => onPress('.')} />
        <CalcButton title="=" onPress={() => onPress('=')} type="operator" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  keypadGrid: {
    flex: 2,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
