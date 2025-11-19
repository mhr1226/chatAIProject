// 日記データを読み込むモジュール
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// 日記ディレクトリのパスを変数に代入
// dirnameはこのファイルが存在するディレクトリの絶対パスを表す
// 変更される予定のない変数の為、大文字＋スネークケースで命名
const DIARY_DIR = path.join(__dirname, "data/diaries");

// 日記データを全て取得する関数
const loadAllDiaries = () => {
  // 1. 日記ディレクトリ内の全てのファイルを取得
  // ※readdirSync:同期的にファイル名の配列を取得する
  // 戻り値は配列
  const fileNames = fs.readdirSync(DIARY_DIR);

  // 2. .mdファイルのみを格納する配列を作成
  const mdFiles = fileNames.filter((file => file.endsWith(".md")));

  // 3. 各.mdファイルを読み込む
  const diaries = mdFiles.map(( file ) => {
    // ファイルパスの作成
    const filePath = path.join(DIARY_DIR, file);
    // ファイルの内容を文字列として読み込む
    const fileContent = fs.readFileSync(filePath, "utf8");

    // gray-matterを使って、メタデータと内容に分離する
    const { data, content } = matter(fileContent);

    // dataとcontentの中身を確認する
    console.log("data:", data);
    console.log("content:", content);

    // 日記データのオブジェクトを作成して返す
    return {
      fileName: file,
      metaData: data.date,
      tags: data.tags,
      content: content.trim()
    };
  });

  // 4. 全ての.md日記データをまとめた配列を返す
  return diaries;
}

module.exports = { loadAllDiaries };

