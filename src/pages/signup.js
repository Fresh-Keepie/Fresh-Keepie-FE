import React, { useState } from "react";
import styled from "styled-components";
import IconSignup from "../assets/images/signup.svg";
import LoginIcon from "../assets/images/loginbutton.svg";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const SignupContainer = styled.div`
    margin-top: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SignupImg = styled.img`
    width: 221px;
    height: 72px;
`;

const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 53px;
`;

const Input = styled.input`
    width: 440px;
    height: 69px;
    background-color: white;
    border-radius: 4px;
    border: 1px #a8d1cc solid;
    margin-bottom: 22px;
    &:focus {
        border: 3px #05796b solid; /* 클릭 시 테두리 색상 변경 */
    }
`;
const Button = styled.button`
    background: none;
    cursor: pointer;
    position: relative;
    border: none;
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
const Error = styled.div`
    color: red;
    width: 440px;
`;

const DateInput = styled(DatePicker)`
    width: 440px;
    height: 69px;
    background-color: white;
    border-radius: 4px;
    border: 1px #a8d1cc solid;
    margin-bottom: 22px;

    display: block; /* 블록 요소로 설정하여 한 줄에 하나의 요소가 표시되도록 함 */
    line-height: 69px; /* 세로 중앙 정렬을 위해 추가 */
    &:focus {
        border: 3px #05796b solid;
    }
`;
const Signup = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
        } else if (!isRegistered) {
            setError("");
            setIsRegistered(true);
            navigate("/login");
            console.log("회원가입 성공");
        }
    };

    return (
        <Layout>
            <SignupContainer>
                <SignupImg src={IconSignup} alt="signup" />
            </SignupContainer>
            <SignupForm onSubmit={handleSignup}>
                <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="아이디"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                />
                <Error>{error && <div>{error}</div>}</Error>
                <Input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임"
                />
                <DateInput
                    selected={birthday}
                    onChange={(date) => setBirthday(date)}
                    placeholderText="생년월일"
                    dateFormat="yyyy-MM-dd"
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일"
                />
                <Button type="submit">
                    <ButtonImg src={LoginIcon} alt="회원가입" />
                    <ButtonText>SIGN UP</ButtonText>
                </Button>
            </SignupForm>
        </Layout>
    );
};

export default Signup;
