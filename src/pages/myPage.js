import React from "react";
import { useState, useContext } from "react";
import Topbar from "../components/Topbar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UserNameContext = React.createContext();
export const UserNameProvider = ({ children }) => {
    const [userName, setUserName] = useState("마숭숭");
    return (
        <UserNameContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserNameContext.Provider>
    );
};
// 추후에 서버로부터 유저명 받아서 사용
export const useUserName = () => useContext(UserNameContext);

const PageWrapper = styled.div`
    width: 100%;
    height: 898px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const MyPageContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
`;
function MyPage() {
    const { userName, setUserName } = useUserName();
    const [userLoginID, setUserLoginID] = useState("masoongsoong1");
    const [menuOption, setMenuOption] = useState(0); //0 : 개인정보 수정, 1 : 보관한 레시피, 2 : 스크랩한 글, 3 : 내가 쓴 글

    const inputStyle = {
        fontFamily: "APPLESDGOTHICNEO",
        border: "1.5px solid",
        borderColor: "#9c9c9c",
        width: 200,
        marginRight: 20,
        borderRadius: 15,
        backgroundColor: "white",
        height: 30,
        padding: 5,
    };
    const DefaultButton = styled.div`
        color: #05796b;
        background-color: white;
        font-size: 16px;
        width: 70px;
        height: 30px;
        padding: 4px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "APPLESDGOTHICNEO";
        user-select: none;
        cursor: pointer;
        font-weight: 600;
    `;
    return (
        <PageWrapper>
            <UserNameProvider>
                <Topbar />
                <MyPageContainer>
                    <LeftMenu />
                    <div style={{ marginRight: 50 }} />
                    <Main />
                </MyPageContainer>
            </UserNameProvider>
        </PageWrapper>
    );

    function LeftMenu() {
        const LeftSide = styled.div`
            display: flex;
            height: 700px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;
        const LeftMenuContainer = styled.div`
            height: 600px;
            width: 300px;
            padding-inline-start: 30px;
            border-radius: 0px 50px 50px 0px;
            background-color: #05796b;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-evenly;
            font-family: "APPLESDGOTHICNEO";
            font-weight: 600;
            font-size: 22pt;
        `;
        const MenuOptionContainer = styled.div`
            display: flex;
            flex-direction: row;
            align-items: center;
            user-select: none;
            cursor: pointer;
        `;
        const optionList = [
            "개인정보 수정",
            "보관한 레시피",
            "내가 스크랩한 글",
            "내가 쓴 글",
        ];
        return (
            <LeftSide>
                <LeftMenuContainer>
                    {optionList.map((prop, index) => {
                        return (
                            <MenuOptionContainer
                                onClick={() => {
                                    setMenuOption(index);
                                }}>
                                <div
                                    style={{
                                        width: 4,
                                        borderRadius: 2,
                                        height: 32,
                                        marginRight: 10,
                                        backgroundColor: "white",
                                    }}
                                />
                                {prop}
                            </MenuOptionContainer>
                        );
                    })}
                </LeftMenuContainer>
            </LeftSide>
        );
    }
    function Main() {
        const MainSide = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            height: 100%;
            align-items: flex-end;
        `;
        const MainContainer = styled.div`
            width: 1150px;
            height: 650px;
            background-color: #05796b;
            border-radius: 50px 0px 0px 0px;
        `;

        return (
            <MainSide>
                <MainContainer>
                    <MainContent />
                </MainContainer>
            </MainSide>
        );
    }
    function MainContent() {
        switch (menuOption) {
            case 0:
                return <PersonalData />;
            case 1:
                return <SavedRecipe />;
            case 2:
                return <ScrapList />;
            case 3:
                return <MyPostList />;
            default:
                return;
        }

        function PersonalData() {
            let curPass = "pass1234";
            const personalContainer = {
                boxSizing: "border-box",
                width: "100%",
                height: "100%",
                color: "white",
                fontFamily: "APPLESDGOTHICNEO",
            };

            const personalHeader = {
                fontSize: "35px",
                fontWeight: "600",
                boxSizing: "border-box",
                width: "100%",
                height: "90px",
                borderBottom: "3px solid white",
                display: "flex",
                alignItems: "center",
                paddingInlineStart: "50px",
            };

            const personalContent = {
                fontSize: "24px",
                boxSizing: "border-box",
                width: "100%",
                height: "100px",
                borderBottom: "2px solid white",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingInlineStart: "50px",
            };

            const commonStyle = {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                marginLeft: 500,
            };
            const [inputCurPass, setCurPass] = useState("");
            const [inputNewPass, setNewPass] = useState("");
            const [inputConPass, setConPass] = useState("");
            function handleChangePass(event) {
                event.preventDefault();
                if (
                    inputCurPass === "" ||
                    inputNewPass === "" ||
                    inputConPass === ""
                ) {
                    alert("비밀번호를 입력해주세요.");
                } else if (inputCurPass !== curPass) {
                    {
                        alert("현재 비밀번호가 일치하지 않습니다.");
                    }
                } else if (inputNewPass === inputCurPass) {
                    alert("새로운 비밀번호를 입력해 주세요.");
                } else if (inputNewPass !== inputConPass) {
                    alert("새 비밀번호가 일치하지 않습니다.");
                } else {
                    /*여기에 비밀번호를 변경하는 API를 추후 작성*/
                    alert("비밀번호가 변경되었습니다.");
                    setCurPass(inputNewPass);
                }
            }
            return (
                <div style={personalContainer}>
                    <div style={personalHeader}>개인정보 변경</div>
                    <div style={personalContent}>
                        닉네임
                        <NameInput />
                    </div>
                    <div style={personalContent}>
                        아이디
                        <LoginID />
                    </div>
                    <div style={personalContent}>
                        기존 비밀번호
                        <div style={commonStyle}>
                            <input
                                value={inputCurPass}
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    setCurPass(e.target.value);
                                }}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={personalContent}>
                        새 비밀번호
                        <div style={commonStyle}>
                            <input
                                value={inputNewPass}
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    setNewPass(e.target.value);
                                }}
                                style={inputStyle}
                            />
                        </div>
                    </div>
                    <div style={personalContent}>
                        새 비밀번호 확인
                        <div style={commonStyle}>
                            <input
                                value={inputConPass}
                                type="password"
                                name="password"
                                onChange={(e) => {
                                    setConPass(e.target.value);
                                }}
                                style={inputStyle}
                            />
                            <DefaultButton onClick={handleChangePass}>
                                변경하기
                            </DefaultButton>
                        </div>
                    </div>
                </div>
            );

            function NameInput() {
                function handleChangeName(event) {
                    event.preventDefault();
                    if (inputName !== "") {
                        console.log(inputName); //API 호출 추가할 부분
                        alert(inputName + "(으)로 닉네임이 변경되었습니다.");
                        setUserName(inputName);
                    } else alert("변경할 닉네임을 입력해주세요.");
                }
                const [inputName, setInputName] = useState("");
                return (
                    <div style={commonStyle}>
                        <input
                            value={inputName}
                            onChange={(e) => {
                                setInputName(e.target.value);
                            }}
                            style={{
                                ...inputStyle,
                                width: 200,
                                marginRight: 20,
                                borderRadius: 15,
                            }}
                            placeholder={userName}
                        />
                        <DefaultButton onClick={handleChangeName}>
                            변경하기
                        </DefaultButton>
                    </div>
                );
            }
            function LoginID() {
                const [inputName, setInputName] = useState("");
                return <div style={commonStyle}>{userLoginID}</div>;
            }
        }
        function SavedRecipe() {
            const RecipeContainer = styled.div`
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                color: white;
                font-family: "APPLESDGOTHICNEO";
                overflow-y: scroll;
            `;
            const RecipeHeader = styled.div`
                font-size: 35px;
                font-weight: 600;
                box-sizing: border-box;
                width: 100%;
                height: 90px;
                border-bottom: 3px solid white;
                display: flex;
                align-items: center;
                padding-inline-start: 50px;
            `;
            const RecipeContent = styled.div`
                padding: 40px;
                font-size: 30px;
                display: flex;
                align-items: center;
                user-select: none;
                cursor: pointer;
            `;
            const dummySavedRecipe = {
                data: [
                    { title: "진짜 안 보면 후회하는 개 쩌는 인삼 닭찜 레시피" },
                    { title: "군침 줄줄 나오는 야무진 스팸김치 달걀밥 레시피" },
                    { title: "5분 순삭 초간단 냉털 샐러드 레시피" },
                    { title: "진짜 안 보면 후회하는 개 쩌는 인삼 닭찜 레시피" },
                    { title: "군침 줄줄 나오는 야무진 스팸김치 달걀밥 레시피" },
                    { title: "5분 순삭 초간단 냉털 샐러드 레시피" },
                ],
            };
            const savedRecipeData = dummySavedRecipe;
            return (
                <RecipeContainer>
                    <RecipeHeader>보관한 레시피</RecipeHeader>
                    {savedRecipeData.data.map((prop) => {
                        return <RecipeContent>{prop.title}</RecipeContent>;
                    })}
                </RecipeContainer>
            );
        }
        function ScrapList() {
            const navigate = useNavigate();
            const dummyScrapData = {
                data: {
                    scrapList: [
                        {
                            post_id: 1,
                            title: "1번 게시물 제목",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 202,
                            title: "202번 게시물 제목",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 301,
                            title: "301번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                    ],
                },
            };
            const scrapListData = dummyScrapData;
            const ScrapContainer = styled.div`
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                color: white;
                font-family: "APPLESDGOTHICNEO";
                overflow-y: scroll;
            `;
            const ScrapHeader = styled.div`
                font-size: 35px;
                font-weight: 600;
                box-sizing: border-box;
                width: 100%;
                height: 90px;
                border-bottom: 3px solid white;
                display: flex;
                align-items: center;
                padding-inline-start: 50px;
            `;
            const ScrapContent = styled.div`
                height: 55px;
                display: flex;
                flex-direction: row;
                font-size: 24px;
                box-sizing: border-box;
                align-items: center;

                cursor: pointer;
                user-select: none;
                border-bottom: 1.5px solid white;
            `;

            return (
                <ScrapContainer>
                    <ScrapHeader>내가 스크랩한 글</ScrapHeader>
                    <ScrapContent style={{ height: 55 }}>
                        <div
                            style={{
                                width: "10%",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            번호
                        </div>
                        <div
                            style={{
                                width: "65%",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            제목
                        </div>
                        <div
                            style={{
                                width: "25%",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            작성일
                        </div>
                    </ScrapContent>
                    {scrapListData.data.scrapList.map((value, index) => {
                        return (
                            <>
                                <ScrapContent
                                    onClick={() => {
                                        navigate("/community/" + value.post_id);
                                    }}>
                                    <div
                                        style={{
                                            width: "10%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}>
                                        {value.post_id}
                                    </div>
                                    <div style={{ width: "65%" }}>
                                        {value.title}
                                    </div>
                                    <div
                                        style={{
                                            width: "25%",
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: 20,
                                        }}>
                                        {value.createdAt}
                                    </div>
                                </ScrapContent>
                            </>
                        );
                    })}
                </ScrapContainer>
            );
        }
        function MyPostList() {
            const navigate = useNavigate();
            const dummyMyPostData = {
                data: {
                    MyPostList: [
                        {
                            post_id: 1,
                            title: "1번 게시물 제목",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 202,
                            title: "202번 게시물 제목",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 301,
                            title: "301번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                        {
                            post_id: 322,
                            title: "322번 더미 데이터",
                            createdAt: "2024-01-01",
                        },
                    ],
                },
            };
            const MyPostListData = dummyMyPostData;
            const MyPostContainer = styled.div`
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                color: white;
                font-family: "APPLESDGOTHICNEO";
                overflow-y: scroll;
            `;
            const MyPostHeader = styled.div`
                font-size: 35px;
                font-weight: 600;
                box-sizing: border-box;
                width: 100%;
                height: 90px;
                border-bottom: 3px solid white;
                display: flex;
                align-items: center;
                padding-inline-start: 50px;
            `;
            const MyPostContent = styled.div`
                height: 55px;
                display: flex;
                flex-direction: row;
                font-size: 24px;
                box-sizing: border-box;
                align-items: center;

                cursor: pointer;
                user-select: none;
                border-bottom: 1.5px solid white;
            `;

            return (
                <MyPostContainer>
                    <MyPostHeader>내가 쓴 글</MyPostHeader>
                    <MyPostContent style={{ height: 55 }}>
                        <div
                            style={{
                                width: "10%",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            번호
                        </div>
                        <div
                            style={{
                                width: "65%",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            제목
                        </div>
                        <div
                            style={{
                                width: "25%",
                                display: "flex",
                                justifyContent: "center",
                            }}>
                            작성일
                        </div>
                    </MyPostContent>
                    {MyPostListData.data.MyPostList.map((value, index) => {
                        return (
                            <>
                                <MyPostContent
                                    onClick={() => {
                                        navigate("/community/" + value.post_id);
                                    }}>
                                    <div
                                        style={{
                                            width: "10%",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}>
                                        {value.post_id}
                                    </div>
                                    <div style={{ width: "65%" }}>
                                        {value.title}
                                    </div>
                                    <div
                                        style={{
                                            width: "25%",
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: 20,
                                        }}>
                                        {value.createdAt}
                                    </div>
                                </MyPostContent>
                            </>
                        );
                    })}
                </MyPostContainer>
            );
        }
    }
}
export default MyPage;
