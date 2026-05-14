# API Schema & Data Models

## データ型定義

### FuzzyResult
計算結果と表示用テキストを保持するインターフェース。

```typescript
export interface FuzzyResult {
  /**
   * ディスプレイに表示される文字列
   * 例: "だいたい 15 くらい？", "3"
   */
  displayText: string;

  /**
   * 実際の計算結果（数値）
   * 1桁の場合は displayText と同じ値が数値として入る
   */
  realValue: number;

  /**
   * 曖昧化が行われたかどうかのフラグ
   */
  isFuzzy: boolean;
}
```

### CalculationState
`useCalculator` フックで管理される状態。

```typescript
interface CalculationState {
  mainText: string;      // 表示用メインテキスト
  subText: string;       // 計算途中の式
  realResult: number | null; // 保持されている正確な結果
  isNewInput: boolean;   // 新規入力待ちフラグ
}
```
