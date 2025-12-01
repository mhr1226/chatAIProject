// 環境変数の使用準備
require("dotenv").config();

// Anthropic SDKの使用準備
const Anthropic = require("@anthropic-ai/sdk");

// expressの使用準備
const express = require("express");

// 別サーバーのクライアントサイドからのリクエストに
// 答えられるようにする為CORSを使用
const cors = require("cors");

// サーバーの準備
const app = express();

// Anthropicクライアントの初期化
const anthropic = new Anthropic({
  // 環境変数からAPIキーを取得
  apiKey: process.env.ANTHROPIC_API_KEY
});

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


// microCMSの記事データの初期化（読み込み）
// 後日実装

// ===========メモ============

// グローバル変数として保持する
// この後にAPIリクエストが来た時に使用する為

// AIにリクエストを送る前に記述した方が
// 読み込み処理が早くなる為先に実行する

// =========================

// microCMSの実装後に必要に応じて修正する
// let cachedDiaries = [];

try {
  // microCMSの記事データ(配列)を取得
  // 後日実装
  

} catch (err) {
  console.error("日記データの初期化に失敗しました：", err);
}

// APIのエンドポイント
app.post("/api/chat", async (req,res) => {
  // App.jsxでhandleSendMessagesが発火後に実行される。

  try {
    // フロントエンドからのメッセージをオブジェクトから取り出す
    // 後でAIに送信する為に使う
    const { messages } = req.body;

    // フロントエンドから送られてきた
    // メッセージ配列が空の場合の処理
    // 予期しているエラーの為、returnで処理を終了させる
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      // 400番台はクライアント側のエラーを意味する
      // 今後の実装でページ遷移しないように書き換える（予定）
      return res.status(400).json({ error: "メッセージが空です。" });
    }

    // 確認用ログ：後で消す
    console.log(`フロントエンドからメッセージを送信：${messages[messages.length -1].content}`);

    // キャッシュされた日記データを取得
    const diaries = cachedDiaries;

    // 確認用ログ：後で消す
    console.log("日記データの件数：", diaries.length);

    // ==========メモ============
    // microCMS用に後日実装
    // 日記オブジェクトを文字列に変換する
    // 日記データをAIに送信する為に使う

    // =========================
    const convertToStrings = `
    【日付】：仮,
    【タグ】：仮,
    【内容】：仮
    \n----------------\n
      `;

    // AIへのプロンプトを作成
    // microCMSから記事データを取得出来るようにしてから調整
    const systemPrompt = `
    あなたは、ユーザーの過去の日記を参考にして対話するAIアシスタントです。
    以下はユーザーの過去の日記です:
    （仮データ：後日実装）
    これらの日記を参考にして、ユーザーの考え方や経験を理解した上で共感的に対話を行ってください。
    `;

    // 送信を始める前の確認用ログ：後で消す
    console.log("APIにリクエストを送信中...");

    // systemPromptとユーザーメッセージをAnthropic APIに送信
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      // 最大出力文字数（1token = 約2~2.6文字）
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages
    });

    // 確認用ログ：後で消す
    console.log("AIからのレスポンスを受信しました：", response);

    // AIの応答メッセージを取り出す
    const aiResponse = response.content[0].text;

    // フロントエンドにレスポンスを返す
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



