import React, {useState} from "react";
import styled from 'styled-components'
import Topbar from "../components/Topbar";
import Calendar from "../components/Calendar"
import Dday1 from "../assets/images/dday1.svg"
import Dday7 from "../assets/images/dday7.svg"
import Dday30 from "../assets/images/dday30.svg"
import MyModal from "../components/MyModal.js"
import IconAdd from "../assets/images/IconAdd.svg"

const Layout=styled.div`
display : flex;
flex-direction : column;
justify-content :center;
align-items: center;
width : 100%;
flex-shrink : 0;
`
const ContentLayout = styled.div`
display : flex;
flex-direction : row;
margin-top : 31px;
justify-content : flex-start;
width : 100%;
flex-shrink : 0;

`
const ItemLayout = styled.div`
width: 1150px;
height: 903px;
flex-shrink: 0;
border-radius: 50px;
background: rgba(168, 209, 204, 0.20);
margin-left : 20px;
flex-shrink : 0;
`
const DateLayout = styled.div`
width: 630px;
height: 903px;
flex-shrink: 0;
border-radius: 50px;
background: #ECF6E8;
margin-left : 20px;
display : flex;
flex-direction : column;
align-items : center;

`
const Dday1img = styled.img`
margin-top : 88px;
width : 453px;
height : 90px;
`
const Dday7img = styled.img`
width : 453px;
height : 90px;
margin-top : 32px;
`
const Dday30img = styled.img`
width : 453px;
height : 90px;
margin-top : 32px;

`

const ButtonAdd = styled.button`
background : none;
border : none;
margin-top : 32px;

`
const ButtonImg = styled.img`
`

function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [itemsForDate, setItemsForDate] = useState([]);

    const addProduct = (product) => {
        console.log("Product added:", product);
        setProducts([...products, product]);
      };

      const handleDateClick = (date) => {
        // date를 이용하여 해당 날짜에 등록된 품목들을 가져옴
        const items = getItemsForDate(date);
        setItemsForDate(items);
      };
      const getItemsForDate = (date) => {
        // date를 기반으로 해당 날짜에 등록된 품목들을 가져오는 로직
        // 예: 서버에서 해당 날짜에 등록된 품목들을 가져오는 API 호출 등
        // 이 함수는 실제로 해당 날짜에 등록된 품목들을 가져오는 로직으로 대체되어야 합니다.
        return [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
          // ...
        ];
      };
      
    return (
    <Layout>
    <Topbar />
    <ContentLayout>
    <ItemLayout>
        <Calendar />


    </ItemLayout>
    <DateLayout>
         {/* itemsForDate 배열에 있는 각 품목들을 표시하는 로직 */}
      {itemsForDate.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
        <Dday1img src = {Dday1} alt = "Dday1" />
        <Dday7img src = {Dday7} alt = "Dday7" />
        <Dday30img src = {Dday30} alt = "Dday30" />
        <ButtonAdd 
        onClick={() => setModalIsOpen(true)}>
        <ButtonImg src = {IconAdd} />
        </ButtonAdd>
    </DateLayout>
    </ContentLayout>
    <MyModal 
        isOpen = {modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        addProduct={addProduct}
        />

    </Layout>
            
            
        
    );
}

export default Home; 