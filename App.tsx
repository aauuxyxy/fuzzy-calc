import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Display } from './src/components/Display';
import { Keypad } from './src/components/Keypad';
import { useCalculator } from './src/hooks/useCalculator';
import Logo from './assets/logo.svg';

export default function App() {
  const { mainText, subText, realValue, isFuzzy, handlePress } = useCalculator();

  return (
    <View style={styles.container}>
      {/* ロゴ領域 */}
      <View style={styles.logoContainer}>
        <Logo width={500} height={100} />
      </View>

      {/* ディスプレイ領域 */}
      <View style={styles.displayWrapper}>
        <Display
          subText={subText}
          mainText={mainText}
          realValue={realValue}
          isFuzzy={isFuzzy}
        />
      </View>

      {/* キーボード領域 */}
      <View style={styles.keypadWrapper}>
        <Keypad onPress={handlePress} />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // 全体のベース色
  },
  logoContainer: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  displayWrapper: {
    flex: 1.5, // 表示領域を確保
    paddingHorizontal: 20,
    justifyContent: 'center', // 縦中央
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  keypadWrapper: {
    flex: 3, // キーパッド領域を広めに
    paddingTop: 20,
  },
});
