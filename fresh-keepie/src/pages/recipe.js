import React from "react";
import styled from 'styled-components'
import Topbar from "../components/Topbar";

const Layout=styled.div`
display : flex;
flex-direction : column;
justify-content :center;
align-items: center;
`

function Recipe() {
    return (
        <Layout>
        <Topbar />
        </Layout>
        
    );
}

export default Recipe;
