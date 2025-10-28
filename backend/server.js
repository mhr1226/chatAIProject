// 環境変数の使用準備
// configメソッドの使用で、.envファイル内の○○=○○の内容を
// process.envオブジェクトに追加している。
require("dotenv").config();

// expressの使用準備
const express = require("express");

// 別サーバーのクライアントサイドからのリクエストに
// 答えられるようにする為CORSを使用
const cors = require("cors");

// サーバーの準備
const app = express();

// ポート番号の定義
const PORT = process.env.PORT ||3000;

// フロントエンドとバックエンドの通信を許可する
app.use(cors({
  origin: "http://localhost:5173",
  credentials:true,
}));

// JSONデータを受け取れるように設定する
app.use(express.json());

// トップページにアクセスした時の処理
app.get("/", (req,res) => {
  res.send("Hello World!!");
});

// 他ページを作成した時の挙動確認
app.get("/user", (req,res) => {
  res.send("Hello World2!!");
  console.log("userを開きました！");
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました：http://localhost:${PORT}`);
});



