import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Display } from './src/components/Display';
import { CalcButton } from './src/components/CalcButton';

export default function App() {
  const [mainText, setMainText] = useState('0');
  const [subText, setSubText] = useState('');
  const [isNewInput, setIsNewInput] = useState(false);

  // 簡易的な数式評価関数
  const evaluateExpression = (expr: string): string => {
    try {
      // 演算子記号をJavaScriptで評価可能な形式に変換
      const sanitizedExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
      // 安全のため、数値と四則演算子以外の文字を除去
      if (/[^0-9.+\-*/\s]/.test(sanitizedExpr)) return 'Error';

      // eslint-disable-next-line no-eval
      const result = eval(sanitizedExpr);
      return result.toString();
    } catch (e) {
      return 'Error';
    }
  };

  const handleNumberPress = (num: string) => {
    setMainText((prev) => {
      const nextMain = prev === '0' || isNewInput ? num : prev + num;

      // subTextの更新：最後の項を新しい入力に置き換える
      setSubText((prevSub) => {
        if (!prevSub || prevSub === '0' || isNewInput) {
          // 演算子直後または初期状態なら、現在の式に連結または新しい項を開始
          const parts = prevSub.split(' ');
          const lastPart = parts[parts.length - 1];
          if (/[0-9.]/.test(lastPart) && !isNewInput) {
            parts[parts.length - 1] = nextMain;
            return parts.join(' ');
          }
          return prevSub === '' || prevSub === '0' ? num : `${prevSub}${num}`;
        }
        return prevSub + num;
      });

      setIsNewInput(false);
      return nextMain;
    });
  };

  const handleOperatorPress = (op: string) => {
    // 既に演算子で終わっている場合は置換、そうでなければ追加
    setSubText((prevSub) => {
      const trimmed = prevSub.trim();
      if (trimmed === '') return `0 ${op} `;
      if (/[+-\/×÷]$/.test(trimmed)) {
        return `${trimmed.slice(0, -1)} ${op} `;
      }
      return `${trimmed} ${op} `;
    });
    setIsNewInput(true);
  };

  const handleEqualPress = () => {
    if (subText.trim() === '') return;

    const result = evaluateExpression(subText);
    setMainText(result);
    setSubText('');
    setIsNewInput(true);
  };

  const handleDotPress = () => {
    if (mainText.includes('.') && !isNewInput) return;

    const nextMain = isNewInput ? '0.' : `${mainText}.`;
    setMainText(nextMain);

    setSubText((prevSub) => {
      if (isNewInput || prevSub === '') return `${prevSub}0.`;
      return `${prevSub}.`;
    });
    setIsNewInput(false);
  };

  const handleClear = () => {
    setMainText('0');
    setSubText('');
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
