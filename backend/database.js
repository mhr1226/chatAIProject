// SQLiteを使用したデータベースに関する機能をまとめたモジュール
const database = require('better-sqlite3');
// path関連のモジュール
const path = require('path');
// ファイルシステム関連のモジュール
const fs = require('fs');
const { createSecretKey } = require('crypto');

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
const createSummariesTable = () => {

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
// 各対話毎のテーブルの作成を想定
const createChatSessionTable = () => {

  try {

    db.exec(`
      CREATE TABLE IF NOT EXISTS ai_chat_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`)
  } catch (err) {
    console.error("要約テーブル生成中にエラーが発生しました:", err);
  }
}

// AIの各対話履歴内のメッセージ保存用のテーブル
const createChatMessageTable = () => {

  try {

    db.exec(`
      CREATE TABLE IF NOT EXISTS ai_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES ai_chat_sessions(id) ON DELETE CASCADE
      )`);
  } catch (err) {
    
    console.error("メッセージテーブル生成中にエラーが発生しました:", err);
    
  }
}

// =========================================


// テーブル作成関数の実行
createSummariesTable();
createChatSessionTable();
createChatMessageTable();

// =========================================
// データベースの中身の確認用関数
const checkDatabaseContents = () => {
  console.log("データベース内容の確認を開始します...");

  try {
    // データベースの全容確認ログ
    const dataInfo = db.prepare(`SELECT * FROM sqlite_master`).all()
    console.log("データベース全体の情報確認:", dataInfo);
  } catch (err) {
    console.error("データベース内容確認中にエラーが発生しました:", err);
  }
}

checkDatabaseContents();

// =========================================





