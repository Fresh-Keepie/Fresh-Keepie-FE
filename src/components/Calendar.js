import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import AddFoodModal from "./AddFoodModal";
/* import { Link } from "react-router-dom";
import IconAdd from "../assets/images/Plus.svg";
import IconRefr from "../assets/images/IconRefrigerator.svg";
import IconCal from "../assets/images/IconCalendar.svg"; */
import EditFoodModal from "./EditFoodModal";

const Layout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

/* const YearContainer = styled.div`
    display: flex;
`;
 */
const MonthHeader = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    color: #585757;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    width: 78px;
    height: 18px;
    //margin-top: 50px;
    margin-left: 20px;

    div:first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 5px;
    }

    div:last-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;

/* const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: -40px;
`;
 */
const NavigationButtons = styled.div`
    display: flex;
    margin-top: 10px;
    justify-content: flex-end;
`;

const ComboBox = styled.div`
    width: 80px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 1px solid #999;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`;

const Dropdown = styled.select`
    width: 80px;
    height: 40.82px;
    flex-shrink: 0;
    border: 0;
    background: #fff;
    color: #000;
    font-family: "Pretendard";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const ListItem = styled.option`
    display: flex;
    width: 80px;
    height: 30.391px;
    margin-top: 10px;
`;

const CalendarWrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    text-align: left;
    grid-template-columns: repeat(7, 117px);
    grid-template-rows: repeat(6, 117px);
    margin-top: 8px;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

const Day = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 5px;
    background-color: white;
    border: 1px solid #ccc;
    width: 111px;
    height: 116px;
    cursor: pointer;
`;

const WeekHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 117px);
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #585757;
    font-family: Inter;
    font-size: 14px;
    font-weight: 700;
    margin-top: 20px;
`;

/* const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
`;

const ButtonImg = styled.img``; */

const ProductList = styled.div`
    font-size: 15px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    > div:not(:last-child) {
        margin-bottom: 5px; /* 원하는 여백 크기로 조정 */
    }
`;

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ onDateClick, products }) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [localProducts, setLocalProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf("month").day();
    const [selectedYear, setSelectedYear] = useState(currentDate.year());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.month() + 1);

    const addProduct = (product) => {
        console.log("Product added:", product);
        setLocalProducts([...localProducts, product]);
    };

    const handleDateClick = (day) => {
        const dayProducts = localProducts.filter(
            (product) =>
                dayjs(product.expiryDate).isSame(currentDate, "month") &&
                dayjs(product.expiryDate).date() === day
        );
        onDateClick(dayProducts);
        console.log("Date clicked:", day);
    };

    const updateProduct = (updatedProduct) => {
        setLocalProducts((prevProducts) => {
            const updatedProducts = prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            return updatedProducts;
        });
        handleDateClick(updatedProduct.expiryDate); // 수정된 상품의 만료일로만 업데이트
    };

    /*useEffect(() => {
  if (localProducts.length > 0) {
    handleDateClick(localProducts);
  }
}, [localProducts]);*/

    useEffect(() => {
        setLocalProducts(products); // 초기 products 값을 localProducts에 설정
    }, [products]);

    useEffect(
        () => {
            if (selectedProduct) {
                handleDateClick(dayjs(selectedProduct.expiryDate).date());
            }
        } /* , [localProducts] */
    );

    useEffect(() => {
        console.log("Calendar component mounted");
        setLocalProducts(products); // 초기 products 값을 localProducts에 설정
    }, [products]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const renderCalendar = () => {
        const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
            <Day key={`empty-${i}`} />
        ));
        const days = Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dayProducts = localProducts.filter(
                (product) =>
                    dayjs(product.expiryDate).isSame(currentDate, "month") &&
                    dayjs(product.expiryDate).date() === day
            );

            return (
                <Day key={day} onClick={() => handleDateClick(day)}>
                    <span>{day}</span>
                    <ProductList>
                        {dayProducts.map((product, index) => (
                            <div
                                key={index}
                                onClick={() => handleProductClick(product)}>
                                {product.productName}
                            </div>
                        ))}
                    </ProductList>
                </Day>
            );
        });

        return [...emptyDays, ...days];
    };

    const YearList = Array.from({ length: 9 }, (_, i) => `${2024 - i}`);
    const MonthList = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
    const dropdownStyle = { fontSize: 16 };
    return (
        <Layout>
            <PageContainer>
                <MonthHeader>
                    <div>{currentDate.format("MMM")}</div>
                    <div>{currentDate.format("YYYY")}</div>
                </MonthHeader>

                <NavigationButtons>
                    <ComboBox>
                        <Dropdown
                            value={selectedYear}
                            style={dropdownStyle}
                            onChange={(e) => {
                                const newYear = Number(e.target.value);
                                setSelectedYear(newYear);
                                setCurrentDate(
                                    dayjs()
                                        .year(newYear)
                                        .month(selectedMonth - 1)
                                );
                            }}>
                            {YearList.map((year, index) => (
                                <ListItem key={index} value={year}>
                                    {year}
                                </ListItem>
                            ))}
                        </Dropdown>
                    </ComboBox>
                    <ComboBox>
                        <Dropdown
                            value={selectedMonth}
                            style={dropdownStyle}
                            onChange={(e) => {
                                const newMonth = Number(e.target.value);
                                setSelectedMonth(newMonth);
                                setCurrentDate(
                                    dayjs()
                                        .year(selectedYear)
                                        .month(newMonth - 1)
                                );
                            }}>
                            {MonthList.map((month, index) => (
                                <ListItem key={index} value={month}>
                                    {Number(month).toString().padStart(2, "0")}
                                </ListItem>
                            ))}
                        </Dropdown>
                    </ComboBox>
                    {/*<Button onClick={() => setIsModalOpen(true)}>
            <ButtonImg src={IconAdd} />
            </Button>*/}
                </NavigationButtons>

                <WeekHeader>
                    {daysOfWeek.map((day, index) => (
                        <div key={index}>{day}</div>
                    ))}
                </WeekHeader>
                <CalendarWrapper>{renderCalendar()}</CalendarWrapper>
            </PageContainer>
            <AddFoodModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                addProduct={addProduct}
            />
            {selectedProduct != null && (
                <EditFoodModal
                    isOpen={true}
                    onRequestClose={() => setSelectedProduct(null)}
                    product={selectedProduct}
                    //updateProduct={updateProduct}
                    onSave={(updatedProduct) => {
                        updateProduct(updatedProduct);
                        setIsModalOpen(false);
                        setSelectedProduct(null);
                    }}
                />
            )}
        </Layout>
    );
};

export default Calendar;
