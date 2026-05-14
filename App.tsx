import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { Display } from './src/components/Display';
import { Keypad } from './src/components/Keypad';
import { useCalculator } from './src/hooks/useCalculator';

export default function App() {
  const { mainText, subText, handlePress } = useCalculator();

  return (
    <View style={styles.container}>
      {/* ロゴ領域 */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

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
  logoContainer: {
    paddingTop: 60, // ステータスバーを考慮した余白
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 50,
  },
  displayWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
});
