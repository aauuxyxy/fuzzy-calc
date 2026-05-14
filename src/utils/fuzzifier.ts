import phrases from '../assets/phrases.json';
import { FuzzyResult } from '../types/calculator';

/**
 * 正確な計算結果を「曖昧な結果」に変換するユーティリティ
 *
 * @param result 正確な計算結果（数値またはエラー文字列）
 * @returns 曖昧化された結果オブジェクト
 */
export const fuzzify = (result: string | number): FuzzyResult => {
  if (result === 'Error') {
    return {
      displayText: '計算不能です...たぶん。',
      realValue: NaN,
      isFuzzy: true,
    };
  }

  const numericValue = typeof result === 'string' ? parseFloat(result) : result;
  
  // 2桁以上（10以上）の場合のみ曖昧化する
  const isFuzzy = Math.abs(numericValue) >= 10;

  if (!isFuzzy) {
    return {
      displayText: numericValue.toString(),
      realValue: numericValue,
      isFuzzy: false,
    };
  }

  // --- 曖昧化ロジック ---
  // 1. 数値をわずかにずらす (±3% 〜 7% の範囲)
  const offsetPercent = (Math.random() * 4 + 3) * (Math.random() > 0.5 ? 1 : -1);
  const fuzzyValue = Math.round(numericValue * (1 + offsetPercent / 100));

  // 2. phrases.json からランダムにテンプレートを選択して適用
  const { templates } = phrases;
  const template = templates[Math.floor(Math.random() * templates.length)];
  const displayText = template.replace('{result}', fuzzyValue.toString());

  return {
    displayText,
    realValue: numericValue,
    isFuzzy: true,
  };
};
