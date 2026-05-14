import { useState } from 'react';

export const useCalculator = () => {
  const [mainText, setMainText] = useState('0');
  const [subText, setSubText] = useState('');
  const [isNewInput, setIsNewInput] = useState(false);

  // 簡易的な数式評価関数
  const evaluateExpression = (expr: string): string => {
    try {
      // 演算子記号をJavaScriptで評価可能な形式に変換
      const sanitizedExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
      // 安全のため、数値と四則演算子以外の文字を除去
      // eslint-disable-next-line no-useless-escape
      if (/[^0-9.+\-*/\s]/.test(sanitizedExpr)) return 'Error';

      // eslint-disable-next-line no-eval
      const result = eval(sanitizedExpr);

      if (!isFinite(result)) return 'Error';

      // 浮動小数点の計算誤差対策（例: 0.1 + 0.2）
      // 小数点第10位までに丸める
      const roundedResult = Math.round(result * 1e10) / 1e10;
      return roundedResult.toString();
    } catch (e) {
      return 'Error';
    }
  };

  const handleNumberPress = (num: string) => {
    setMainText((prev) => {
      const nextMain = prev === '0' || isNewInput ? num : prev + num;

      setSubText((prevSub) => {
        if (!prevSub || prevSub === '0' || isNewInput) {
          const parts = prevSub.split(' ');
          const lastPart = parts[parts.length - 1];
          if (/[0-9.]/.test(lastPart) && !isNewInput) {
            parts[parts.length - 1] = nextMain;
            return parts.join(' ');
          }
          return prevSub === '' || prevSub === '0' ? num : `${prevSub}${num}`;
        }
        return prevSub + num;
      });

      setIsNewInput(false);
      return nextMain;
    });
  };

  const handleOperatorPress = (op: string) => {
    setSubText((prevSub) => {
      const trimmed = prevSub.trim();
      if (trimmed === '') return `0 ${op} `;
      if (/[+\-*/×÷]$/.test(trimmed)) {
        return `${trimmed.slice(0, -1)} ${op} `;
      }
      return `${trimmed} ${op} `;
    });
    setIsNewInput(true);
  };

  const handleEqualPress = () => {
    if (subText.trim() === '') return;

    const result = evaluateExpression(subText);
    setMainText(result);
    setSubText('');
    setIsNewInput(true);
  };

  const handleDotPress = () => {
    if (mainText.includes('.') && !isNewInput) return;

    const nextMain = isNewInput ? '0.' : `${mainText}.`;
    setMainText(nextMain);

    setSubText((prevSub) => {
      if (isNewInput || prevSub === '') return `${prevSub}0.`;
      return `${prevSub}.`;
    });
    setIsNewInput(false);
  };

  const handleClear = () => {
    setMainText('0');
    setSubText('');
    setIsNewInput(false);
  };

  const handlePress = (val: string) => {
    if (/[0-9]/.test(val)) {
      handleNumberPress(val);
    } else if (['+', '-', '×', '÷'].includes(val)) {
      handleOperatorPress(val);
    } else if (val === '=') {
      handleEqualPress();
    } else if (val === '.') {
      handleDotPress();
    } else if (val === 'C') {
      handleClear();
    }
  };

  return {
    mainText,
    subText,
    handlePress,
  };
};
