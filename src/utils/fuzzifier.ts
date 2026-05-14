import phrases from '../assets/phrases.json';

/**
 * 正確な計算結果を「適当な一言」に変換するユーティリティ関数
 *
 * @param result 正確な計算結果（数値またはエラー文字列）
 * @returns ファジー化された文字列
 */
export const fuzzify = (result: string | number): string => {
  // 結果がエラーの場合はそのまま返す、または特定のフレーズにする
  if (result === 'Error') {
    return '計算不能です...たぶん。';
  }

  const { templates } = phrases;

  // ランダムにテンプレートを選択
  const randomIndex = Math.floor(Math.random() * templates.length);
  const template = templates[randomIndex];

  // {result} プレースホルダーを置換
  return template.replace('{result}', result.toString());
};
