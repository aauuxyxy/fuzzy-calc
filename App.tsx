import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Display } from './src/components/Display';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* 動作確認用のダミーデータをDisplayに渡す */}
      <View style={styles.displayContainer}>
        <Display subText="12 + 34 =" mainText="46" />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // アプリ全体の背景を黒にしてディスプレイと馴染ませる
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-start', // 上部に配置
    paddingTop: 50,
  },
});
