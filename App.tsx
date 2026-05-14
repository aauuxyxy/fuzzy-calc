import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Display } from './src/components/Display';
import { Keypad } from './src/components/Keypad';
import { Tooltip } from './src/components/Tooltip';
import { useCalculator } from './src/hooks/useCalculator';
import Logo from './assets/logo.svg';

export default function App() {
  const {
    mainText,
    subText,
    realValue,
    isFuzzy,
    tooltipMessage,
    showTooltip,
    handlePress,
  } = useCalculator();

  return (
    <View style={styles.container}>
      {/* ツールチップ表示（最前面オーバーレイ） */}
      <Tooltip message={tooltipMessage} visible={showTooltip} />

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
    flex: 1.5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#1f2937',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#374151',
  },
  keypadWrapper: {
    flex: 3,
    paddingTop: 20,
  },
});
