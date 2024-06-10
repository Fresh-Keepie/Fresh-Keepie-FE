import React, { useState } from "react";
import styled from "styled-components";
import IconLogin from "../assets/images/login.svg";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "../assets/images/loginbutton.svg";
import axios from "axios";



const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 272px;
`;

const LoginImg = styled.img`
    width: 169px;
    height: 72px;
`;
const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    width: 440px;
    height: 69px;
    background-color: white;
    border-radius: 4px;
    border: 1px #a8d1cc solid;
    margin-top: 51px;
    &:focus {
        border: 3px #05796b solid; /* 클릭 시 테두리 색상 변경 */
    }
`;

const Buttoncontainer = styled.div`
    display: flex;
    flex-direction: row;

    width: 440px;
`;
const LinkContainer = styled.div`
    margin-top: 72px;
    display: flex;
`;
const StyledLink = styled(Link)`
    font-size: 18px;
    color: black;
    font-family: "Ownglyph meetme";
    font-weight: 400px;
    text-decoration: none;
`;

const Divider = styled.div`
    width: 14px;
    margin-left: 14px;
`;
const Button = styled.button`
    margin-left: 120px;
    padding: 0;
    background: none;
    margin-top: 51px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
`;
const ButtonImg = styled.img``;
const ButtonText = styled.span`
    position: absolute; /* 텍스트의 위치를 조정하기 위해 필요 */
    top: 50%; /* 이미지의 중앙에 텍스트를 위치시킵니다. */
    left: 50%;
    transform: translate(
        -50%,
        -50%
    ); /* 텍스트를 수평 및 수직 중앙으로 이동시킵니다. */
    color: white; /* 텍스트 색상 설정 */
    font-size: 20px;
    font-family: "Potta One";
    font-weight: 400px;
`;
const Error = styled.div`
    color: red;
    width: 440px;
`;

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

    try {
      const response = await axios.post('http://13.125.120.108:8080/user/login', {
        userId: identifier,
        password: password,
      });
      console.log('서버 응답:', response.data); // 서버 응답 데이터 전체를 콘솔에 출력

      if (response.data === '사용자 로그인 성공') {
        const userData = { userId: identifier,  user_id: response.data.user_id }; // 서버에서 실제 사용자 정보를 받아오면 여기에 추가
        localStorage.setItem('user', JSON.stringify(userData));
        console.log(userData);
        navigate('/home2');
      } else {
        handleErrorResponse(response.data);
      }
    } catch (error) {
      if (error.response) {
        handleErrorResponse(error.response.data);
      } else {
        setIdentifierError('로그인 요청 중 오류가 발생했습니다.');
        setPasswordError('');
      }
    }
  };

  const handleErrorResponse = (data) => {
    if (data === '로그인 실패: Invalid userId or password') {
      setIdentifierError('아이디 또는 비밀번호가 틀렸습니다.');
      setPasswordError('');
    } else if (data === '유효하지 않은 폼 데이터입니다') {
      setIdentifierError('아이디와 비밀번호를 모두 입력해주세요.');
      setPasswordError('');
    } else {
      setIdentifierError('로그인 실패: 알 수 없는 오류가 발생했습니다.');
      setPasswordError('');
    }
  };

    return (
        <Layout>
            <LoginContainer>
                <LoginImg src={IconLogin} alt="login" />
            </LoginContainer>
            <LoginForm onSubmit={handleLogin}>
                <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="아이디"
                />
                <Error>{identifierError && <div>{identifierError}</div>}</Error>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <Error>{passwordError && <div>{passwordError}</div>}</Error>
                <Buttoncontainer>
                    <LinkContainer>
                        <StyledLink to="/signup">회원가입</StyledLink>
                        <Divider>|</Divider>
                        <StyledLink to="/pwcheck">비밀번호 찾기</StyledLink>
                    </LinkContainer>
                    <Button type="submit">
                        <ButtonImg src={LoginIcon} alt="로그인" />
                        <ButtonText>LOGIN</ButtonText>
                    </Button>
                </Buttoncontainer>
            </LoginForm>
        </Layout>
    );
};
export default Login;
