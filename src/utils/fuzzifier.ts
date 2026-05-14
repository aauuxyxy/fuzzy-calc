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
  // 1. 桁数の上半分だけを残し、下半分を0に丸める（ランダム要素なし）
  const sign = Math.sign(numericValue);
  const absValue = Math.abs(numericValue);
  const totalDigits = Math.floor(Math.log10(absValue)) + 1;
  
  // 残す桁数を決定（全桁の半分を切り上げで算出。例: 2桁なら1桁、3桁なら2桁残す）
  const digitsToKeep = Math.ceil(totalDigits / 2);
  // 丸める単位を計算（例: 3桁で1桁残すなら 10^(3-1)=100単位）
  const roundUnit = Math.pow(10, totalDigits - digitsToKeep);
  
  const fuzzyValue = Math.floor(absValue / roundUnit) * roundUnit * sign;

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
