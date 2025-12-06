// 環境変数の読み込み
require("dotenv").config();

// axiosの使用準備
const axios = require("axios");

// microCMSのAPIキーとサービスドメインの取得
const API_KEY = process.env.MICRO_CMS_API_KEY;
const SERVICE_DOMAIN = process.env.MICRO_CMS_SERVICE_DOMAIN;

// microCMSのエンドポイント
const ENDPOINT = process.env.MICRO_CMS_ENDPOINT || "works";

// microCMSのベースURL
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

// =========================================
// microCMSの全記事データを取得する関数
// =========================================
const fetchAllArticles = async () => {
  try {
    // microCMS:リクエストを送信
    const response = await axios.get(`${BASE_URL}/${ENDPOINT}`, {
      headers: {
        // API:認証情報
        'X-API-KEY': API_KEY
      },
      params: {
        // 取得件数の上限設定
        limit: 100,
        // APIスキーマの指定
        fields: "id,title,content,publishedAt",
        // 新しい記事から取得(降順：新しい順)
        orders: "-publishedAt"
        // ※カテゴリ分けなどのフィルタリングや
        // ソートを実装したいならここに追加
      }
    });

    // 取得する記事データを変数に代入
      const articles = response.data.contents;

      return articles;

  } catch (err) {
    console.error("記事データの取得に失敗しました：", err);

    if (err.response) {
      console.error("ステータスコード：", err.response.status);
      console.error("エラー内容：", err.response.data);
    }

    // エラー時は空配列を返す
    return [];
  }
}

// =========================================
// 記事データをAIでの使用時に備えて文字列化する関数
// ========================================
  const stringifyArticleData = (articleData) => {
    
    // 記事データが存在しない場合
    if (!articleData || articleData.length === 0) {
      return "記事データが存在しません。";
    }

    // 各記事を文字列化して結合
    return articleData.map(article => {
      return `
      タイトル: ${article.title || "タイトルなし"}
      公開日: ${article.publishedAt || "日付なし"}
      内容: 
      ${article.content || "内容なし"}
      `.trim();
    }).join("\n\n--------------------\n\n");
  } 

  // ========================================
    // 関数のエクスポート
    // ========================================

    // エクスポートの仕方について後日学習します
    module.exports = {
      fetchAllArticles,
      stringifyArticleData
    };