/**
 * Fuzzy Calc - ボタンコンポーネント
 *
 * Issue #8: 基礎UIコンポーネントの作成として実装しました。
 * プロトタイプのデザインに合わせ、通常・演算子・アクションの3タイプの色分け、
 * および「0」ボタンなどの横長スタイル（isZero）に対応しています。
 * タップ時の色変化は Pressable の pressed 状態を利用して実現しています。
 */
import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export type ButtonType = 'default' | 'operator' | 'action';

export interface CalcButtonProps {
  title: string;
  onPress: () => void;
  type?: ButtonType;
  isZero?: boolean;
}

export const CalcButton: React.FC<CalcButtonProps> = ({
  title,
  onPress,
  type = 'default',
  isZero = false,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isZero && styles.buttonZero,
        type === 'default' && (pressed ? styles.btnDefaultActive : styles.btnDefault),
        type === 'operator' && (pressed ? styles.btnOperatorActive : styles.btnOperator),
        type === 'action' && (pressed ? styles.btnActionActive : styles.btnAction),
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 60,
    borderRadius: 30, // 50% for 60x60
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZero: {
    flex: 1, // 残りのスペース（2列分）をすべて埋める
    alignItems: 'flex-start',
    paddingLeft: 24, // 左寄せ気味に配置
  },
  text: {
    color: '#f3f4f6',
    fontSize: 24, // 1.5rem 相当
    fontWeight: '500',
  },
  // Default (数字ボタン)
  btnDefault: {
    backgroundColor: '#4b5563',
  },
  btnDefaultActive: {
    backgroundColor: '#6b7280',
  },
  // Operator (演算子ボタン)
  btnOperator: {
    backgroundColor: '#f59e0b',
  },
  btnOperatorActive: {
    backgroundColor: '#fbbf24',
  },
  // Action (Cボタン等)
  btnAction: {
    backgroundColor: '#ef4444',
  },
  btnActionActive: {
    backgroundColor: '#f87171',
  },
});
