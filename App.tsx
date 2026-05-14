import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Display } from './src/components/Display';
import { CalcButton } from './src/components/CalcButton';

export default function App() {
  const [mainText, setMainText] = useState('0');
  const [subText, setSubText] = useState('');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isNewInput, setIsNewInput] = useState(false);

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second !== 0 ? first / second : 0;
      default:
        return second;
    }
  };

  const handleNumberPress = (num: string) => {
    setMainText((prev) => {
      const next = prev === '0' || isNewInput ? num : prev + num;
      if (operator && previousOperand !== null) {
        setSubText(`${previousOperand} ${operator} ${next}`);
      } else {
        setSubText(next);
      }
      setIsNewInput(false);
      return next;
    });
  };

  const handleOperatorPress = (op: string) => {
    const current = parseFloat(mainText);

    if (previousOperand === null) {
      setPreviousOperand(mainText);
      setOperator(op);
      setSubText(`${mainText} ${op}`);
      setIsNewInput(true);
    } else if (operator) {
      const result = calculate(parseFloat(previousOperand), current, operator);
      const resultStr = result.toString();
      setPreviousOperand(resultStr);
      setOperator(op);
      setMainText(resultStr);
      setSubText(`${resultStr} ${op}`);
      setIsNewInput(true);
    }
  };

  const handleEqualPress = () => {
    if (previousOperand === null || operator === null) return;

    const current = parseFloat(mainText);
    const result = calculate(parseFloat(previousOperand), current, operator);
    const resultStr = result.toString();

    setSubText(''); // イコール時はサブテキストをクリア
    setMainText(resultStr);
    setPreviousOperand(null);
    setOperator(null);
    setIsNewInput(true);
  };

  const handleDotPress = () => {
    let next: string;
    if (isNewInput) {
      next = '0.';
      setMainText(next);
      setIsNewInput(false);
    } else {
      if (mainText.includes('.')) return;
      next = mainText + '.';
      setMainText(next);
    }

    if (operator && previousOperand !== null) {
      setSubText(`${previousOperand} ${operator} ${next}`);
    } else {
      setSubText(next);
    }
  };

  const handleClear = () => {
    setMainText('0');
    setSubText('');
    setPreviousOperand(null);
    setOperator(null);
    setIsNewInput(false);
  };

  const handlePress = (val: string) => {
    if (/[0-9]/.test(val)) {
      handleNumberPress(val);
    } else if (['+', '-', '×', '÷'].includes(val)) {
      handleOperatorPress(val);
    } else if (val === '=') {
      handleEqualPress();
    } else if (val === '.') {
      handleDotPress();
    } else if (val === 'C') {
      handleClear();
    } else {
      console.log('Pressed other:', val);
    }
  };

  return (
    <View style={styles.container}>
      {/* ディスプレイ領域 */}
      <View style={styles.displayWrapper}>
        <Display subText={subText} mainText={mainText} />
      </View>

      {/* キーボード領域 */}
      <View style={styles.keypadGrid}>
        <View style={styles.row}>
          <CalcButton title="C" onPress={() => handlePress('C')} type="action" />
          <CalcButton title="±" onPress={() => handlePress('±')} type="operator" />
          <CalcButton title="%" onPress={() => handlePress('%')} type="operator" />
          <CalcButton title="÷" onPress={() => handlePress('÷')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton title="7" onPress={() => handlePress('7')} />
          <CalcButton title="8" onPress={() => handlePress('8')} />
          <CalcButton title="9" onPress={() => handlePress('9')} />
          <CalcButton title="×" onPress={() => handlePress('×')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton title="4" onPress={() => handlePress('4')} />
          <CalcButton title="5" onPress={() => handlePress('5')} />
          <CalcButton title="6" onPress={() => handlePress('6')} />
          <CalcButton title="-" onPress={() => handlePress('-')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton title="1" onPress={() => handlePress('1')} />
          <CalcButton title="2" onPress={() => handlePress('2')} />
          <CalcButton title="3" onPress={() => handlePress('3')} />
          <CalcButton title="+" onPress={() => handlePress('+')} type="operator" />
        </View>
        <View style={styles.row}>
          <CalcButton title="0" onPress={() => handlePress('0')} isZero />
          <CalcButton title="." onPress={() => handlePress('.')} />
          <CalcButton title="=" onPress={() => handlePress('=')} type="operator" />
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2937', // 電卓全体の背景色
  },
  displayWrapper: {
    flex: 1,
    paddingTop: 60, // ステータスバー領域の確保
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
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
