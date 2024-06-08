import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Topbar from "../components/Topbar";
import Calendar from "../components/Calendar";
import Dday1 from "../assets/images/dday1.svg";
import Dday7 from "../assets/images/dday7.svg";
import Dday30 from "../assets/images/dday30.svg";
import AddFoodModal from "../components/AddFoodModal.js";
import IconAdd from "../assets/images/IconAdd.svg";
import dayjs from "dayjs";
//import IconDday from '../assets/images/ddaycontainer.svg'
import IconRefr from "../assets/images/IconRefrigerator.svg";
import IconCal from "../assets/images/IconCalendar.svg";

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
    //margin-left : 700px;
    //margin-top : 30px;
`;
const ProductList = styled.div`
    font-size: 15px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    > div:not(:last-child) {
        margin-bottom: 20px; /* 원하는 여백 크기로 조정 */
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
    position: relative; /* 부모 요소로부터의 상대 위치 설정 */
    text-align: center; /* 텍스트를 가운데 정렬합니다. */
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
    position: absolute; /* 상대 위치를 기준으로 설정 */
    bottom: 20px; /* 그림과의 간격 조정 */
    left: 10%; /* 가운데 정렬을 위해 왼쪽을 중앙으로 이동 */
    transform: translateX(-50%); /* 가운데 정렬 */
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
    text-align: center; /* 텍스트를 수평으로 가운데 정렬합니다. */
`;

//const DdayImg = styled.img``

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    // const [itemsForDate, setItemsForDate] = useState({ });

    const [dday1Products, setDday1Products] = useState([]);
    const [dday7Products, setDday7Products] = useState([]);
    const [dday30Products, setDday30Products] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };
    //const closeModal = () => {setModalIsOpen(false);};
    const addProduct = (product) => {
        console.log("Product added:", product);
        setProducts([...products, product]);
    };

    const handleDateClick = (products) => {
        const today = dayjs();
        const dday1 = [];
        const dday7 = [];
        const dday30 = [];
        products.forEach((product) => {
            const expiryDate = dayjs(product.expiryDate);
            const diff = expiryDate.diff(today, "day");

            if (diff <= 1) {
                dday1.push(product);
            } else if (diff <= 6) {
                dday7.push(product);
            } else if (diff <= 29) {
                dday30.push(product);
            }
        });

        setDday1Products(dday1);
        setDday7Products(dday7);
        setDday30Products(dday30);
    };

    return (
        <Layout>
            <Topbar />
            <ContentLayout>
                <ItemLayout>
                    <ButtonContainer>
                        <Link to="/home">
                            <Button>
                                <ButtonImg src={IconCal} />
                            </Button>
                        </Link>
                        <Link to="/home2">
                            <Button>
                                <ButtonImg src={IconRefr} />
                            </Button>
                        </Link>
                    </ButtonContainer>
                    <Calendar onDateClick={handleDateClick} />
                </ItemLayout>
                <DateLayout>
                    <DdayImgContainer>
                        <ProductList>
                            {dday1Products.map((product, index) => (
                                <ProductItem key={index}>
                                    <Dday1img
                                        src={Dday1}
                                        alt="Dday1"></Dday1img>
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
                    </DdayImgContainer>

                    <DdayImgContainer>
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
                    </DdayImgContainer>

                    <DdayImgContainer>
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
                    {/*<ButtonAdd 
        onClick={() => setModalIsOpen(true)}>
        <ButtonImg src = {IconAdd} />
        </ButtonAdd>*/}
                </DateLayout>
            </ContentLayout>

            <AddFoodModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                addProduct={addProduct}
            />
        </Layout>
    );
}

export default Home;
