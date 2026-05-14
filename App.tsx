import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Display } from './src/components/Display';
import { CalcButton } from './src/components/CalcButton';

export default function App() {
  const handlePress = (val: string) => {
    // 動作確認用のダミー関数
    console.log('Pressed:', val);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* ディスプレイ領域 */}
        <View style={styles.calcContainer}>
          <Display subText="100 + 100 =" mainText="200くらいじゃないですかね、知らんけど" />

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
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6', // プロトタイプの外側の背景色
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcContainer: {
    width: 320,
    backgroundColor: '#1f2937', // 電卓本体の背景色
    borderRadius: 24,
    padding: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Android elevation
    elevation: 5,
  },
  keypadGrid: {
    gap: 12, // 行間のギャップ
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // 列間のギャップ
  },
});
