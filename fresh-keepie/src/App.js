import "./App.css";
import Home from "./pages/home";
import Recipe from "./pages/recipe";
import Community from "./pages/community";
import MyPage from "./pages/myPage";
import Shopping from "./pages/shopping";
import Start from "./pages/start";
import Login from "./pages/login";


import React, { useState } from "react";
import "./assets/fonts/fonts.css";
import mainLogo from "./assets/images/mainLogo.png";
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
                
                    {/* 각 라우트를 설정하고, 해당하는 컴포넌트를 렌더링 */}
                
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/recipe" element={<Recipe />} />
                            <Route path="/shopping" element={<Shopping />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/start" element={<Start />} />
                            <Route path="/login" element={<Login />} />


                        </Routes>
                    
            
            </Router>
        </>
    );
}



export default App;
