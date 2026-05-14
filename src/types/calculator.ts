/**
 * 曖昧化された計算結果のインターフェース
 */
export interface FuzzyResult {
  /**
   * ディスプレイに表示される文字列
   */
  displayText: string;

  /**
   * 実際の正確な計算結果（数値）
   */
  realValue: number;

  /**
   * 曖昧化が行われたかどうかのフラグ
   */
  isFuzzy: boolean;
}
