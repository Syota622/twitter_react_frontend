# 使用するnode.jsのバージョンを21.5のalpineに指定
FROM node:21.5-alpine as build

# アプリケーションディレクトリを作成
WORKDIR /app

# アプリケーションの依存関係をインストール
# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
RUN npm install

# アプリケーションのソースをビルド用フォルダにコピー
COPY . .

# Reactアプリをビルド
RUN npm run build

# 静的ファイルの配信のためにserveをインストール
RUN npm install -g serve

# 3000ポートを開放
EXPOSE 3000

# serveを使ってビルドしたアプリケーションを実行
CMD ["serve", "-s", "build", "-l", "3000"]
