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

function Community() {
    const [board, setBoard] = useState("자유게시판");
    function changeBoard(prop) {
        setBoard(prop);
        console.log(board);
    }
    const dummyPosts = Array.from({ length: 350 }).map((_, index, arr) => ({
        id: arr.length - index,
        title: `게시글 제목 ${4}`,
        comments: 3,
        date: "2024-05-13",
    }));

    const POSTS_PER_PAGE = 15;
    return (
        <div>
            <Topbar />
            <Layout>
                <div>
                    <BoardContainer />
                </div>
                <BoardFrame />
            </Layout>
        </div>
    );

    function RenderBoard() {
        //추후에 사용가능
        return <BoardFrame />;
        /** 
        switch (board) {
            case "자유 게시판":
                return <BoardFrame />;
            case "recipe":
                return <div>레시피 게시판입니다.</div>;
            case "share":
                return <div>나눔 게시판입니다.</div>;
            default:
                return <div>게시판을 선택해주세요.</div>;
        } 
        */
    }
    // BoardFrame 함수형 컴포넌트 정의
    function BoardFrame() {
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

        // dummyPosts 배열에서 현재 페이지에 해당하는 포스트만 추출
        const currentPosts = dummyPosts.slice(
            indexOfFirstPost,
            indexOfLastPost
        );
        // 페이지 번호를 받아와 현재 페이지 상태를 업데이트하는 함수
        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        const BoardHeader = styled.div`
            width: 70%;
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
            width: 70%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: "row";
            border-bottom: 1px #05796b solid;
            font-family: "APPLESDGOTHICNEO";
        `;
        const HeaderContent = styled.div`
            justify-content: center;
            font-weight: 600;
            display: flex;
        `;
        const BodyContent = styled.div`
            justify-content: center;
            align-items: center;
            display: flex;
            height: 40px;
        `;
        return (
            <>
                {board}
                <div
                    style={{
                        width: "90%",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}>
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

                    {currentPosts.map((post) => (
                        <BoardBody
                            key={post.id}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                            <BodyContent style={{ width: "15%" }}>
                                {post.id}
                            </BodyContent>
                            <BodyContent
                                style={{
                                    width: "65%",
                                    justifyContent: "flex-start",
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
                            <BodyContent style={{ width: "20%" }}>
                                {post.date}
                            </BodyContent>
                        </BoardBody>
                    ))}
                    <Pagination
                        postsPerPage={POSTS_PER_PAGE}
                        totalPosts={dummyPosts.length}
                        paginate={paginate}
                    />
                </div>
            </>
        );
        function Pagination({ postsPerPage, totalPosts, paginate }) {
            const pageNumbers = [];
            const totalPages = Math.ceil(totalPosts / postsPerPage);
            for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
                pageNumbers.push(i);
            }
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

            // 이전 페이지로 이동
            const handlePrev = () => {
                if (currentPage - maxPageNumberLimit < 1) setCurrentPage(1);
                else setCurrentPage(currentPage - maxPageNumberLimit);
                /*
                if ((currentPage - 1) % maxPageNumberLimit === 0) {
                    setMaxPageNumber(maxPageNumber - maxPageNumberLimit);
                    setMinPageNumber(minPageNumber - maxPageNumberLimit);
                }
                */
            };

            // 다음 페이지로 이동
            const handleNext = () => {
                setCurrentPage(
                    Math.ceil(currentPage / maxPageNumberLimit) *
                        maxPageNumberLimit +
                        1
                );
                setMinPageNumber(currentPage);
                if (minPageNumber + maxPageNumberLimit - 1 > totalPages)
                    setMaxPageNumber(totalPages);
                else setMaxPageNumber(currentPage + maxPageNumberLimit - 1);
                /*
                setCurrentPage(currentPage + 1);
                if (currentPage + 1 > maxPageNumber) {
                    setMaxPageNumber(maxPageNumber + maxPageNumberLimit);
                    setMinPageNumber(minPageNumber + maxPageNumberLimit);
                    console.log(maxPageNumber);
                }*/
            };
            return (
                <nav>
                    <ul
                        style={{
                            listStyleType: "none",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            userSelect: "none",
                        }}>
                        {minPageNumber}
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
                        {currentPage < totalPages - maxPageNumberLimit && (
                            <li>
                                <PageMove onClick={handleNext}>&gt;</PageMove>
                            </li>
                        )}
                        {maxPageNumber}
                    </ul>
                </nav>
            );
        }
    }

    function BoardContainer() {
        return (
            <div
                style={{
                    padding: 20,
                    paddingTop: 40,
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
    }
    function BoarderLine1() {
        //게시판 컨테이너 구분선, Styled Component 적용 안됨
        return (
            <div
                style={{
                    width: 0,
                    height: 46,
                    border: "1.5px #93C5BF solid",
                }}
            />
        );
    }
}
export default Community;
