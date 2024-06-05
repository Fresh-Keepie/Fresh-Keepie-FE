import React, { useState } from "react";
import styled from "styled-components";
import IconPwCheck from "../assets/images/pwcheck.svg";
import LoginIcon from "../assets/images/loginbutton.svg";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const PwCheckImg = styled.img`
    margin-top: 272px;
    width: 269px;
    height: 72px;
`;
const PwcheckForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Info = styled.div`
    margin-top: 17px;
    font-size: 24px;
    font-weight: 400px;
    font-family: Ownglyph meetme;
    color: black;
    margin-bottom: 28px;
`;
const Input = styled.input`
    width: 440px;
    height: 69px;
    background-color: white;
    border-radius: 4px;
    border: 1px #a8d1cc solid;
    margin-bottom: 51px;
    &:focus {
        border: 3px #05796b solid; /* 클릭 시 테두리 색상 변경 */
    }
`;
const Button = styled.button`
    background: none;
    cursor: pointer;
    position: relative;
    border: none;
    margin-left: 350px;
`;
const ButtonImg = styled.img``;
const ButtonText = styled.div`
    position: absolute; /* 텍스트의 위치를 조정하기 위해 필요 */
    top: 50%; /* 이미지의 중앙에 텍스트를 위치시킵니다. */
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-family: Potta One;
    font-weight: 400px;
`;

const Pwcheck = () => {
    const [identifier, setIdentifier] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handlePwcheck = (e) => {
        e.preventDefault();
        navigate("/home");
    };

    return (
        <Layout>
            <PwCheckImg src={IconPwCheck} alt="pwcheck" />
            <Info>입력된 정보로 임시 비밀번호가 전송됩니다.</Info>
            <PwcheckForm onSubmit={handlePwcheck}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                />
                <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="아이디"
                />
                <Button type="submit">
                    <ButtonImg src={LoginIcon} alt="전송" />
                    <ButtonText>OK</ButtonText>
                </Button>
            </PwcheckForm>
        </Layout>
    );
};
export default Pwcheck;
