import React from "react";
import styled from "styled-components";
import Topbar from "../components/Topbar";

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Layout = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    min-width: 1200;
    margin-top: 100px;
    min-height: 700;
    border: 1px black solid; //메인 콘텐츠 컨테이너 크기 표기용, 실제 디자인 X
`;
function Home() {
    return (
        <PageWrapper>
            <Topbar />
            <Layout>
                <h1>Page Homes</h1>
            </Layout>
        </PageWrapper>
    );
}

export default Home;
