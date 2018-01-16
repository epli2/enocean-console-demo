# enocean-console-demo
RZ/G1ボード等でのデモンストレーション用アプリケーションです  
サーバは別のrepositoryにあります -> https://github.com/epli2/enocean-console-demo-server

## 既知のバグ
初回起動時に最初のデータを受け取るまで表示がおかしくなる

## インストール
### 依存関係のインストール
`npm install`

## 使用方法
### ビルド
`npm run build`  
コマンドを実行すると`dist/`以下に`index.html`とjs, cssをビルドします

### ビルド後
`cp -f dist/index.html "サーバのリポジトリをクローンしたパス"/enocean-console-demo-server/templates && cp -r -f dist/static "サーバのリポジトリをクローンしたパス"/enocean-console-demo-server/`  
というふうにファイルをサーバのディレクトリの`templates/`以下に`index.html`を、`static/`に`js/`と`css/`をコピーしてください

## クエリ文字列によるデモデータの指定
`http://localhost:8080/?demodata_100.json`のように?に続けてファイル名を指定

## 開発用サーバの起動(localhost:8080でアクセス)
`npm run dev`

