import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import startlogo from "../assets/images/startlogo.svg";
import IconLogin from "../assets/images/loginbutton.svg";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Logocontainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 405px;
`;
const Logoimg = styled.img`
    width: 345px;
    height: 72px;
`;
const LinkContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LinkIcon = styled.img`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledLink = styled(Link)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 50px;
    color: white;
    text-decoration: none;
    font-family: PottaOne;
    font-weight: 400;
`;
export default function start() {
    return (
        <Layout>
            <Logocontainer>
                <Logoimg src={startlogo} alt="logo" />
            </Logocontainer>
            <LinkContainer>
                <LinkIcon src={IconLogin} alt="login" />
                <StyledLink to="/login">LOGIN</StyledLink>
            </LinkContainer>
        </Layout>
    );
}
