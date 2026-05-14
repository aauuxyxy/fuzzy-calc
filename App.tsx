/**
 * Fuzzy Calc - メインアプリケーションエントリーポイント
 *
 * Issue #6: プロジェクトの初期化に伴い生成された初期ファイルです。
 * 今後、ここにナビゲーションやメイン画面のコンポーネントが組み込まれます。
 */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
