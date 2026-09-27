const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const app = express();

// LiveReloadサーバーの設定
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

// ファイルが変更された際に、ブラウザにリロードを促す
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

// connect-livereload ミドルウェアの設定
app.use(connectLiveReload());

// EJSの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// 公開フォルダの設定
app.use(express.static(path.join(__dirname, 'public')));

// ルート
app.get('/', (req, res) => {
  res.render('index');
});

// サーバーを起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
