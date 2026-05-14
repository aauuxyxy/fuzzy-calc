import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TooltipProps {
  message: string;
  visible: boolean;
}

/**
 * ツールチップ（吹き出し）コンポーネント
 * 画面中央にオーバーレイ表示される安定したデザイン
 */
export const Tooltip: React.FC<TooltipProps> = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  bubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#4b5563',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
