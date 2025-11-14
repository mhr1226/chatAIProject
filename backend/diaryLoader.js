const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// 日記ディレクトリのパスを変数に代入
// dirnameはこのファイルが存在するディレクトリの絶対パスを表す
// 変更される予定のない変数の為、大文字＋スネークケースで命名
const DIARY_DIR = path.join(__dirname, "data/diaries");

