import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Board = styled.div`
    display: flex;
    justify-content: center;
    color: white;
    font-family: "omyu pretty";
    word-wrap: "break-word";
`;
const BoardContent = styled.div`
    width: 627px;
    height: 80px;
    background: #05796b;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const BoardButton = styled.div`
    width: 204px;
    cursor: pointer;
    font-size: 34px;
`;
const DefaultButton = styled.div`
    background-color: #05796b;
    font-size: 16px;
    width: 70px;
    height: 20px;
    padding: 4px;
    color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "APPLESDGOTHICNEO";
    user-select: none;
    cursor: pointer;
`;

function Community() {
    const navigate = useNavigate();
    const [board, setBoard] = useState("자유 게시판");
    function changeBoard(prop) {
        setBoard(prop);
        navigate("/community");
    }
    //각 게시판 임시 게시글 데이터
    const freeDummys = Array.from({ length: 679 }).map((_, index, arr) => ({
        id: arr.length - index,
        title: `자유 게시판 게시글 ${arr.length - index}`,
        comments: 3,
        date: "2024-05-13",
    }));
    const recipeDummys = Array.from({ length: 543 }).map((_, index, arr) => ({
        id: arr.length - index,
        title: `레시피 게시판 게시글 ${arr.length - index}`,
        comments: 4,
        date: "2024-05-13",
    }));
    const shareDummys = Array.from({ length: 888 }).map((_, index, arr) => ({
        id: arr.length - index,
        title: `나눔 게시판 게시글 ${arr.length - index}`,
        comments: 7,
        date: "2024-05-13",
    }));
    const POSTS_PER_PAGE = 12;
    function CommunityWrite() {
        return (
            <>
                <WriteFrame />
            </>
        );
        function WriteFrame() {
            // 상태 관리를 위한 useState 훅
            const [postBoard, setPostBoard] = useState(board);
            const [title, setTitle] = useState("");
            const [content, setContent] = useState("");

            // 폼 제출 핸들러
            const handleSubmit = (event) => {
                event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
                console.log({ postBoard, title, content });
                alert(board + "에 게시글이 등록되었습니다.");
                navigate("/community");
            };
            const inputStyle = {
                marginBottom: 10,
                fontFamily: "APPLESDGOTHICNEO",
                border: "1.5px solid",
                borderColor: "#9c9c9c",
                borderRadius: 7,
                backgroundColor: "white",
                width: "100%",
                height: 30,
                padding: 5,
            };
            const PostBoardSelect = styled.select`
                margin-bottom: 10px;
                font-family: "APPLESDGOTHICNEO";
                border: 1.5px solid;
                border-color: #9c9c9c;
                border-radius: 7px;
                width: 110px;
                height: 30px;
            `;
            return (
                <div style={{ fontFamily: "APPLESDGOTHICNEO" }}>
                    <BoardSelectContainer />
                    <div style={{ fontSize: 25, fontWeight: 600 }}>
                        게시글 작성
                    </div>
                    <form onSubmit={handleSubmit}>
                        <PostBoardSelect
                            value={postBoard}
                            onChange={(e) => setPostBoard(e.target.value)}>
                            <option value="자유 게시판">자유 게시판</option>
                            <option value="레시피 게시판">레시피 게시판</option>
                            <option value="나눔 게시판">나눔 게시판</option>
                        </PostBoardSelect>
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={inputStyle}
                                placeholder="제목을 입력해주세요."
                            />
                        </div>
                        <div>
                            <textarea
                                content={content}
                                onChange={setContent}
                                style={{
                                    ...inputStyle,
                                    height: 450,
                                    resize: "none",
                                }}
                                placeholder="내용을 입력해주세요."
                            />
                        </div>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                            }}>
                            <button
                                type="submit"
                                style={{
                                    width: 70,
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}>
                                <DefaultButton>등록</DefaultButton>
                            </button>
                        </div>
                    </form>
                </div>
            );
        }
    }

    return (
        <div>
            <Layout>
                <Topbar />
                <Routes>
                    <Route
                        path=""
                        element={
                            <>
                                <BoardSelectContainer />
                                <BoardContainer />
                            </>
                        }
                    />
                    <Route path="write" element={<CommunityWrite />} />
                </Routes>
            </Layout>
        </div>
    );
    function WriteButton() {
        return (
            <div>
                <Link to="write" style={{ textDecoration: "none" }}>
                    <DefaultButton>글쓰기</DefaultButton>
                </Link>
            </div>
        );
    }
    function BoardSelectContainer() {
        return (
            <div
                style={{
                    paddingBottom: 30,
                    paddingTop: 70,
                }}>
                <BoardContent>
                    <BoardButton
                        onClick={() => {
                            changeBoard("자유 게시판");
                        }}>
                        <Board>자유 게시판</Board>
                    </BoardButton>
                    <BoarderLine1 />
                    <BoardButton
                        onClick={() => {
                            changeBoard("레시피 게시판");
                        }}>
                        <Board>레시피 게시판</Board>
                    </BoardButton>
                    <BoarderLine1 />
                    <BoardButton
                        onClick={() => {
                            changeBoard("나눔 게시판");
                        }}>
                        <Board>나눔 게시판</Board>
                    </BoardButton>
                </BoardContent>
            </div>
        );
        function BoarderLine1() {
            //게시판 컨테이너 구분선, Styled Component 적용 안됨
            return (
                <div
                    style={{
                        width: 0,
                        height: 46,
                        border: "1.5px #93C5BF solid",
                        borderRadius: 5,
                    }}
                />
            );
        }
    }
    // BoardContainer 함수형 컴포넌트 정의
    function BoardContainer() {
        // 현재 페이지 상태를 관리하는 useState 훅. 초기값은 1
        const [currentPage, setCurrentPage] = useState(1);
        // 최대 표시할 페이지 번호의 수
        const maxPageNumberLimit = 10;
        const [maxPageNumber, setMaxPageNumber] = useState(maxPageNumberLimit);
        const [minPageNumber, setMinPageNumber] = useState(0);
        // 현재 페이지에서 마지막 포스트의 인덱스 계산
        const indexOfLastPost = currentPage * POSTS_PER_PAGE;
        // 현재 페이지에서 첫 번째 포스트의 인덱스 계산
        const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;

        // freeDummys 배열에서 현재 페이지에 해당하는 포스트만 추출
        let currentPosts;

        switch (board) {
            case "자유 게시판":
                currentPosts = freeDummys.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                );
                break;
            case "레시피 게시판":
                currentPosts = recipeDummys.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                );
                break;
            case "나눔 게시판":
                currentPosts = shareDummys.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                );
                break;
            default:
                console.log("Invalid board value");
        }

        // 페이지 번호를 받아와 현재 페이지 상태를 업데이트하는 함수
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        const BoardFrame = styled.div`
            width: 57%;
            align-items: center;
            display: flex;
            flex-direction: column;
            min-width: 700px;
        `;
        const BoardHeader = styled.div`
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: "row";
            background-color: #ddeede;
            border-top: 3px #05796b solid;
            border-bottom: 1px #05796b solid;
            font-family: "APPLESDGOTHICNEO";
        `;
        const BoardBody = styled.div`
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: "row";
            border-bottom: 1px #05796b solid;
            font-family: "APPLESDGOTHICNEO";
        `;
        const HeaderContent = styled.div`
            justify-content: center;
            font-size: 18px;
            font-weight: 600;
            display: flex;
        `;
        const BodyContent = styled.div`
            justify-content: center;
            align-items: center;
            display: flex;
            height: 40px;
        `;
        const BoardName = styled.div`
            font-family: "APPLESDGOTHICNEO";
            font-size: 25px;
            font-weight: 600;
            width: 100%;
        `;

        return (
            <>
                <BoardFrame>
                    <BoardName>{board}</BoardName>
                    <BoardHeader>
                        <HeaderContent style={{ width: "15%" }}>
                            번호
                        </HeaderContent>
                        <HeaderContent style={{ width: "65%" }}>
                            제목
                        </HeaderContent>
                        <HeaderContent style={{ width: "20%" }}>
                            등록일
                        </HeaderContent>
                    </BoardHeader>
                    {/* 게시판 본문(게시물) 표시 */}
                    {currentPosts.map((post) => (
                        <BoardBody
                            key={post.id}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            <>
                                <BodyContent style={{ width: "15%" }}>
                                    {post.id}
                                </BodyContent>

                                <BodyContent
                                    style={{
                                        width: "65%",
                                        justifyContent: "flex-start",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}>
                                    {post.title}
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#05796b",
                                        }}>
                                        [{post.comments}]
                                    </div>
                                </BodyContent>
                                <BodyContent
                                    style={{
                                        width: "20%",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}>
                                    {post.date}
                                </BodyContent>
                            </>
                        </BoardBody>
                    ))}
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <div
                            style={{
                                position: "absolute",
                            }}>
                            <Pagination
                                postsPerPage={POSTS_PER_PAGE}
                                totalPosts={freeDummys.length}
                                paginate={paginate}
                            />
                        </div>

                        <div
                            style={{
                                width: "100%",
                                justifyContent: "flex-end",
                                marginTop: 8,
                                display: "flex",
                            }}>
                            <WriteButton />
                        </div>
                    </div>
                </BoardFrame>
            </>
        );

        function Pagination({ postsPerPage, totalPosts, paginate }) {
            const pageNumbers = [];
            const totalPages = Math.ceil(totalPosts / postsPerPage);
            for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
                pageNumbers.push(i);
            }

            // 이전 페이지로 이동
            const handlePrev = () => {
                setMaxPageNumber(minPageNumber);
                setMinPageNumber(minPageNumber - maxPageNumberLimit);
                setCurrentPage(minPageNumber - maxPageNumberLimit + 1);
            };

            // 다음 페이지로 이동
            const handleNext = () => {
                setMinPageNumber(minPageNumber + maxPageNumberLimit);
                if (maxPageNumber + maxPageNumberLimit - 1 > totalPages)
                    setMaxPageNumber(totalPages);
                else setMaxPageNumber(maxPageNumber + maxPageNumberLimit);
                setCurrentPage(minPageNumber + maxPageNumberLimit + 1);
            };
            const SelectedPageNumber = styled.div`
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 9px;
                width: 23px;
                margin: 7px;
                cursor: pointer;
                background-color: #05796b;
                aspect-ratio: 1;
                color: white;
                font-weight: 600;
                font-size: 15px;
                font-family: "APPLESDGOTHICNEO";
            `;
            const PageNumber = styled.div`
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 9px;
                width: 23px;
                margin: 7px;
                cursor: pointer;
                aspect-ratio: 1;
                font-size: 15px;
                font-family: "APPLESDGOTHICNEO";
            `;
            const PageMove = styled.div`
                color: #05796b;
                font-size: 15px;
                font-weight: 600;
                font-family: "APPLESDGOTHICNEO";
                cursor: pointer;
            `;
            const PageFrame = styled.div`
                list-style-type: none;
                padding: 8px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                user-select: none; //텍스트 선택 불가 옵션
            `;
            return (
                <nav>
                    <PageFrame>
                        {currentPage > maxPageNumberLimit && (
                            <li>
                                <PageMove onClick={handlePrev}>&lt;</PageMove>
                            </li>
                        )}
                        <div
                            style={{
                                width: 370,
                                justifyContent: "center",
                                display: "flex",
                            }}>
                            <div
                                style={{
                                    width: 360,
                                    display: "flex",
                                    flexDirection: "row",
                                    listStyleType: "none",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                {pageNumbers.map((number) => {
                                    if (
                                        number < maxPageNumber + 1 &&
                                        number > minPageNumber
                                    ) {
                                        return (
                                            <li key={number}>
                                                {currentPage === number ? (
                                                    <SelectedPageNumber
                                                        onClick={() => {
                                                            paginate(number);
                                                            setCurrentPage(
                                                                number
                                                            );
                                                        }}>
                                                        {number}
                                                    </SelectedPageNumber>
                                                ) : (
                                                    <PageNumber
                                                        onClick={() => {
                                                            paginate(number);
                                                            setCurrentPage(
                                                                number
                                                            );
                                                        }}>
                                                        {number}
                                                    </PageNumber>
                                                )}
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                        {maxPageNumber != totalPages && (
                            <li>
                                <PageMove onClick={handleNext}>&gt;</PageMove>
                            </li>
                        )}
                    </PageFrame>
                </nav>
            );
        }
    }
}

export default Community;
