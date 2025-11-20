// 環境変数の使用準備
require("dotenv").config();

// Anthropic SDKの使用準備
const Anthropic = require("@anthropic-ai/sdk");

// diaryLoaderモジュールの読み込み
const { loadAllDiaries } = require("./diaryLoader");

// expressの使用準備
const express = require("express");

// 別サーバーのクライアントサイドからのリクエストに
// 答えられるようにする為CORSを使用
const cors = require("cors");

// サーバーの準備
const app = express();

// Anthropicクライアントの初期化
const anthropic = new Anthropic(
  // 環境変数からAPIキーを取得
  process.env.ANTHROPIC_API_KEY
);

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
  res.send("Hello Worldだよー!!");
});

// サーバー起動時に日記の初期化（読み込み）
let cashedDiaries = [];
try {
  cashedDiaries = loadAllDiaries();
  console.log("サーバー起動時に日記データを初期化しました。");
  console.log("読み込んだ日記データの件数：", cashedDiaries.length);

} catch (err) {
  console.error("日記データの初期化に失敗しました：", err);
}

// APIのエンドポイント
app.post("/api/chat", async (req,res) => {
  // App.jsxでhandleSendMessageが発火後に実行される。

  try {
    // フロントエンドからのメッセージをバックエンドに送る
    const { message } = req.body;

    // メッセージが空の場合は処理を中断する
    // 予期しているエラーの為、returnで処理を終了させる
    if (!message || !message.trim()) {
      // 400番台はクライアント側のエラーを意味する
      // 今後の実装でページ遷移しないように書き換える（予定）
      return res.status(400).json({ error: "メッセージが空です。" });
    }

    // 確認用ログ：後で消す
    console.log(`フロントエンドからメッセージを送信：${message}`);

    // dairyLoaderを使って日記データ(配列)を取得
    const diaries = cashedDiaries;

    // 確認用ログ：後で消す
    console.log("取得した日記データ：", diaries);
    // 確認用ログ：後で消す
    console.log("日記データの件数：", diaries.length);

    // ※ここにAIとのやり取りのロジックを実装する予定

    // AIからの（仮）応答メッセージを作成
    // await関数を使う（予定）
    const aiResponse = `これはAIからの応答メッセージです。：${message}を受け取りました。
      参照できる日記データの件数は${diaries.length}件です。`;

    // 確認用ログ：後で消す
    console.log(`AIからの応答メッセージ：${aiResponse}`);

    res.json({
      success: true,
      // replyの命名はApp.jsx側で受け取る際に使用する
      reply: aiResponse
    });

  } catch ( err ) {
    console.error("エラーが発生しました：", err);
    // 500番台はサーバー側のエラーを意味する
    res.status(500).json({ error: "サーバーエラーが発生しました。" });
  }

});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました：http://localhost:${PORT}`);
});



