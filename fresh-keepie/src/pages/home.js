import React from "react";
import styled from 'styled-components'
import Topbar from "../components/Topbar";
import Calendar from "../components/Calendar"

const Layout=styled.div`
display : flex;
flex-direction : column;
justify-content :center;
align-items: center;
width : 100%;
flex-shrink : 0;
`
const ContentLayout = styled.div`
display : flex;
flex-direction : row;
margin-top : 31px;
justify-content : flex-start;
width : 100%;
flex-shrink : 0;

`
const ItemLayout = styled.div`
width: 60%;
height: 903px;
flex-shrink: 0;
border-radius: 50px;
background: rgba(168, 209, 204, 0.20);
margin-left : 20px;
flex-shrink : 0;
`
const DateLayout = styled.div`
width: 36%;
height: 903px;
flex-shrink: 0;
border-radius: 50px;
background: #ECF6E8;
margin-left : 20px;
`

function Home() {
    return (
    <Layout>
    <Topbar />
    <ContentLayout>
    <ItemLayout>
        <Calendar />


    </ItemLayout>
    <DateLayout>

    </DateLayout>
    </ContentLayout>

    </Layout>
            
            
        
    );
}

export default Home;
