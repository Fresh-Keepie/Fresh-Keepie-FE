import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import styled from 'styled-components';





const Layout = styled.div`
display : flex;
justify-content : center;
align-items : center;


`
const PageContainer= styled.div`
    display : flex;
    flex-direction : column; 
`
const YearContainer = styled.div`
display : flex;
`
const MonthHeader = styled.div`
    display : flex;
    flex-direction : row;
    text-align: center;
    color: #585757;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
width : 78px;
height : 18px;
margin-top : 50px;
margin-left : 20px;
    
    div:first-child {
        display: flex;
       // width: 196px;
       // height: 50px;
        flex-direction: column;
        justify-content: center;
        margin-right : 5px;
    
    }
    div:last-child {
        display: flex;
       // width: 115px;
       // height: 36px;
        flex-direction: column;
        justify-content: center;
    }
`

const NavigationButtons = styled.div`
display : flex;
//width : 100px;
//height : 50px;
//margin-left : 700px;
margin-top : 10px;
justify-content : flex-end;
`;

const ComboBox = styled.div`
  width: 80px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #999;
  background: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right : 15px;

`

const Dropdown = styled.select`
width: 80px;
height: 40.82
flex-shrink: 0;
border: 0;
background: #FFF;
color: #000;
font-family: "Pretendard";
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
display : flex;
justify-content: center;
align-items: center;
text-align : center;

`

const ListItem = styled.option`
  display: flex;
  width: 80px;
  height: 30.391px;
  margin-top : 10px;
`

const CalendarWrapper = styled.div`
    display: grid;
    justify-content : center;
    align-items : center;
    text-align : left;
    grid-template-columns: repeat(7, 117px);
    grid-template-rows: repeat(6, 117px);
    //gap : 10px;
    //margin-left : 152.57px;
    //margin-right : 152.57px;
    margin-top : 8px;
    color: #000;
    font-family: "Pretendard Variable";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 60% */
    
    
`;


const Day = styled.div`
    display: flex;
    flex-direction: row; 
    align-items : center;
    justify-content: center;
    text-align: left;
    background-color : white;
    border : 1px solid #ccc;

    width: 117px; /* 고정된 가로 크기 */
    height: 117px; /* 고정된 세로 크기 */
    //left : 50px;
    
    // 이미지와 텍스트를 감싸는 컨테이너에 대한 스타일
    .content-container {
        width: 92px;
        height: 92px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align : left;
        position : relative;
        

    }
    // 텍스트에 대한 스타일
    span {
        display : flex;
        align-items : center;
        justify-content : center;
        text-align : left;
        position : absolute;
        width : 100%;
        z-index: 2; 
    }
`;

const ImageContainer = styled.div`
width : 92px;
height : 92px;
z-index: 1; 
overflow : hidden;
svg {
    border-radius: 15px;
 }

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
    
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const daysInMonth = currentDate.daysInMonth();
    const firstDayOfMonth = currentDate.startOf('month').day();
    const [selectedYear, setSelectedYear] = useState(currentDate.year());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.month() + 1); 
    const [calendar, setCalendar] = useState([]);
 

    const renderCalendar = () => {
        const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => (
            <Day key={`empty-${i}`} />
          ));
        
            const days = Array.from({ length: daysInMonth }, (_, i) => (
            //const imageData = post_id.find(item => item.day === i+1);
          //  const imageData = calendar.find(item => item.day === i+1);
                <Day key={i+1}>
                    <span>{i + 1}</span>
            </Day>
        ));
        return [...emptyDays, ...days];
    };

    const YearList = Array.from( { length: 9 }, (_, i) => `${2024-i}`,);   
    const MonthList = Array.from( {length: 12}, (_, i) => `${i+1}`);
    
    /*useEffect(() => {
        const fetchCalendar = async () => {
          try {
            const response = await fetch('http://52.78.99.156:8080/ap1/v1/posts/calear/{month}', {
            method: 'get',
            headers: {
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZCIsImlhdCI6MTcwODQyODMwMiwiZXhwIjoxNzA4NDI5NzQyfQ.wcAlnIPlwflC0XLf2c5fdA3L8MIdNBNtfnnXzw-0MGM'
            }
          });
          if (response.ok){
            const data = await response.json();
            setCalendar(data);
        }
        else {
          console.error('캘린더 정보 가져오기 실패:', response.statusText);
          } 
        }
        catch (error) {
            console.error('캘린더 정보 가져오기 오류:', error);
          }
        };
      
        fetchCalendar();
      }, []);
      
*/
    

    return (
        <Layout>
            <PageContainer>
                <MonthHeader>
                    <div>{currentDate.format('MMM')}</div>
                    <div>{currentDate.format('YYYY')}</div>
                </MonthHeader> 
                <NavigationButtons>
                    <ComboBox>
                    <Dropdown value={selectedYear} onChange={(e) => 
                    {const newYear = Number(e.target.value);
                        setSelectedYear(newYear);
                        setCurrentDate(dayjs().year(newYear).month(selectedMonth - 1));
                      }}>
                    {YearList.map((year, index) => (
                    <ListItem key={index} value={year}>
                    {year}
                    </ListItem>
                 ))}
                </Dropdown>
              </ComboBox>
              <ComboBox>
              <Dropdown value={selectedMonth} onChange={(e) => 
                {const newMonth = Number(e.target.value);
                    setSelectedMonth(newMonth);
                    setCurrentDate(dayjs().year(selectedYear).month(newMonth - 1));
                    }}>
                {MonthList.map((month, index) => (
              <ListItem key={index} value={month}>
                {(Number(month)).toString().padStart(2, '0')}
            </ListItem>
                 ))}
                </Dropdown>
                </ComboBox>    
                    </NavigationButtons>
                    <WeekHeader>
                    {daysOfWeek.map((day, index) => (
                     <div key={index}>{day}</div>
                        ))}
                    </WeekHeader>
                    <CalendarWrapper>
                    {renderCalendar()}
                    </CalendarWrapper>
            </PageContainer>
        </Layout>
    );
};


export default Calendar; 