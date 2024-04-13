import React from "react";
import styled from 'styled-components'
import Topbar from "../components/Topbar";

const PageWrapper=styled.div`
`
const Layout = styled.div`

    width: "100%";
    height: "100%";
    minWidth: 1200;
    margin-top: 100px;
    minHeight: 700;
    border: "solid 1px"; //메인 콘텐츠 컨테이너 크기 표기용, 실제 디자인 X
`
function Home() {
    return (
        <PageWrapper>
            <Topbar/>
            <Layout>
               <h1>Page Homes</h1> 
            </Layout>
        </PageWrapper>
            
            
        
    );
}

export default Home;
