# Architecture

## プロジェクト概要
- アプリ名: Fuzzy Calc (適当な電卓)
- コンセプト: 計算結果を「だいたいこれくらい」とぼかして返す笑える電卓アプリ。
- プラットフォーム: iOS / Android / Web (React Native with Expo)

## 技術スタック
- **Frontend Framework**: React Native (Expo)
- **Language**: TypeScript
- **Styling**: React Native StyleSheet
- **State Management**: React Hooks (useState)
- **Lint/Format**: ESLint, Prettier

## システム全体図とデータフロー
1. **User Input**: ユーザーが数字・演算子キーをタップ。
2. **State Update**: `useState` で現在の入力値（`currentOperand`）、以前の入力値（`previousOperand`）、演算子（`operation`）を保持・更新。
   - **連続計算のサポート**: 「100 + 100 +」のように演算子キーが連続して押された場合、その時点で一旦計算を行い、結果を新しい `previousOperand` として保持します。これにより複数回の演算子入力を可能にします。
3. **Calculation Logic**: イコールボタン押下時、最終的な正確な計算結果を算出。
4. **Fuzzy Logic**: 算出された正確な数値を、専用のファジー化モジュールに渡す。このとき、外部の `phrases.json` から読み込んだフレーズテンプレートを使用し、ランダムに文章を生成する。
5. **Output**: ファジー化された文字列（例：「200くらいじゃないですかね、知らんけど」）を画面に表示。
