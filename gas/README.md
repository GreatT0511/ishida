# GASへの配置

`Index.html` は、画像・CSS・JavaScript・縦書きの印刷見本をすべて含む単一HTMLです。表示用の外部ファイルやライブラリは必要ありません。出典・Geminiへのリンクはインターネット上のページを開きます。

1. Google Apps Scriptでプロジェクトを作ります。
2. HTMLファイルを追加し、名前を **Index** にします。`Index.html` の全文を貼り付けます。
3. `Code.gs` の内容をスクリプトファイルに貼り付けて保存します。
4. **デプロイ → 新しいデプロイ → ウェブアプリ** を選びます。
5. 実行ユーザーとアクセスできるユーザーを、校内の共有範囲に合わせて指定してデプロイします。
6. 発行されたURLで、画像・目次移動・プロンプトのコピー・印刷見本を確認します。

画面は1つのHTMLで完結します。GASでウェブアプリとして配信する入口には、`HtmlOutput` を返す `doGet()` が必要です。

## 収録内容

- 30の活用例と13本の接地に関する応用プロンプト
- 「目標：言語化と接地を促す生成AI活用へ」と提供画像
- 画像を原寸で読める拡大表示
- 縦書き・ルビ見本の表示、印刷、HTML保存
- © 2026 Yoshimasa Tanaka, CEO of School Agent Co. All rights reserved.

コピーがブラウザの制限で使えない場合は、選択された文章を Ctrl+C（Macは⌘C）でコピーできます。

## 確認範囲

単一ファイルとローカルのiframe環境で、30の活用例・13本の応用プロンプト、画像、目次移動、画像拡大、コピー、印刷見本の表示を確認済みです。提供画像のデータと著作権表示も保持しています。GAS上の実際のデプロイ・学校アカウントでの動作は未確認です。

## 公式資料

- [HTMLサービスの作成と配信](https://developers.google.com/apps-script/guides/html)
- [HTMLサービスのiframe制限](https://developers.google.com/apps-script/guides/html/restrictions)
- [ウェブアプリのデプロイ](https://developers.google.com/apps-script/guides/web)
