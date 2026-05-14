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
    flex: 1, // 横幅を均等に取る
    aspectRatio: 1, // 正方形（円形）を保つ
    borderRadius: 100, // 十分に大きな値で完全な円にする
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonZero: {
    flex: 2.15, // 0ボタンは2列分＋ギャップ分の幅を取るため、少し大きめのflex値を設定（見た目の微調整）
    aspectRatio: undefined, // 円形のアスペクト比を解除
    borderRadius: 100, // カプセル型にする
    alignItems: 'flex-start',
    paddingLeft: 30, // 左寄りにテキストを配置
  },
  text: {
    color: '#f3f4f6',
    fontSize: 28, // 隙間に合わせて少し小さく
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
