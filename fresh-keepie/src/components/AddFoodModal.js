// src/components/MyModal.js
import React, { useState, useEffect} from 'react';
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  color: #05796b;
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: normal;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 74px;
  margin-top: 21px;
`;

const NameInput = styled.input`
  margin-left: 55px;
  width: 133px;
  border-radius: 10px;
  border: 1px solid black;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const DateInput = styled.input`
  margin-left: 34px;
  width: 133px;
  border-radius: 10px;
  border: 1px solid black;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const NumberInput = styled.input`
  margin-left: 74px;
  width: 133px;
  border-radius: 10px;
  border: 1px solid black;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const AddButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 166px;
  margin-top: 66px;
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

Modal.setAppElement('#root');

const AddFoodModal = ({ isOpen, onRequestClose, addProduct }) => {
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    console.log("addProduct in MyModal:", addProduct); // 콘솔 로그 추가
  }, [addProduct]);

  const handleSubmit = () => {
    if (productName && expiryDate && quantity) {
      console.log("handleSubmit called with:", { productName, expiryDate, quantity }); // 콘솔 로그 추가
      addProduct({ productName, expiryDate, quantity });
      setProductName('');
      setExpiryDate('');
      setQuantity('');
      onRequestClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
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
      }}
    >
      <ModalContent>
        <Title>
          <h2>상품 등록</h2>
          <CloseButton onClick={onRequestClose}>
            <CloseImg src={IconClose} />
          </CloseButton>
        </Title>
        <Content>
          <Item>
            <ItemName>상품명</ItemName>
            <NameInput
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Item>
          <Item>
            <ItemName>소비기한</ItemName>
            <DateInput
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </Item>
          <Item>
            <ItemName>개수</ItemName>
            <NumberInput
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Item>
        </Content>
        <AddButton onClick={handleSubmit}>
          <AddImg src={IconAdd} />
          <AddText>등록</AddText>
        </AddButton>
      </ModalContent>
    </Modal>
  );
};

export default AddFoodModal;
