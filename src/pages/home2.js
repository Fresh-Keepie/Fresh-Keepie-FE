import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../components/Topbar";
//import Calendar from "../components/Calendar";
import Dday1 from "../assets/images/dday1.svg";
import Dday7 from "../assets/images/dday7.svg";
import Dday30 from "../assets/images/dday30.svg";
import MyModal from "../components/AddFoodModal.js";
import AddFridgeModal from "../components/AddFrigeModal.js"; // Add this import
import IconAdd from "../assets/images/IconAdd.svg";
import dayjs from "dayjs";
//import IconDday from '../assets/images/ddaycontainer.svg';
import IconRefr from "../assets/images/IconRefrigerator.svg";
import IconCal from "../assets/images/IconCalendar.svg";
import MyRefri from "../assets/images/Refrigerator.svg";
import IconAdds from "../assets/images/Plus.svg";
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
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [fridgeModalIsOpen, setFridgeModalIsOpen] = useState(false);
    const [products, setProducts] = useState({});
    const [fridges, setFridges] = useState([{ id: 1, name: "나의 냉장고 1" }]);
    const [selectedFridgeId, setSelectedFridgeId] = useState(fridges[0].id); // Default to first fridge

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
        setProducts({
            ...products,
            [selectedFridgeId]: [
                ...(products[selectedFridgeId] || []),
                product,
            ],
        });
    };

    const addFridge = (fridge) => {
        const newFridge = { id: fridges.length + 1, name: fridge.name };
        setFridges([...fridges, newFridge]);
        setProducts({ ...products, [newFridge.id]: [] });
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
                    <FridgeButton onClick={openFridgeModal}>
                        <ButtonImg src={IconAdds} />
                    </FridgeButton>
                    <RefriBox>
                        {fridges.map((fridge) => (
                            <RefriItem
                                key={fridge.id}
                                onClick={() => selectFridge(fridge.id)}>
                                <RefriImg src={MyRefri} />
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
            <MyModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                addProduct={addProduct}
            />
            <AddFridgeModal
                isOpen={fridgeModalIsOpen}
                onRequestClose={closeFridgeModal}
                addFridge={addFridge}
            />
        </Layout>
    );
}

export default Home2;
