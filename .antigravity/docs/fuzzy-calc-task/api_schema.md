# API Schema & Data Models

※本アプリはクライアントサイドで完結するため、外部APIとの通信はありません。ここでは内部ロジックで利用するデータモデルとTypeScript型定義を記載します。

## 状態モデル (State Model)

```typescript
// 電卓の内部状態
export interface CalculatorState {
  currentInput: string;      // 現在入力中の値
  previousInput: string;     // 以前に入力された値
  operation: Operation | null; // 現在選択されている演算子
  fuzzyResult: string | null;  // 最終的な「ぼかされた」計算結果
}

// 許可される演算子
export type Operation = '+' | '-' | '*' | '/';
```

## ファジー化モジュール

```typescript
// ファジー化関数のシグネチャ
// phrases は JSON から読み込んだテンプレート配列を渡す
export type FuzzyPhraseGenerator = (exactResult: number, phrases: string[]) => string;

// フレーズテンプレートの型定義（assets/phrases.json に保存して管理）
export interface PhrasesData {
  templates: string[];
}
/*
phrases.json のデータ例:
{
  "templates": [
    "{result} くらいじゃないですかね、知らんけど",
    "たぶん {result} だと思います",
    "計算めんどいけど {result} かな",
    "おおよそ {result} ...のはず",
    "私が思うに {result} ですね"
  ]
}
*/
```
