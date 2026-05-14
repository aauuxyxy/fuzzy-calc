# Architecture - fuzzy-calc Update

## 技術スタック
- **Frontend**: React Native / Expo
- **Logic**: TypeScript
- **Styling**: StyleSheet (React Native)

## システム構成図
```mermaid
graph TD
    User([ユーザー]) --> UI[App.tsx / Keypad]
    UI --> Hook[useCalculator.ts]
    Hook --> Logic[evaluateExpression]
    Logic --> Fuzzifier[fuzzifier.ts]
    Fuzzifier --> Assets[phrases.json]
    Fuzzifier --> Result{Fuzzy Result}
    Result -->|2桁以上| Fuzzy[表示: 曖昧文字列 / 実数値保持]
    Result -->|1桁| Exact[表示: 正確な数値]
    Fuzzy --> Display[Display.tsx]
    Exact --> Display
    Display -->|Secret| SecretDisplay[隠し正解表示]
```

## データフロー
1. ユーザーが `=` を押下。
2. `useCalculator` が式を評価し、正確な結果を取得。
3. `fuzzifier` に正確な結果を渡し、表示用のテキストと実数値を含むオブジェクトを生成。
4. `Display` コンポーネントが受け取り、メイン領域にテキスト、隅に実数値を表示。
