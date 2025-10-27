// 環境変数の使用準備
require("dotenv").config();

// expressの使用準備
const express = require("express");

// サーバーの準備
const app = express();

// ポート番号の定義
const PORT = process.env.PORT ||3000;

// トップページにアクセスした時の処理
app.get("/", (req,res) => {
  res.send("Hello World!!");
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました：http://localhost:${PORT}`);
});


