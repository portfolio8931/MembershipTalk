const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const app = express();

// LiveReloadサーバーの設定
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);

// ファイル変更でリロード
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

// connect-livereload ミドルウェアの設定
app.use(connectLiveReload());

app.use(express.static(__dirname));

// ルート
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});