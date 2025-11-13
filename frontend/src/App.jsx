import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // メッセージ履歴の保存
  const [messages, setMessages] = useState([]);
  // 入力中のテキスト
  const [inputText, setInputText] = useState("");
  // ローディング状態
  const [loading, setLoading] = useState(false);
  // 自動スクロール機能（後で実装）
  // ここから

  // メッセージ送信処理
  // 送信ボタンをクリックしたら発火
  const handleSendMessage = async () => {
    if(!inputText.trim()) {
      // 空文字の場合は送信しない
      // ※（見た目の実装時）
      // 送信ボタンをクリック出来ないように設定する
      return;
    }

    // 1.送信したメッセージをオブジェクトに格納
    // 誰からの、どのようなメッセージか？
    const userMessage = {
      role: "user",
      content: inputText
    };
    // 2.メッセージの内容を履歴(messages配列）に保存
    // ※：prevはmessagesを意味している
    // messagesの初期値は空配列[]
    setMessages(prev => [...prev, userMessage]);

    // 3.送信メッセージの保存
    // （バックエンドに送る時に使う為）
    const sendInputMessage = inputText

    // 4.入力欄をクリア
    setInputText("");

    // 5.ローディング開始
    setLoading(true);

    // 6.バックエンドにリクエストの送信
    try {
      
      // 6-1:リクエストの作成
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        // 送信するメッセージ
        body: JSON.stringify({
          message: sendInputMessage
        }),
      });

      // 送ったリクエストに対して
      // バックエンドで処理されてから
      // レスポンスが返ってくる

      // 7.レスポンスのstatusチェック
      if (!response.ok) {
        throw new Error("サーバーからのレスポンスに問題があります。");
      }

      // 8.レスポンスデータの取得
      // jsonメソッドはPromiseを返す
      const data = await response.json();

      // 9.AIメッセージの作成
      const aiMessage = {
        role: "assistant",
        content: data.reply
      };

      // 10.AIメッセージを履歴に保存
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (err) {
      console.error("エラーが発生しました。", err);

      // 10.another-1:エラーメッセージを作成
      // アラートでも良いかも？ 実装は後日気になったら。

      const errorMessage = {
        role: "assistant",
        content: "エラーが発生しました。もう一度お試しください。"
      };

      // 10.another-2:エラーメッセージを履歴に保存
      // 不要かも？テストしてみてから確認
      setMessages(prev => [...prev, errorMessage]);

    } finally {
      // 11.ローディング終了処理
      setLoading(false);
    }
  };

  // 送信ボタンをクリック時の処理
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // ブラウザのデフォルト（Enterで改行される仕様）を
      // 制御するメソッド（今回は独自の送信仕様にしたい）
      event.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <div className="main">
      <h1>Self-dialogue AI</h1>
      
      {/* メッセージ表示部分 */}
      <div className="messages-area">
        {messages.map((message, index) => {
          return (
            <div key={index} className={`message ${message.role}`}>
            <div className="message-label">
              {/* メッセージの送り主 */}
              {message.role === "user" ? "あなた" : "AI"}
            </div>
            <div className="message-content">
              {/* メッセージの内容 */}
              {message.content}
            </div>
          </div>
          )
        })}

        {/* ローディング表示 */}
        {loading && (
          <div className="message assistant">
            <div className="message-label">AI</div>
            <div className="message-content">入力中...</div>
          </div>
        )}
      </div>

      {/* 入力エリア */}
      <div className="input-area">
        <textarea
          value={inputText} 
          onChange={(event) => setInputText(event.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="メッセージを入力..." 
          rows={3}
          disabled={loading}/>
          <button 
            onClick={handleSendMessage} 
            disabled={!inputText.trim() || loading}
          >
            {loading ? "送信中..." : "送信"}
          </button>
      </div>
    </div>
  )
}

export default App
