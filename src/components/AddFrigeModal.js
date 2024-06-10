import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import styled from "styled-components";
import IconClose from "../assets/images/IconClose.svg";
import IconAdd from "../assets/images/ButtonAdd.svg";

const ModalContent = styled.div`
    background: white;
    border-radius: 10px;
    padding: 0;
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: -10px;
    margin-bottom: 30px;
`;

const CloseButton = styled.button`
    background: none;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;
    margin-top: -10px;
`;

const CloseImg = styled.img``;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #ccc;
    text-align: center;
`;

const AddButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 166px;
    margin-top: 46px;
`;

const AddImg = styled.img`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
`;

const AddText = styled.span`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    color: white;
    font-size: 16px;
`;

const Error = styled.div`
    color: red;
    text-align: center;
    margin-top: 20px;
`;

const AddFridgeModal = ({ isOpen, onRequestClose, addFridge, userId }) => {
    const [fridgeName, setFridgeName] = useState("");
    const [error, setError] = useState("");

    const handleAddFridge = async () => {
        if (!fridgeName.trim()) {
            setError("냉장고 이름을 입력하세요.");
            return;
        }

        const data = {
            userId: "sunny",
            name: fridgeName,
        };

        const config = {
            method: "post",
            url: "http://13.125.120.108:8080/product/fridge",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(data),
        };

        try {
            const response = await axios.request(config);
            console.log("서버 응답:", response.data);

            if (response.data.message === "success") {
                addFridge({ id: response.data.id, name: fridgeName });
                setFridgeName("");
                onRequestClose();
            } else {
                setError("냉장고 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("요청 중 오류 발생:", error);
            if (error.response) {
                console.error("서버 오류:", error.response.data); // 서버에서 반환된 오류 메시지 출력
                setError(
                    `서버 오류: ${
                        error.response.data.message || "알 수 없는 오류"
                    }`
                );
            } else {
                setError("서버와의 통신 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    maxWidth: "397px",
                    maxHeight: "363px",
                    margin: "auto",
                    padding: "10px",
                },
            }}>
            <ModalContent>
                <Title>
                    <h2>냉장고 등록</h2>
                    <CloseButton onClick={onRequestClose}>
                        <CloseImg src={IconClose} />
                    </CloseButton>
                </Title>
                <InputContainer>
                    <Input
                        type="text"
                        placeholder="냉장고 이름"
                        value={fridgeName}
                        onChange={(e) => setFridgeName(e.target.value)}
                    />
                </InputContainer>
                {error && <Error>{error}</Error>}
                <AddButton onClick={handleAddFridge}>
                    <AddImg src={IconAdd} />
                    <AddText>등록</AddText>
                </AddButton>
            </ModalContent>
        </Modal>
    );
};

export default AddFridgeModal;
