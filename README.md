# Baselink AI 16 タイプ野球診断

## プロジェクト概要

小中高生の野球選手向けに、MBTI ベースの 16 タイプ診断を通じて自分のプレースタイルを発見し、Baselink AI サービスへの導線を構築する Web アプリケーションです。

### 主な機能

- 投手/野手のポジション別診断
- 10 問の質問による MBTI 16 タイプ判定
- 32 パターン（投手 16 + 野手 16）の診断結果表示
- プロ野球選手との比較表示
- Baselink AI サービスへの誘導

## 技術スタック

- **フレームワーク**: Next.js (Pages Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks
- **ホスティング**: Vercel 推奨

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

### 4. 本番環境での起動

```bash
npm start
```

## デプロイ方法

### Vercel へのデプロイ（推奨）

1. [Vercel](https://vercel.com)にアクセスしてアカウントを作成
2. GitHub にリポジトリをプッシュ
3. Vercel で「New Project」を選択
4. リポジトリをインポート
5. デプロイボタンをクリック

### その他のホスティング

静的エクスポートを使用する場合：

```bash
npm run build
npm run export
```

`out`ディレクトリが生成されるので、これを任意の静的ホスティングサービスにデプロイできます。

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
│   ├── questions.ts    # 質問データ
│   └── results.ts      # 診断結果マッピング
├── utils/              # ユーティリティ関数
│   └── calculateMBTI.ts
├── types/              # TypeScript型定義
│   └── index.ts
├── styles/             # スタイル
│   └── globals.css
├── public/             # 静的ファイル
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 使用方法

1. ユーザーが投手または野手を選択
2. 10 問の質問に回答（共通 6 問 + ポジション別 4 問）
3. MBTI ロジックに基づいて 16 タイプから該当タイプを判定
4. 診断結果を表示（タイプ名、似ているプロ選手、アドバイス）
5. Baselink AI サービスへの誘導

## 開発に関する詳細

詳細な仕様については [SPECIFICATION.md](./SPECIFICATION.md) を参照してください。

## ライセンス

株式会社 SportsTech Japan

