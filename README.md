# PetCare Diary

ペットのお世話を記録・管理できるWebアプリケーションです。

## 機能

- ユーザー認証（新規登録 / ログイン / ログアウト）
- ペットの登録・一覧表示・編集・削除
- お世話の記録追加・削除（食事 / 散歩 / 体重 / 病院 / その他）

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Vue 3 (Composition API) |
| 言語 | TypeScript |
| ビルドツール | Vite |
| 状態管理 | Pinia |
| ルーティング | Vue Router |
| HTTP クライアント | Axios |
| UI通知 | Vue Toastification |
| スタイル | Sass |

## バックエンド

- API: [test-portfolio-api (Render)](https://test-portfolio-api.onrender.com/api)
- Render 無料プランで稼働しているため、初回アクセス時はサーバー起動に1分程度かかる場合があります。

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/Akifumi1119/test-portfolio.git
cd test-portfolio

# 依存パッケージをインストール
npm install

# 環境変数ファイルを作成
echo "VITE_API_BASE_URL=http://localhost:8000/api" > .env.local

# 開発サーバーを起動
npm run dev
```

## スクリプト

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run preview  # ビルド結果をプレビュー
```
