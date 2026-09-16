# Gemini 実践ガイド — 石田小学校 校内研修

授業・校務に使える30の活用例と、言語化・接地を見取る13本の応用プロンプトをまとめた静的サイトです。

## 内容

- 目標：言語化と接地を促す生成AI活用へ
- 提供画像「言語化と接地」の4象限図
- 個に応じた教材、思考を深める授業、文書作成、印刷、縦書きとルビ、Gem・Canvasの活用
- コピーできるプロンプト、60分の研修プラン、教師による確認の観点

## 編集と確認

公開ファイルは `docs/` にあります。依存ライブラリのインストールやビルドは不要です。

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory docs
```

ブラウザで `http://127.0.0.1:4173/` を開き、画像表示・目次・プロンプトのコピーを確認します。

```sh
node --check docs/content.js
node --check docs/grounding.js
node --check docs/guide.js
```

## GitHub Pages

公開元は `main` ブランチの `/docs` です。GitHub の Settings → Pages で「Deploy from a branch」を選びます。以後、このブランチに変更を反映するとサイトが更新されます。

## 画像

`docs/assets/verbalization-grounding.png` は提供画像をそのまま収録しています。画像内の著作権表示（© 2026 School Agent Co., Ltd.）を保持しています。
