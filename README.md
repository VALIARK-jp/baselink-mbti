# Baselink AI 16 タイプ野球診断

## プロジェクト概要

小中高生の野球選手向けに、MBTI ベースの 16 タイプ診断を通じて自分のプレースタイルを発見し、Baselink AI サービスへの導線を構築する Web アプリケーションです。

### 主な機能

- 投手/野手のポジション別診断
- 10 問の質問による MBTI 16 タイプ判定（7 段階 Likert スケール対応）
- 32 パターン（投手 16 + 野手 16）の診断結果表示
- プロ野球選手との比較表示
- Baselink AI サービスへの誘導

## 技術スタック

- **フレームワーク**: Next.js (Pages Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks
- **ホスティング**: Vercel 推奨 / GitHub Pages 対応

## 必要な環境

- Node.js 18.0.0 以上
- npm または yarn

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

### 3. ビルド

```bash
npm run build
```

ビルドされた静的ファイルは `out` ディレクトリに生成されます。

### 4. 本番環境での起動

```bash
npm start
```

## デプロイ方法

### GitHub Pages へのデプロイ

1. GitHub リポジトリの Settings > Pages で、Source を"GitHub Actions"に設定
2. `main`ブランチにプッシュすると、自動的に GitHub Actions がビルド・デプロイします
3. デプロイ後、`https://valiark-jp.github.io/baselink-mbti/` でアクセス可能

### Vercel へのデプロイ（推奨）

1. [Vercel](https://vercel.com)にアクセスしてアカウントを作成
2. GitHub にリポジトリをプッシュ
3. Vercel で「New Project」を選択
4. リポジトリをインポート
5. デプロイボタンをクリック

**注意**: Vercel でデプロイする場合は、`next.config.js`の`output: 'export'`を削除するか、SSR モードに変更してください。

## プロジェクト構造

```
baselink_mbti/
├── pages/              # Next.jsページ
│   ├── index.tsx       # ポジション選択画面
│   ├── quiz.tsx        # 診断質問画面
│   └── result.tsx      # 診断結果画面
├── components/         # Reactコンポーネント
│   ├── PositionSelector.tsx
│   ├── QuizComponent.tsx
│   └── ResultCard.tsx
├── data/               # データ定義
│   ├── questions.ts    # 質問データ（7段階Likert形式）
│   └── results.ts      # 診断結果マッピング（32タイプ）
├── utils/              # ユーティリティ関数
│   ├── calculateMBTI.ts
│   └── likert7Score.ts # 7段階Likertスコアリング
├── types/              # TypeScript型定義
│   └── index.ts
├── styles/             # スタイル
│   └── globals.css
├── public/             # 静的ファイル
├── .github/            # GitHub Actions設定
│   └── workflows/
│       └── deploy.yml
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 使用方法

1. ユーザーが投手または野手を選択
2. 10 問の質問に 7 段階スケール（1-7）で回答（共通 6 問 + ポジション別 4 問）
3. MBTI ロジックに基づいて 16 タイプから該当タイプを判定
4. 診断結果を表示（タイプ名、似ているプロ選手、アドバイス）
5. Baselink AI サービスへの誘導

## 開発に関する詳細

詳細な仕様については [SPECIFICATION.md](./SPECIFICATION.md) を参照してください。

## ライセンス

株式会社 SportsTech Japan
