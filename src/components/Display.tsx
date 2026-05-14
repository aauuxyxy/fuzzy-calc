import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface DisplayProps {
  /**
   * 上部に表示されるサブテキスト（計算途中の式など）
   */
  subText?: string;
  /**
   * 下部に表示されるメインテキスト（現在の入力値や結果）
   */
  mainText: string;
}

/**
 * 計算機のディスプレイUIコンポーネント
 *
 * Issue #9: 基礎UIコンポーネント (Display)
 */
export const Display: React.FC<DisplayProps> = ({ subText = '', mainText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subText} numberOfLines={1} adjustsFontSizeToFit>
        {subText}
      </Text>
      <Text style={styles.mainText} numberOfLines={2} adjustsFontSizeToFit>
        {mainText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24, // 余白を広めに
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1, // 親要素の中で広がるようにする
  },
  subText: {
    color: '#9ca3af',
    fontSize: 24, // さらに大きく
    marginBottom: 8,
  },
  mainText: {
    color: '#f3f4f6',
    fontSize: 64, // 画面幅いっぱいを想定して大きく
    fontWeight: 'bold',
  },
});
