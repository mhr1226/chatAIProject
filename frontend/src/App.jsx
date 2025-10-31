import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // メッセージ履歴の保存
  const [messages, setMessages] = useState([]);
  // 入力中のテキスト
  const [inputText, setInputText] = useState("");

  // useEffect(() => {

  //   const fetchData = async () => {
      
  //     try{
  //       // ルートエンドポイント
  //       const res = await fetch("http://localhost:3000/");
  //       const data = await res.text();
  //       setMessages(data);


  //     } catch (err){
  //       console.error("エラーが発生しました。");
  //     };
  //   }

  //   fetchData();

  // }, []);

  return (
    <>
      <h1>Self-dialogue AI</h1>
      <p>root（/）からのメッセージ: {messages}</p>
    </>
  )
}

export default App
