import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DEFAULT_MESSAGE } from '../hooks/useCalculator';

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
  const isDefault = mainText === DEFAULT_MESSAGE;

  return (
    <View style={styles.container}>
      {subText !== '' && (
        <View style={styles.subTextContainer}>
          <Text style={styles.subText} numberOfLines={1} adjustsFontSizeToFit>
            {subText}
          </Text>
        </View>
      )}
      <View style={styles.mainTextContainer}>
        <Text
          style={[styles.mainText, isDefault && styles.defaultMainText]}
          numberOfLines={isDefault ? 1 : 2}
          adjustsFontSizeToFit={!isDefault}
        >
          {mainText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    justifyContent: 'center', // 縦中央に変更
    alignItems: 'flex-end',
    flex: 1,
  },
  subTextContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    marginBottom: 8,
  },
  mainTextContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingVertical: 12,
  },
  subText: {
    color: '#9ca3af',
    fontSize: 24,
  },
  mainText: {
    color: '#f3f4f6',
    fontSize: 64,
    fontWeight: 'bold',
  },
  defaultMainText: {
    color: '#6b7280', // 薄い色
    fontSize: 20, // 小さいサイズ
    fontWeight: 'normal',
  },
});
