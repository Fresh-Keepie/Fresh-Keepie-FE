//npm install react-icons
import { FaRegHeart, FaHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useUserName } from "./myPage";
import { useFetchBoardList, useFetchPostDetail } from "../utils/axios";
import axios from "axios";
export const API_URL = "http://13.125.120.108:8080/";
const PageWrapper = styled.div`
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
    const { userName } = useUserName();
    const navigate = useNavigate();
    const [board, setBoard] = useState("free");
    const [liked, setLiked] = useState(false);
    const [scraped, setScraped] = useState(false);
    function changeBoard(prop) {
        setBoard(prop);
        navigate("/community");
    }
    //각 게시판 임시 게시글 데이터

    const freePostList = useFetchBoardList("free");
    const recipePostList = useFetchBoardList("recipe");
    const sharePostList = useFetchBoardList("share");
    const POSTS_PER_PAGE = 12;
    return (
        <div>
            <PageWrapper>
                <Topbar />
                <BoardSelect />
                <Routes>
                    <Route
                        path=""
                        element={
                            <>
                                <PostList />
                            </>
                        }
                    />
                    <Route
                        path="write"
                        element={
                            <>
                                <PostWrite />
                            </>
                        }
                    />
                    <Route
                        path=":postID"
                        element={
                            <>
                                <PostView />
                            </>
                        }
                    />
                </Routes>
            </PageWrapper>
        </div>
    );
    function SearchFrame() {
        const inputStyle = {
            fontFamily: "APPLESDGOTHICNEO",
            border: "1.5px solid",
            borderColor: "#9c9c9c",
            borderRadius: 7,
            backgroundColor: "white",
            width: "100%",
            height: 30,
            padding: 5,
        };
        const [searchWord, setSearchWord] = useState("");
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 4,
                }}>
                <input
                    style={{ ...inputStyle, width: 250, height: 16 }}
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder="검색할 제목을 입력해 주세요."
                />
                <DefaultButton style={{ width: 50, margin: 3 }}>
                    검색
                </DefaultButton>
            </div>
        );
    }

    function PostWrite() {
        // 상태 관리를 위한 useState 훅
        const [postBoard, setPostBoard] = useState(board);
        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");

        // 폼 제출 핸들러
        const HandleSubmit = async (event) => {
            event.preventDefault();
            await axios.post(
                API_URL + "board/" + board + "/post",
                {
                    title: title,
                    content: content,
                    userId: "hello",
                },
                {}
            );
            alert("게시글이 등록되었습니다.");
            navigate("/community");
        };

        const inputStyle = {
            fontFamily: "APPLESDGOTHICNEO",
            border: "1.5px solid",
            borderColor: "#9c9c9c",
            borderRadius: 7,
            backgroundColor: "white",
            width: "100%",
            height: "30px",
        };
        const PostBoardSelect = styled.select`
            font-family: "APPLESDGOTHICNEO";
            border: 1.5px solid;
            border-color: #9c9c9c;
            border-radius: 7px;
            width: 110px;
            height: 35px;
        `;
        return (
            <div
                style={{
                    fontFamily: "APPLESDGOTHICNEO",
                    width: "45%",
                }}>
                <div style={{ fontSize: 25, fontWeight: 600 }}>게시글 작성</div>
                <form onSubmit={HandleSubmit}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                marginBottom: 4,
                            }}>
                            <PostBoardSelect
                                value={postBoard}
                                onChange={(e) => setPostBoard(e.target.value)}>
                                <option value="free">자유 게시판</option>
                                <option value="recipe">레시피 게시판</option>
                                <option value="share">나눔 게시판</option>
                            </PostBoardSelect>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ ...inputStyle, marginLeft: 4 }}
                                placeholder="제목을 입력해주세요."
                            />
                        </div>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{
                                ...inputStyle,
                                verticalAlign: "top",
                                textAlign: "start",
                                height: 450,
                                width: "99%",
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

    // 게시글 상세 정보 컴포넌트
    function PostView() {
        const { postID } = useParams();
        const [commentContent, setCommentContent] = useState("");
        const postData = useFetchPostDetail("free", postID);
        let commentList;
        if (postData.commentDtoList) {
            commentList = postData.commentDtoList.slice().reverse();
        }

        const LikeIcon = postData.likeCheck ? FaHeart : FaRegHeart;
        const ScrapIcon = postData.scrapCheck ? FaBookmark : FaRegBookmark;
        const inputStyle = {
            fontFamily: "APPLESDGOTHICNEO",
            border: "1.5px solid",
            borderColor: "#9c9c9c",
            borderRadius: 7,
            backgroundColor: "white",
            width: "100%",
            height: 30,
            padding: 5,
        };

        const PostContainer = styled.div`
            width: 100%;
        `;
        const PostHeader = styled.div`
            width: 100%;
        `;
        const HeaderInfo = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            border-top: 3px solid #05796b;
            border-bottom: 1.5px solid #05796b;
            padding: 10px;
            padding-left: 25px;
            padding-right: 25px;
            font-weight: 600;
        `;
        const HeaderInfoContent = styled.div`
            width: ${(props) => props.width};
            display: flex;
            white-space: nowrap;
            text-overflow: ellipsis; /* 넘친 내용을 생략 부호로 표시 */
        `;
        const PostBody = styled.div`
            padding-top: 25px;
            padding-bottom: 25px;
            padding-left: 30px;
            padding-right: 30px;
            min-height: 200px;
            white-space: pre-wrap;
        `;
        const ReactionContainer = styled.div`
            padding-left: 25px;
            justify-content: flex-end;
            display: flex;
            font-size: 14px;
            font-weight: 600;
            color: #05796b;
        `;
        const CommentContainer = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
        `;
        const CommentHeader = styled.div`
            align-items: flex-end;
            padding-left: 25px;
            padding-right: 25px;
            text-align: bottom;
            font-size: 24px;
            font-weight: 600;
            border-bottom: 3px solid #05796b;
            justify-content: space-between;
            display: flex;
        `;
        const CommentBody = styled.div`
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid;
            padding: 15px;
            padding-left: 25px;
            padding-right: 25px;
        `;
        const CommentInputContainer = styled.div``;
        const handleCommentSubmit = async (event) => {
            event.preventDefault();
            await axios.post(
                API_URL + "board/" + board + "/comment/" + postID,
                {
                    content: commentContent,
                },
                { params: { userId: "hello" } }
            );
            alert("댓글이 등록되었습니다.");
        };
        return (
            <div
                style={{
                    marginBottom: 50,
                    fontFamily: "APPLESDGOTHICNEO",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "center",
                    width: "53%",
                    minWidth: 600,
                }}>
                {/*PostViewContainer였으나, styled div에서는 입력 업데이트 시 재 렌더링이 안돼서 변경 */}
                <PostContainer>
                    <PostHeader>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingLeft: 25,
                            }}>
                            <div style={{ fontSize: 15, fontWeight: 600 }}>
                                {postData.board}
                            </div>
                            <div style={{ fontSize: 30, fontWeight: 600 }}>
                                {postData.title}
                            </div>
                        </div>
                        <HeaderInfo>
                            <HeaderInfoContent
                                width={"20%"}
                                style={{ fontWeight: 600 }}>
                                {postData.nickname}
                            </HeaderInfoContent>

                            <HeaderInfoContent>
                                {postData.postDate}
                                <div style={{ marginLeft: 12 }} />
                                {"댓글 : "}
                                {postData.commentCnt}
                                <div style={{ marginLeft: 12 }} />
                                {"조회수 : "}
                                {postData.view}
                            </HeaderInfoContent>
                        </HeaderInfo>
                    </PostHeader>
                    <PostBody>
                        <div>{postData.content}</div>
                    </PostBody>
                </PostContainer>

                <CommentContainer>
                    <CommentHeader>
                        댓글 {postData.commentCnt}
                        <ReactionContainer>
                            <div
                                style={{
                                    flexDirection: "column",
                                    display: "flex",
                                    alignItems: "center",
                                }}>
                                <LikeIcon
                                    size={30}
                                    color={"#05796b"}
                                    onClick={() => {
                                        HandleLike(postID);
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                                {postData.likeCnt}
                            </div>
                            <div style={{ marginLeft: 7 }} />
                            <ScrapIcon
                                size={30}
                                color={"#05796b"}
                                onClick={() => {
                                    HandleScrap(postID);
                                }}
                                style={{ cursor: "pointer" }}
                            />
                        </ReactionContainer>
                    </CommentHeader>

                    {postData.commentDtoList &&
                        commentList.map((prop) => (
                            <CommentBody>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}>
                                    <div
                                        style={{
                                            fontSize: 17,
                                            fontWeight: 600,
                                        }}>
                                        {prop.nickname}
                                    </div>
                                    <div>{prop.createdAt.split("T")[0]} </div>
                                </div>
                                <div style={{ marginTop: 5 }}>
                                    {prop.content}
                                </div>
                            </CommentBody>
                        ))}
                </CommentContainer>
                <CommentInputContainer></CommentInputContainer>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        fontWeight: 600,
                        fontSize: 18,
                        marginTop: 20,
                    }}
                    onSubmit={handleCommentSubmit}>
                    <div
                        style={{
                            flexDirection: "column",
                            display: "flex",
                            width: 850,
                        }}>
                        {userName}
                        <input
                            value={commentContent}
                            onChange={(e) => {
                                setCommentContent(e.target.value);
                            }}
                            style={{
                                ...inputStyle,
                                width: "98%",
                                resize: "none",
                            }}
                            placeholder="내용을 입력해주세요."
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: 70,
                            backgroundColor: "transparent",
                            border: "none",
                        }}>
                        <DefaultButton style={{ height: 30 }}>
                            등록
                        </DefaultButton>
                    </button>
                </form>
            </div>
        );

        async function HandleLike(postID) {
            if (!liked) {
                const res = await axios.post(
                    API_URL + "board/free/like/" + postID,
                    {},
                    {
                        params: {
                            userId: "hello",
                        },
                    }
                );
                console.log(res);
            } else {
                const res = await axios.delete(
                    API_URL + "board/free/like/" + postID,
                    {
                        params: {
                            userId: "hello",
                        },
                    }
                );
                console.log(res);
            }
            setLiked(!liked);
        }
        async function HandleScrap(postID) {
            if (!scraped) {
                const res = await axios.post(
                    API_URL + "board/free/save/" + postID,
                    {},
                    {
                        params: {
                            userId: "hello",
                        },
                    }
                );
                console.log(res);
            } else {
                await axios.delete(`${API_URL}board/free/save/${postID}`, {
                    params: {
                        userId: "hello",
                    },
                });
            }
            setScraped(!scraped);
        }
    }

    function WriteButton() {
        return (
            <div>
                <Link to="write" style={{ textDecoration: "none" }}>
                    <DefaultButton>글쓰기</DefaultButton>
                </Link>
            </div>
        );
    }
    function BoardSelect() {
        return (
            <div
                style={{
                    paddingBottom: 30,
                }}>
                <BoardContent>
                    <BoardButton
                        onClick={() => {
                            changeBoard("free");
                        }}>
                        <Board>자유 게시판</Board>
                    </BoardButton>
                    <BoarderLine1 />
                    <BoardButton
                        onClick={() => {
                            changeBoard("recipe");
                        }}>
                        <Board>레시피 게시판</Board>
                    </BoardButton>
                    <BoarderLine1 />
                    <BoardButton
                        onClick={() => {
                            changeBoard("share");
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
    // PostList 함수형 컴포넌트 정의
    function PostList() {
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

        // freePostList 배열에서 현재 페이지에 해당하는 포스트만 추출
        let currentPosts, currentBoard;

        switch (board) {
            case "free":
                currentPosts = freePostList.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                );
                currentBoard = freePostList;
                break;
            case "recipe":
                currentPosts = recipePostList.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                );
                currentBoard = recipePostList;
                break;
            case "share":
                currentPosts = sharePostList.slice(
                    indexOfFirstPost,
                    indexOfLastPost
                );
                currentBoard = sharePostList;
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
                    <div style={{ display: "flex", width: "100%" }}>
                        <BoardName>
                            <BoardName>
                                {board === "free"
                                    ? "자유 게시판"
                                    : board === "recipe"
                                    ? "레시피 게시판"
                                    : board === "share"
                                    ? "나눔 게시판"
                                    : "알 수 없는 게시판"}
                            </BoardName>
                        </BoardName>
                        <SearchFrame />
                    </div>
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
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        navigate("/community/" + post.id);
                                    }}>
                                    {post.title}
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#05796b",
                                        }}>
                                        [{post.commentCnt}]
                                    </div>
                                </BodyContent>
                                <BodyContent
                                    style={{
                                        width: "20%",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}>
                                    {post.createdAt.split("T")[0]}
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
                                totalPosts={currentBoard.length}
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
                        {maxPageNumber !== totalPages &&
                            totalPages > maxPageNumberLimit && (
                                <li>
                                    <PageMove onClick={handleNext}>
                                        &gt;
                                    </PageMove>
                                </li>
                            )}
                    </PageFrame>
                </nav>
            );
        }
    }
}

export default Community;
