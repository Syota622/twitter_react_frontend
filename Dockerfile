# 使用するnode.jsのバージョンを21.5のalpineに指定
FROM node:21.5-alpine

# アプリケーションディレクトリを作成
WORKDIR /app

# アプリケーションの依存関係をインストール
# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# 3000ポートを開放
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "start"]
