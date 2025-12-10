# 開発メモ

### ====================================================

## インターセプターとは

- プログラムの実行中に特定のリクエストやイベントをインターセプトして処理する仕組みであり、主にログ記録や権限の検証などに使用されます。

### インターセプターの基本概念
- インターセプターは、特定のメソッドが呼び出 さ れる前後に任意の処理を実行するための機能です。 これは、プログラムの異なる段階でリクエスト やイ ベントを処理し、システムの制御や管理を実現する ために使用されます。

- 特に、以下のような場面で利用されます:
  - ログ記録: メソッドの開始や終了時にログを出 力することで、デバッグや監視を容易にします。
  - 権限の検証: ユーザーの権限を確認し、適切な 処理を行うために使用されます。
  - パフォーマンス監視: メソッドの実行時間を測定し、パフォーマンスの最適化に役立てます。

### =================================================

## JS開発メモ

  ### server.js内

  -  42行目: `let cachedArticleData = [];`
    グローバル変数の取り扱いについて
    グローバル変数を関数内の変数に再代入するのは
    グローバル変数を直接操作しない為の対策
    ※関数内の操作であってもどちらが参照されているか
    分かりにくくなる為

### =================================================

## GitHubメモ

  ### GitHubへの更新時の注意点
  - コメントの追加時は、見出しに変更内容がパッと見てわかる状態にしておく。

### ================================================

## SQL文メモ

  ### SQLiteにおける注意事項

    - exec(execute=実行という意)メソッドの戻り値はundefined

  ### テーブル作成の構文解説
    ```sql
    CREATE TABLE IF NOT EXISTS ai_summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id TEXT NOT NULL,
    summary TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    ```
  - 1行目: `CREATE TABLE IF NOT EXISTS ai_summaries (`
    - **CREATE TABLE**: 新しいテーブルを作成するSQLコマンド
    - **IF NOT EXISTS**: テーブルが存在しない場合にのみ作成する条 件
    - **ai_summaries**: 作成するテーブルの名前(任意)

  - 2行目: `id INTEGER PRIMARY KEY AUTOINCREMENT,`
    - **id**: テーブル内の各レコードを一意に識別するための列
    - **INTEGER**: 整数型のデータ型
    - **PRIMARY KEY**: 主キー、一意の値を持つ列に設定する
      - 重複・NULL不可
    - **AUTOINCREMENT**: レコード追加時に自動的に連番を振る

  - 3行目: `article_id TEXT NOT NULL,`
    - **article_id**: 記事の一意識別子を格納する列
    - **TEXT**: 文字列データ型
    - **NOT NULL**: NULL値を許可しない

  - 4行目: `summary TEXT NOT NULL,`
    - **summary**: 要約されたテキストを格納する列
    - **TEXT**: 文字列データ型
    - **NOT NULL**: NULL値を許可しない
  
  - 5行目: `created_at TEXT DEFAULT CURRENT_TIMESTAMP`
    - **created_at**: レコードの作成日時を格納する列
    - **TEXT**: 文字列データ型（SQLiteではDATETIMEもTEXTとして扱  われ   る）
    - **DEFAULT CURRENT_TIMESTAMP**: レコード挿入時に未入力の場合、現在の日時を自動的に設定する

    