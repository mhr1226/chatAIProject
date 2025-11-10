import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // メッセージ履歴の保存
  const [messages, setMessages] = useState([]);
  // 入力中のテキスト
  const [inputText, setInputText] = useState("");

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
    // 2.格納したオブジェクトをsetMessageで配列に格納
    // ※：prevはmessageを意味している
    // messageの初期値は空配列[]
    setMessages(prev => [...prev, userMessage]);

    // 入力欄をクリア
    setInputText("");

    // （仮）AI応答メッセージの作成
    setTimeout(() => {
      const aiMessage = {
        role: "assistant",
        content: "私はAIです。"
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 500);
  };

  // 送信ボタンをクリック時の処理
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // ブラウザのデフォルト（Enterで改行される仕様）を
      // 制御するメソッド（今回は独自の送信仕様にしたい）
      e.preventDefault();
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
      </div>

      {/* 入力エリア */}
      <div className="input-area">
        <textarea
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="メッセージを入力..." 
          rows={3}/>
          <button onClick={handleSendMessage}>送信</button>
      </div>
    </div>
  )
}

export default App
