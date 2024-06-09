import React, { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Topbar from "../components/Topbar";
import Calendar from "../components/Calendar";
import Dday1 from "../assets/images/dday1.svg";
import Dday7 from "../assets/images/dday7.svg";
import Dday30 from "../assets/images/dday30.svg";
import AddFoodModal from "../components/AddFoodModal";
import EditFoodModal from "../components/EditFoodModal";
import IconAdd from "../assets/images/IconAdd.svg";
import dayjs from "dayjs";
//import IconDday from '../assets/images/ddaycontainer.svg';
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
    justify-content: center;
    width: 100%;
    flex-shrink: 0;
`;

const ItemLayout = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    width: 950px;
    height: 903px;
    flex-shrink: 0;
    border-radius: 50px;
    background: rgba(168, 209, 204, 0.2);
    flex-shrink: 0;
`;

const DateLayout = styled.div`
    width: 600px;
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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 10px;
`;

const ProductItem = styled.div`
    position: relative;
    text-align: center;
    cursor: pointer;
`;

const ProductNameText = styled.div`
    position: absolute;
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-family: "Ownglyph-meetme";
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const ProductEXPText = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
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

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);

    /* const [localProducts, setLocalProducts] = useState([]);
    const [itemsForDate, setItemsForDate] = useState({}); */
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dday1Products, setDday1Products] = useState([]);
    const [dday7Products, setDday7Products] = useState([]);
    const [dday30Products, setDday30Products] = useState([]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setEditModalIsOpen(false);
    };

    const addProduct = (product) => {
        setProducts([...products, { ...product, id: Date.now() }]);
        console.log("Product addedd:", product);
        handleDateClick([...products, product]);
    };

    // Home 컴포넌트의 updateProduct 함수 수정
    /*const updateProduct = (updatedProduct) => {
  // 이전 상태를 가져와서 업데이트하는 함수형 업데이트 사용
  setProducts(prevProducts => {
    const updatedProducts = prevProducts.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    console.log("Updated products state:", updatedProducts);
    // 이 부분에서 handleDateClick을 호출할 때 updatedProducts를 전달해야 합니다.
    handleDateClick(updatedProducts); // 업데이트된 상품 목록을 전달
    return updatedProducts;
  });
};
*/
    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            console.log("Updated products state:", updatedProducts);
            handleDateClick(updatedProducts); // 업데이트된 상품 목록을 전달
            return updatedProducts;
        });
    };

    /*
const updateProduct = (updatedProduct) => {
  setLocalProducts((prevProducts) => {
    const updatedProducts = prevProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    handleDateClick(dayjs(updatedProduct.expiryDate).date());// 업데이트된 상품 목록을 전달
    console.log('Updated products state:', updatedProducts);
    return updatedProducts;
  });
};*/

    const handleDateClick = (products) => {
        const today = dayjs();
        const dday1 = [];
        const dday7 = [];
        const dday30 = [];
        products.forEach((product) => {
            const expiryDate = dayjs(product.expiryDate);
            const diff = expiryDate.diff(today, "day");
            console.log(
                `Product: ${product.productName}, Expiry Date: ${product.expiryDate}, Days left: ${diff}`
            );
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
                    <Calendar
                        onDateClick={handleDateClick}
                        products={products}
                    />
                </ItemLayout>
                <DateLayout>
                    <DdayImgContainer>
                        <ProductList>
                            {dday1Products.map((product, index) => (
                                <ProductItem
                                    key={index}
                                    onClick={() => openEditModal(product)}>
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
                                        EXP: {product.expiryDate}
                                    </ProductEXPText>
                                </ProductItem>
                            ))}
                        </ProductList>
                    </DdayImgContainer>
                    <DdayImgContainer>
                        <ProductList>
                            {dday7Products.map((product, index) => (
                                <ProductItem
                                    key={index}
                                    onClick={() => openEditModal(product)}>
                                    <Dday7img src={Dday7} alt="Dday7" />
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
                                        EXP: {product.expiryDate}
                                    </ProductEXPText>
                                </ProductItem>
                            ))}
                        </ProductList>
                    </DdayImgContainer>
                    <DdayImgContainer>
                        <ProductList>
                            {dday30Products.map((product, index) => (
                                <ProductItem
                                    key={index}
                                    onClick={() => openEditModal(product)}>
                                    <Dday30img src={Dday30} alt="Dday30" />
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
                                        EXP: {product.expiryDate}
                                    </ProductEXPText>
                                </ProductItem>
                            ))}
                        </ProductList>
                    </DdayImgContainer>
                    <ButtonAdd onClick={openModal}>
                        <ButtonImg src={IconAdd} />
                    </ButtonAdd>
                </DateLayout>
            </ContentLayout>
            <AddFoodModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                addProduct={addProduct}
            />
            <EditFoodModal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                product={selectedProduct}
                updateProduct={updateProduct}
            />
        </Layout>
    );
}

export default Home;
