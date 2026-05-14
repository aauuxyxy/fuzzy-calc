import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Display } from './src/components/Display';
import { CalcButton } from './src/components/CalcButton';

export default function App() {
  const handlePress = (val: string) => {
    // 動作確認用のダミー関数
    console.log('Pressed:', val);
  };

  return (
    <View style={styles.container}>
      {/* ディスプレイ領域 */}
      <View style={styles.displayWrapper}>
        <Display subText="100 + 100 =" mainText="200くらいじゃないですかね、知らんけど" />
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
