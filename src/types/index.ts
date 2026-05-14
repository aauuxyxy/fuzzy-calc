/**
 * Fuzzy Calc - 型定義ファイル
 *
 * Issue #7: アセットとデータモデルの準備に伴い作成されました。
 * ここでは、電卓の内部状態や、ファジー化用のテンプレートデータの型を定義します。
 */

// 電卓の内部状態
export interface CalculatorState {
  currentInput: string; // 現在入力中の値
  previousInput: string; // 以前に入力された値
  operation: Operation | null; // 現在選択されている演算子
  fuzzyResult: string | null; // 最終的な「ぼかされた」計算結果
}

// 許可される演算子
export type Operation = '+' | '-' | '*' | '/';

// ファジー化関数のシグネチャ
// phrases は JSON から読み込んだテンプレート配列を渡す想定
export type FuzzyPhraseGenerator = (exactResult: number, phrases: string[]) => string;

// フレーズテンプレートの型定義（assets/phrases.json の構造）
export interface PhrasesData {
  templates: string[];
}
