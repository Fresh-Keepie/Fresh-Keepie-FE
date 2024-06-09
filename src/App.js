import "./App.css";
import Home from "./pages/home";
import Home2 from "./pages/home2";
import Recipe from "./pages/recipe";
import RecipeDetail from "./pages/recipedetail";

import Community from "./pages/community";
import MyPage from "./pages/myPage";
import Shopping from "./pages/shopping";
import Start from "./pages/start";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Pwcheck from "./pages/pwcheck";
import React, { useState } from "react";
import "./assets/fonts/fonts.css";
import mainLogo from "./assets/images/mainLogo.png";
import {BrowserRouter as Router, Routes, Route, NavLink, Link,} from "react-router-dom"; //npm install react-router-dom
//import ProductRegistration from "./components/ProductRegistration"; // 추가된 부분

function App() {
    const [userName, setUserName] = useState("마숭숭"); // 추후에 서버로부터 유저명 받아서 사용
    return (
        <>
            <Router>
                        <Routes>
                            <Route path="/" element={<Start />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/home2" element={<Home2 />} />

                            <Route path="/recipe" element={<Recipe />} />
                            <Route path="/recipe/:id" element={<RecipeDetail />} />

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
}



export default App;
