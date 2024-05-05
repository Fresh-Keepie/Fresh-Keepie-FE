import React, { useState } from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";
const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: "100%";
    height: "100%";
`;
const Board = styled.div`
    display: flex;
    justify-content: center;
    color: white;
    font-family: "omyu pretty";
    word-wrap: "break-word";
`;
function Community() {
    const [board, setBoard] = useState("free");
    function changeBoard(prop) {
        setBoard(prop);
        console.log(board);
    }
    const date = new Date("2024-05-03");
    const dummyPosts = Array.from({ length: 16 }).map((_, index) => ({
        id: index + 1,
        title: `게시글 제목 ${index + 1}`,
        date: date.toString(),
    }));

    const POSTS_PER_PAGE = 15;
    return (
        <div>
            <Topbar />
            <Layout>
                <div>
                    <BoardContainer />
                </div>
                <RenderBoard />
            </Layout>
        </div>
    );

    function RenderBoard() {
        switch (board) {
            case "free":
                return <FreeBoard />;
            case "recipe":
                return <div>레시피 게시판입니다.</div>;
            case "share":
                return <div>나눔 게시판입니다.</div>;
            default:
                return <div>게시판을 선택해주세요.</div>;
        }
    }

    function FreeBoard() {
        const [currentPage, setCurrentPage] = useState(1);

        const indexOfLastPost = currentPage * POSTS_PER_PAGE;
        const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
        const currentPosts = dummyPosts.slice(
            indexOfFirstPost,
            indexOfLastPost
        );

        const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <div>
                <h2>자유 게시판</h2>
                {currentPosts.map((post) => (
                    <div
                        key={post.id}
                        style={{ display: "flex", flexDirection: "row" }}>
                        {post.id}
                        {post.title}
                        {post.date}
                    </div>
                ))}
                <Pagination
                    postsPerPage={POSTS_PER_PAGE}
                    totalPosts={dummyPosts.length}
                    paginate={paginate}
                />
            </div>
        );
    }

    function Pagination({ postsPerPage, totalPosts, paginate }) {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav>
                <ul>
                    {pageNumbers.map((number) => (
                        <li key={number}>
                            <a onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
    function BoardContainer() {
        return (
            <div
                style={{
                    padding: 20,
                    paddingTop: 40,
                }}>
                <div
                    style={{
                        width: 627,
                        height: 80,
                        background: "#05796B",
                        borderRadius: 50,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                    <span
                        style={{
                            width: 204,
                            fontSize: 34,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            changeBoard("free");
                        }}>
                        <Board>
                            <div>자유 게시판</div>
                        </Board>
                    </span>
                    <BoarderLine1 />
                    <span
                        style={{
                            width: 204,
                            fontSize: 34,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            changeBoard("recipe");
                        }}>
                        <Board>
                            <div>레시피 게시판</div>
                        </Board>
                    </span>
                    <BoarderLine1 />
                    <span
                        style={{
                            width: 204,
                            fontSize: 34,
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            changeBoard("share");
                        }}>
                        <Board>
                            <div>나눔 게시판</div>
                        </Board>
                    </span>
                </div>
            </div>
        );
    }
    function BoarderLine1() {
        //게시판 컨테이너 구분선, Styled Component 적용 안됨
        return (
            <div
                style={{
                    width: 0,
                    height: 46,
                    border: "2px #93C5BF solid",
                }}
            />
        );
    }
}
export default Community;
