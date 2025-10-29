import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      
      try{
        const res = await fetch("http://localhost:3000/user");
        const data = await res.text();
        setMessage(data);
      } catch (err){
        console.error("エラーが発生しました。");
      };
    }

    fetchData();

  }, []);

  return (
    <>
      <h1>Self-dialogue AI</h1>
      <p>バックエンドからのメッセージ: {message}</p>
    </>
  )
}

export default App
