import React, { useState } from "react";
import Modal from 'react-modal';
import styled from 'styled-components';
import IconClose from '../assets/images/IconClose.svg';
import IconAdd from '../assets/images/ButtonAdd.svg';

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

const InputContainer=styled.div`
 display : flex;
  justify-content : center;
  align-items : center;
  margin-top: 70px;
`

const Input = styled.input`

  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #ccc;
 
  text-align : center;
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
const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const AddFridgeModal = ({ isOpen, onRequestClose, addFridge }) => {
  const [fridgeName, setFridgeName] = useState('');

  const handleAddFridge = () => {
    if (fridgeName.trim()) {
      addFridge({ name: fridgeName });
      setFridgeName('');
      onRequestClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}
    style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          maxWidth: '397px',
          maxHeight: '363px',
          margin: 'auto',
          padding: '10px',
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
        <AddButton onClick={handleAddFridge}>
          <AddImg src={IconAdd} />
          <AddText>등록</AddText>
        </AddButton>
    
      </ModalContent>
    </Modal>
  );
};

export default AddFridgeModal;
