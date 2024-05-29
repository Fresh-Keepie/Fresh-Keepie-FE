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
import React from "react";
import "./assets/fonts/fonts.css";
import { UserNameProvider } from "./pages/myPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm install react-router-dom

function App() {
    return (
        <UserNameProvider>
            {/*사용자명 동기화를 위한 context provider*/}
            <Router>
                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/recipe" element={<Recipe />} />
                    <Route path="/shopping" element={<Shopping />} />
                    <Route path="/community/*" element={<Community />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pwcheck" element={<Pwcheck />} />
                </Routes>
            </Router>
        </UserNameProvider>
    );
}

export default App;
