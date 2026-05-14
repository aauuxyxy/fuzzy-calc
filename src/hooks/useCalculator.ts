import { useState } from 'react';
import { fuzzify } from '../utils/fuzzifier';
import { DEFAULT_MESSAGE } from '../constants/messages';
import jokePhrases from '../assets/joke_phrases.json';

export const useCalculator = () => {
  const [mainText, setMainText] = useState(DEFAULT_MESSAGE);
  const [subText, setSubText] = useState('');
  const [isNewInput, setIsNewInput] = useState(false);
  
  const [realValue, setRealValue] = useState<number | null>(null);
  const [isFuzzy, setIsFuzzy] = useState(false);

  // ツールチップ用の状態
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const evaluateExpression = (expr: string): string => {
    try {
      const sanitizedExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
      if (/[^0-9.+\-*/\s]/.test(sanitizedExpr)) return 'Error';
      const result = eval(sanitizedExpr);
      if (!isFinite(result)) return 'Error';
      const roundedResult = Math.round(result * 1e10) / 1e10;
      return roundedResult.toString();
    } catch (e) {
      return 'Error';
    }
  };

  const handlePlusMinusPress = () => {
    const { messages } = jokePhrases;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setTooltipMessage(randomMessage);
    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  const handleNumberPress = (num: string) => {
    setMainText((prev) => {
      const nextMain = prev === DEFAULT_MESSAGE || isNewInput ? num : prev + num;
      setSubText((prevSub) => {
        if (!prevSub || prevSub === DEFAULT_MESSAGE || isNewInput) {
          return prevSub === '' || prevSub === DEFAULT_MESSAGE ? num : `${prevSub}${num}`;
        }
        return prevSub + num;
      });
      setIsNewInput(false);
      return nextMain;
    });
    setIsFuzzy(false);
    setRealValue(null);
  };

  const handleOperatorPress = (op: string) => {
    setSubText((prevSub) => {
      const trimmed = prevSub.trim();
      if (trimmed === '' || trimmed === DEFAULT_MESSAGE) return `0 ${op} `;
      if (/[+\-*/×÷]$/.test(trimmed)) {
        return `${trimmed.slice(0, -1)} ${op} `;
      }
      return `${trimmed} ${op} `;
    });
    setIsNewInput(true);
    setIsFuzzy(false);
  };

  const handleEqualPress = () => {
    if (subText.trim() === '') return;
    const exactResult = evaluateExpression(subText);
    const resultObj = fuzzify(exactResult);
    setMainText(resultObj.displayText);
    setRealValue(resultObj.realValue);
    setIsFuzzy(resultObj.isFuzzy);
    setSubText('');
    setIsNewInput(true);
  };

  const handleDotPress = () => {
    if (mainText.includes('.') && !isNewInput) return;
    const nextMain = isNewInput || mainText === DEFAULT_MESSAGE ? '0.' : `${mainText}.`;
    setMainText(nextMain);
    setSubText((prevSub) => {
      if (isNewInput || prevSub === '' || prevSub === DEFAULT_MESSAGE) return '0.';
      return `${prevSub}.`;
    });
    setIsNewInput(false);
    setIsFuzzy(false);
  };

  const handleClear = () => {
    setMainText(DEFAULT_MESSAGE);
    setSubText('');
    setRealValue(null);
    setIsFuzzy(false);
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
    } else if (val === '±') {
      handlePlusMinusPress();
    }
  };

  return {
    mainText,
    subText,
    realValue,
    isFuzzy,
    tooltipMessage,
    showTooltip,
    handlePress,
  };
};
