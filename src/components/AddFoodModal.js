// src/components/MyModal.js
import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import IconClose from '../assets/images/IconClose.svg';
import IconAdd from '../assets/images/ButtonAdd.svg';
import axios from 'axios'

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
`;Modal.setAppElement('#root');

const AddFoodModal = ({ isOpen, onRequestClose, addProduct }) => {
  const [productName, setProductName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!productName || !expiryDate || !quantity) {
      setError('모든 필드를 채워주세요.');
      return;
    }

    const data = JSON.stringify({
      productName: productName,
      amount: parseInt(quantity, 10),
      userId: 'sunny' // 유저 ID를 하드코딩
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://13.125.120.108:8080/ingredient/create',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log('서버 응답:', response.data);

      if (response.data.message === 'success') {
        addProduct({ productName, expiryDate, quantity });
        setProductName('');
        setExpiryDate('');
        setQuantity('');
        onRequestClose();
      } else {
        setError('상품 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('요청 중 오류 발생:', error);
      if (error.response) {
        console.error('서버 오류:', error.response.data);
        setError(`서버 오류: ${error.response.data.message || '알 수 없는 오류'}`);
      } else {
        setError('서버와의 통신 중 오류가 발생했습니다.');
      }
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
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <AddButton onClick={handleSubmit}>
          <AddImg src={IconAdd} />
          <AddText>등록</AddText>
        </AddButton>
      </ModalContent>
    </Modal>
  );
};

export default AddFoodModal;