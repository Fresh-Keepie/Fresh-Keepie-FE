import React, {useState} from "react";
import styled from 'styled-components'
import Topbar from "../components/Topbar";
import IconSearch from "../assets/images/IconSearch.svg"
import RecipeLayoutImg from "../assets/images/layout.svg"

const Layout=styled.div`
display : flex;
flex-direction : column;
justify-content :center;
align-items: center;
width : 1440px;
height : 1080px;
`

const SearchBar =styled.div`
    display : flex;
    align-items : flex-start;
`
const SearchingInput = styled.input`
    width: 767px;
    height: 47.4px;
    border-radius: 13px;
    background: rgba(250, 250, 250, 0.93);
    padding-left : 20px;
    margin-top : 60px;
    font-size : 23px;
    text-align : center;
    font-style: normal;
    font-weight: 400;
    margin-left : -400px;
    border:none;
    &::placeholder{
        font-size : 23px;
        }
    &:focus {
            outline: none; 
        
    }
    position : absolute;
`
const SearchButton = styled.button`
background: none;
border: none;
cursor: pointer;
position: relative;
display : flex;
align-items : flex-start;
margin-left : -400px;
 `

const SearchImg = styled.img`
    width: 24.62px;
    height: 25.439px;
    margin-top : 67px;
    width: 36.867px;
    height: 36.867px;

   
  `

  const RecipeLayout = styled.img`
  width : 1339px;
  height : 760px;
  margin-top : 29.6px;

  `

function Recipe() {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log('검색어:', query);
    }

    return (
        <Layout>
        <Topbar />
        <SearchBar>
            <SearchingInput
                type = 'text'
                value = {query}
                onChange = {handleInputChange}
                placeholder = 'Search'
            />
            <SearchButton onClick = {handleSearch}>
                <SearchImg src = {IconSearch} alt = '검색'/>
            </SearchButton>
        </SearchBar>
        <RecipeLayout src={RecipeLayoutImg} /> {/* 변경된 부분 */}

        </Layout>
        
    );
}

export default Recipe;
