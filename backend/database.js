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
// ※SQLでいう所のCREATE DATABASEに相当
const db = new database(dbFile);

// =========================================
// テーブルの作成（存在しない場合のみ）
// ========================================

// ========メモ========
// exec(execute=実行という意)メソッドの戻り値はundefined
// ====================

// ================SQL文メモ===============

    // 1行目: CREATE TABLE IF NOT EXISTS ai_summaries (
      // CREATE TABLE: 新しいテーブルを作成するSQLコマンド
      // IF NOT EXISTS: テーブルが存在しない場合にのみ作成する条件
      // ai_summaries: 作成するテーブルの名前(任意)

    // 2行目: id INT PRIMARY KEY AUTOINCREMENT,
      // PRIMARY KEY: 主キー、一意の値を持つ列に設定する
        // 重複・NULL不可
      // AUTOINCREMENT: 自動的に連番を振る

    // 3行目: article_id TEXT,
      // TEXT: 文字列データ型
      // article_id: 記事の一意識別子を格納する列
      // UNIQUE: 一意制約、重複する値を許可しない
      // NOT NULL: NULL値を許可しない

    // 6行目: created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      // DATETIME: 日付と時刻を格納するデータ型
      // DEFAULT CURRENT_TIMESTAMP: 未入力の場合、現在の日時を自動的に設定する

    // ================================

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

createAISummariesTable();





