import "./App.css";
import Home from "./pages/home";
import Recipe from "./pages/recipe";
import Community from "./pages/community";
import MyPage from "./pages/myPage";
import Shopping from "./pages/shopping";
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
                <div style={appContainerStyle}>
                    <div style={headerContainerStyle}>
                        <MainLogo />
                        <TopMenu />
                        <UserInfo userName={userName} />
                    </div>
                    {/* 각 라우트를 설정하고, 해당하는 컴포넌트를 렌더링 */}
                    <div style={mainContentContainerStyle}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/recipe" element={<Recipe />} />
                            <Route path="/shopping" element={<Shopping />} />
                            <Route path="/community" element={<Community />} />
                            <Route path="/mypage" element={<MyPage />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </>
    );
}
const appContainerStyle = {
    //전체 컨테이너 스타일
    width: "95%",
    position: "absolute",
    alignItems: "center",
    padding: "2.5%",
};
const headerContainerStyle = {
    //헤더 컨테이너(웹 상단) 스타일
    display: "flex",
    width: "95%",
    flexDiretion: "row",
    position: "absolute",
    alignItems: "center",
    whiteSpace: "nowrap",
};
const mainContentContainerStyle = {
    //메인 컨테이너 스타일
    width: "100%",
    height: "100%",
    minWidth: 1200,
    marginTop: 100,
    minHeight: 700,
    border: "solid 1px", //메인 콘텐츠 컨테이너 크기 표기용, 실제 디자인 X
};
function MainLogo() {
    return (
        <div>
            <Link to="/">
                <img
                    src={mainLogo}
                    alt="Main Logo"
                    style={{ width: 316, height: 54 }}
                />
            </Link>
        </div>
    );
}
function TopMenu() {
    return (
        <div style={topMenuContainerStyle}>
            <nav>
                <ul
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    className="topMenuClass">
                    <li>
                        <NavLink to="/">
                            <MenuContent title="HOME" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/recipe">
                            <MenuContent title="RECIPE" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shopping">
                            <MenuContent title="SHOPPING" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/community">
                            <MenuContent title="COMMUNITY" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage">
                            <MenuContent title="MY PAGE" />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
const topMenuContainerStyle = {
    justifyContent: "center",
    width: "100%",
    height: "80%",
};
const menuContentStyle = {
    padding: 4,
    borderBottom: "1px solid black",
    marginRight: 30,
    fontWeight: "bold",
    fontSize: 15,
};
function MenuContent(props) {
    //컴포넌트명은 대문자로 시작해야하기 때문에, 파스칼 표기법 사용
    return <div style={menuContentStyle}>{props.title}</div>;
}
function UserInfo(prop) {
    return (
        <div style={userInfoStyle}>
            <p>{prop.userName}님 안녕하세요 :)</p>
        </div>
    );
}
const userInfoStyle = {
    display: "flex",
    fontFamily: "APPLESDGOTHICNEO",
    fontWeight: 600,
    fontSize: 20,
    justifyContent: "flex-end",
    width: 300,
    marginRight: 20,
};
export default App;
