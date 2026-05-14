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
    padding: 20,
    backgroundColor: '#1E1E1E', // 暗めの背景（電卓風）
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    minHeight: 140, // ディスプレイの最小高さを確保
  },
  subText: {
    color: '#A0A0A0', // グレー
    fontSize: 24,
    marginBottom: 8,
  },
  mainText: {
    color: '#FFFFFF', // 白
    fontSize: 56,
    fontWeight: 'bold',
  },
});
