import { useState, useEffect } from "react";
import axios from "axios";
export const API_URL = "http://13.125.120.108:8080/";

export function useFetchBoardList(board) {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get(
                    API_URL + "board/" + board + "/list",
                    {
                        params: {
                            userId: "hello",
                            page: 1,
                        },
                    }
                );
                console.dir(response.data.content, { depth: null });
                setBoardList(response.data.content);
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, [board]);

    return boardList;
}

export function useFetchPostDetail(board, id) {
    const [postDetail, setPostDetail] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get(
                    API_URL + "board/" + board + "/post/" + id,
                    {
                        params: {
                            userId: "hello",
                        },
                    }
                );
                console.dir(response.data, { depth: null });
                setPostDetail(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, [board, id]);
    return postDetail;
}

export function usePost(board, title, content) {
    const [postDetail, setPostDetail] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.post(
                    API_URL + "board/" + board + "/post/",
                    {
                        title: title,
                        content: content,
                        userId: "hello",
                    },
                    {
                        params: {
                            userId: "hello",
                        },
                    }
                );
                console.dir(response.data, { depth: null });
                setPostDetail(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, [board, content, title]);
    return postDetail;
}

export function useFetchMyBoardList() {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get(API_URL + "mypage/post", {
                    params: {
                        userId: "hello",
                    },
                });
                console.dir(response.data.content, { depth: null });
                setBoardList(response.data.content);
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, []);

    return boardList;
}
export function useFetchScrapBoardList() {
    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get(API_URL + "mypage/save", {
                    params: {
                        userId: "hello",
                    },
                });
                console.dir(response.data.content, { depth: null });
                setBoardList(response.data.content);
            } catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, []);

    return boardList;
}
