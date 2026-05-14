import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Display } from './src/components/Display';
import { Keypad } from './src/components/Keypad';
import { useCalculator } from './src/hooks/useCalculator';

export default function App() {
  const { mainText, subText, handlePress } = useCalculator();

  return (
    <View style={styles.container}>
      {/* ディスプレイ領域 */}
      <View style={styles.displayWrapper}>
        <Display subText={subText} mainText={mainText} />
      </View>

      {/* キーボード領域 */}
      <Keypad onPress={handlePress} />

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
});
