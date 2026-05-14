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
  /**
   * 正確な計算結果（隠し表示用）
   */
  realValue?: number | null;
  /**
   * 曖昧化中かどうかのフラグ
   */
  isFuzzy?: boolean;
}

/**
 * 計算機のディスプレイUIコンポーネント
 */
export const Display: React.FC<DisplayProps> = ({
  subText = '',
  mainText,
  realValue = null,
  isFuzzy = false,
}) => {
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

        {/* 吹き出し風の正解表示 (曖昧化中のみ) */}
        {isFuzzy && realValue !== null && (
          <View style={styles.bubbleContainer}>
            <View style={styles.bubbleArrow} />
            <Text style={styles.bubbleText}>本当の数値は {realValue} です</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 24,
    justifyContent: 'center',
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
    textAlign: 'right',
  },
  defaultMainText: {
    color: '#6b7280',
    fontSize: 20,
    fontWeight: 'normal',
  },
  bubbleContainer: {
    backgroundColor: '#3b82f6', // 明るい青
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    maxWidth: '80%',
    // 影の設定
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bubbleArrow: {
    position: 'absolute',
    top: -8,
    right: 15,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#3b82f6',
  },
  bubbleText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
