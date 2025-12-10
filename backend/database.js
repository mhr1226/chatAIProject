// SQLiteを使用したデータベースに関する機能をまとめたモジュール
const database = require('better-sqlite3');
// path関連のモジュール
const path = require('path');
// ファイルシステム関連のモジュール
const fs = require('fs');

// データベースディレクトリのパス作成
const dbDir = path.join(__dirname, 'data');

// データベースディレクトリが存在しない場合は作成
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log("データベースディレクトリを作成しました:", dbDir);
  }

// データベースファイルのパス作成
const dbFile = path.join(dbDir, 'app_database.db');

// データベース接続の初期化
const db = new database(dbFile);

// =========================================
// テーブルの作成（存在しない場合のみ）

// AI要約テーブルの作成用の関数
const createAISummariesTable = () => {

    try {
    
    db.exec(`
      CREATE TABLE IF NOT EXISTS ai_summaries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        article_id TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        summary_text TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
        `);

      console.log("AI要約テーブルが正常に作成されました。");

  } catch (err) {
    console.error("対話履歴テーブル生成中にエラーが発生しました:", err);
  }
}

// AIの過去対話履歴テーブルの作成用の関数
const createAIDialoguesTable = () => {

  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS ai_dialogues (
        )`)
  } catch (err) {
    console.error("要約テーブル生成中にエラーが発生しました:", err);
  }
}

// =========================================


// テーブル作成関数の実行
createAISummariesTable();





