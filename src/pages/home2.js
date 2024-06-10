import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Topbar from "../components/Topbar";
//import Calendar from "../components/Calendar";
import Dday1 from "../assets/images/dday1.svg";
import Dday7 from "../assets/images/dday7.svg";
import Dday30 from "../assets/images/dday30.svg";
import MyModal from "../components/AddFoodModal.js";
import AddFridgeModal from "../components/AddFrigeModal.js"; // Add this import
import IconAdd from "../assets/images/IconAdd.svg";
import dayjs from 'dayjs';
import IconDday from '../assets/images/ddaycontainer.svg';
import IconRefr from '../assets/images/IconRefrigerator.svg';
import IconCal from '../assets/images/IconCalendar.svg';
import MyRefri from '../assets/images/Refrigerator.svg';
import IconAdds from '../assets/images/Plus.svg'
import axios from 'axios'
const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
`;

const ContentLayout = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 31px;
    justify-content: flex-start;
    width: 100%;
    flex-shrink: 0;
`;

const ItemLayout = styled.div`
    width: 1150px;
    height: 903px;
    flex-shrink: 0;
    border-radius: 50px;
    background: rgba(168, 209, 204, 0.2);
    margin-left: 20px;
    flex-shrink: 0;
`;

const DateLayout = styled.div`
    width: 630px;
    height: 903px;
    flex-shrink: 0;
    border-radius: 50px;
    background: #ecf6e8;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Dday1img = styled.img`
    margin-top: 40px;
    width: 453px;
    height: 90px;
`;

const Dday7img = styled.img`
    width: 453px;
    height: 90px;
    margin-top: 32px;
`;

const Dday30img = styled.img`
    width: 453px;
    height: 90px;
    margin-top: 32px;
`;

const ButtonAdd = styled.button`
    background: none;
    border: none;
    margin-top: 32px;
`;

const ButtonImg = styled.img``;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
`;

const ProductList = styled.div`
    font-size: 15px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    > div:not(:last-child) {
        margin-bottom: 20px;
    }
`;

const DdayImgContainer = styled.div``;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 10px;
`;

const ProductItem = styled.div`
    position: relative;
    text-align: center;
`;

const ProductNameText = styled.div`
    position: absolute; /* 상대 위치를 기준으로 설정 */
    bottom: 45px; /* 그림과의 간격 조정 */
    left: 50%; /* 가운데 정렬을 위해 왼쪽을 중앙으로 이동 */
    transform: translateX(-50%); /* 가운데 정렬 */
    color: white;
    color: #fff;
    font-family: "Ownglyph meetme";
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

const ProductEXPText = styled.div`
    position: absolute; /* 상대 위치를 기준으로 설정 */
    bottom: 20px; /* 그림과의 간격 조정 */
    left: 50%; /* 가운데 정렬을 위해 왼쪽을 중앙으로 이동 */
    transform: translateX(-50%); /* 가운데 정렬 */
    color: white;
`;

const ProductDdayText = styled.div`
    position: absolute;
    bottom: 20px;
    left: 10%;
    transform: translateX(-50%);
    font-family: Poppins;
    font-size: 25.898px;
    font-style: normal;
    font-weight: 800;
    width: 67px;
    height: 67px;
    border-radius: 20px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

//const DdayImg = styled.img``;

const RefriBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 10px;
`;

const RefriItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin-top: 20px;
`;

const RefriImg = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RefriText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
const FridgeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
    margin-top: -100px;
    margin-left: 20px;
`;

function Home2() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fridgeModalIsOpen, setFridgeModalIsOpen] = useState(false);
  const [products, setProducts] = useState({});
  const [fridges, setFridges] = useState([]);
  const [selectedFridgeId, setSelectedFridgeId] = useState(null);

  const user_id = 9; // 하드코딩된 user_id

  useEffect(() => {
    const storedFridges = localStorage.getItem('fridges');
    const storedProducts = localStorage.getItem('products');

    if (storedFridges) {
      const parsedFridges = JSON.parse(storedFridges);
      setFridges(parsedFridges);
      setSelectedFridgeId(parsedFridges[0]?.id || null);
    }

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const saveFridgesToLocalStorage = (fridges) => {
    localStorage.setItem('fridges', JSON.stringify(fridges));
  };

  const saveProductsToLocalStorage = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  };

  const fetchFridgeList = async () => {
    try {
      const response = await axios.get('http://13.125.120.108:8080/product/fridge/list', {
        headers: {
          'Content-Type': 'application/json',
          'user_id': user_id // 하드코딩된 user_id 사용
        }
      });

      console.log('Fridge List Response:', response.data);

      if (response.data.message === 'SUCCESS') {
        const fridgeList = response.data.fridgeList;
        if (fridgeList && fridgeList.length > 0) {
          setFridges(fridgeList);
          setSelectedFridgeId(fridgeList[0].id); // 첫 번째 냉장고 ID를 선택
          saveFridgesToLocalStorage(fridgeList); // 로컬스토리지에 저장
        } else {
          console.warn('No fridges found.');
        }
      } else {
        console.error('Failed to fetch fridge list:', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Failed to fetch fridge list:', error.response.data);
      } else {
        console.error('Failed to fetch fridge list:', error.message);
      }
    }
  };

  useEffect(() => {
    fetchFridgeList();
  }, [user_id]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openFridgeModal = () => {
        setFridgeModalIsOpen(true);
    };

    const closeFridgeModal = () => {
        setFridgeModalIsOpen(false);
    };

  const addProduct = (product) => {
    if (selectedFridgeId !== null) {
      const updatedProducts = {
        ...products,
        [selectedFridgeId]: [...(products[selectedFridgeId] || []), product],
      };
      setProducts(updatedProducts);
      saveProductsToLocalStorage(updatedProducts);
    }
  };

  const addFridge = (fridge) => {
    const newFridge = { id: fridges.length + 1, name: fridge.name };
    const updatedFridges = [...fridges, newFridge];
    setFridges(updatedFridges);
    setSelectedFridgeId(newFridge.id);
    saveFridgesToLocalStorage(updatedFridges); // 로컬스토리지에 저장
  };

    const selectFridge = (id) => {
        setSelectedFridgeId(id);
    };

    const getProductsForCurrentFridge = () => {
        return products[selectedFridgeId] || [];
    };

    const dday1Products = getProductsForCurrentFridge().filter(
        (product) => dayjs(product.expiryDate).diff(dayjs(), "day") <= 0
    );
    const dday7Products = getProductsForCurrentFridge().filter(
        (product) =>
            dayjs(product.expiryDate).diff(dayjs(), "day") > 0 &&
            dayjs(product.expiryDate).diff(dayjs(), "day") <= 6
    );
    const dday30Products = getProductsForCurrentFridge().filter(
        (product) =>
            dayjs(product.expiryDate).diff(dayjs(), "day") > 6 &&
            dayjs(product.expiryDate).diff(dayjs(), "day") <= 30
    );

  return (
    <Layout>
      <Topbar />
     {/*<button onClick={() => {
        localStorage.removeItem('user');
        localStorage.removeItem('fridges');
        localStorage.removeItem('products');
        navigate('/login');
      }}>Logout</button>*/}
      <ContentLayout>
        <ItemLayout>
          <ButtonContainer>
            <Link to="/home">
              <Button>
                <img src={IconCal} alt="Calendar" />
              </Button>
            </Link>
            <Link to="/home2">
              <Button>
                <img src={IconRefr} alt="Refrigerator" />
              </Button>
            </Link>
          </ButtonContainer>
          <FridgeButton onClick={openFridgeModal}>
            <img src={IconAdds} alt="Add" />
          </FridgeButton>
          <RefriBox>
            {fridges.map((fridge) => (
              <RefriItem key={fridge.id} onClick={() => selectFridge(fridge.id)}>
                <RefriImg src={MyRefri} alt="Refrigerator" />
                <RefriText>{fridge.name}</RefriText>
              </RefriItem>
            ))}
          </RefriBox>
        </ItemLayout>
        <DateLayout>
                <DdayImgContainer>
                    <ProductList>
                        {dday1Products.map((product, index) => (
                            <ProductItem key={index}>
                                <Dday1img src={Dday1} alt="Dday1" />
                                <ProductDdayText>
                                    D-
                                    {dayjs(product.expiryDate).diff(
                                        dayjs(),
                                        "day"
                                    ) + 1}
                                </ProductDdayText>
                                <ProductNameText>
                                    {product.productName}
                                </ProductNameText>
                                <ProductEXPText>
                                    EXP : {product.expiryDate}
                                </ProductEXPText>
                            </ProductItem>
                        ))}
                    </ProductList>
                    <ProductList>
                        {dday7Products.map((product, index) => (
                            <ProductItem key={index}>
                                <ProductDdayText>
                                    D-
                                    {dayjs(product.expiryDate).diff(
                                        dayjs(),
                                        "day"
                                    ) + 1}
                                </ProductDdayText>
                                <ProductNameText>
                                    {product.productName}
                                </ProductNameText>
                                <ProductEXPText>
                                    EXP : {product.expiryDate}
                                </ProductEXPText>
                                <Dday7img src={Dday7} alt="Dday7" />
                            </ProductItem>
                        ))}
                    </ProductList>
                    <ProductList>
                        {dday30Products.map((product, index) => (
                            <ProductItem key={index}>
                                <ProductDdayText>
                                    D-
                                    {dayjs(product.expiryDate).diff(
                                        dayjs(),
                                        "day"
                                    ) + 1}
                                </ProductDdayText>
                                <ProductNameText>
                                    {product.productName}
                                </ProductNameText>
                                <ProductEXPText>
                                    EXP : {product.expiryDate}
                                </ProductEXPText>
                                <Dday30img src={Dday30} alt="Dday30" />
                            </ProductItem>
                        ))}
                    </ProductList>
                </DdayImgContainer>
                <ButtonAdd onClick={openModal}>
                    <ButtonImg src={IconAdd} />
                </ButtonAdd>
            </DateLayout>

      </ContentLayout>
      <MyModal isOpen={modalIsOpen} onRequestClose={closeModal} addProduct={addProduct} />
      <AddFridgeModal
        isOpen={fridgeModalIsOpen}
        onRequestClose={closeFridgeModal}
        addFridge={addFridge}
        userId='sunny' // userId를 'sunny'로 고정
      />
    </Layout>
  );
}

export default Home2;