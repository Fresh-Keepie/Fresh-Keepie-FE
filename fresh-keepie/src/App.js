<<<<<<< Updated upstream
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
=======
import "./App.css";
import Home from "./pages/home";
import Recipe from "./pages/recipe";
import Community from "./pages/community";
import MyPage from "./pages/myPage";
import Shopping from "./pages/shopping";
import Start from "./pages/start";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Pwcheck from "./pages/pwcheck";
import React, { useState } from "react";
import "./assets/fonts/fonts.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Link,
} from "react-router-dom"; //npm install react-router-dom

function App() {
    const [userName, setUserName] = useState("마숭숭"); // 추후에 서버로부터 유저명 받아서 사용
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/shopping" element={<Shopping />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pwcheck" element={<Pwcheck />} />
                </Routes>
            </Router>
        </>
    );
>>>>>>> Stashed changes
}

export default App;
