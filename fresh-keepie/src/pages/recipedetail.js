import React, {useState} from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components'
import Topbar from "../components/Topbar";
import IconSearch from "../assets/images/IconSearch.svg"
import IconRecipe from "../assets/images/layout.svg"
import RecipeItem from "../store/dummyFile"
import { useParams } from 'react-router-dom';

const Layout=styled.div`
display : flex;
flex-direction : column;
justify-content :center;
align-items: center;
width : 100%;


\
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

  const RecipeLayout = styled.div`
  width :  1600px;
  height : auto;
  background-color: rgba(168, 209, 204, 0.20);
  border-radius : 50px;
  display : flex;
  flex-direction : column;
  margin-top : 29.6px;
  padding-bottom : 30px;

  `

const ItemLayout = styled.div`
width: 378.603px;
height: 288px;
border-radius: 30px;
background: #FFFBFB;
display : flex;
justify-content : center;
flex-direction : column;
align-items : start;
margin-top : 20px;
margin-left : 10px;
margin-right : 10px;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
//width: calc(25% - 20px);
`

const RecipeImage=styled.img`
display: block; /* 이미지를 블록 요소로 표시하여 수평 중앙 정렬을 위한 auto margin을 사용할 수 있게 합니다. */
    margin: 10px auto;
margin-top : 30px;
text-align : center;
width : 400px;
height : 280px;
`

const RecipeText = styled.span`
display : flex;
justify-content : center;
align-items : center;
text-align : center;
margin-top : 20px;
font-size: 30px;
`
const Title = styled.div`
margin-top : 45px;
font-size : 25px;
margin-left : 40px;
`
const Material = styled.div`
display : flex;
flex-direction : row;
space-between : 30px;
margin-top : 70px;`

const Ingredient=styled.div`
display : flex;
margin-left : 40px;
font-size : 20px;
flex-direction : column;

`
const Sauce = styled.div`
display : flex;
flex-direction : column;
font-size : 20px;
margin-left : 40px;
`
const LayoutTitle = styled.div`
margin-top : 45px;
font-size : 30px;
margin-left : 40px;

`

const Order = styled.div`
margin-top : 50px;
font-size : 25px;
width : 800px;
margin-left : 200px;
display : flex;
justify-content : center;
align-items:center;
text-align : center;
`

function RecipeDetail() {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log('검색어:', query);
    }
    const { id } = useParams();
    const recipe = RecipeItem.find(recipe => recipe.id === parseInt(id));

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
        <RecipeLayout>
        <RecipeImage src={recipe.image} alt={recipe.text} />
        <RecipeText>{recipe.text1}</RecipeText>
       
     </RecipeLayout>
        <RecipeLayout>
        <LayoutTitle>재료(1인분)</LayoutTitle>
        <Material>
        <Ingredient>
        <Title>재료</Title>
            {recipe.text2.split(', ').map((item, index) => (
              <div key={index}>{item}</div>
            ))}
        </Ingredient>
  
        <Sauce>
        <Title>양념</Title>
        {recipe.text3.split(', ').map((item, index) => (
              <div key={index}>{item}</div>
            ))}
        </Sauce>
        </Material>
     
        </RecipeLayout>
        <RecipeLayout>
        <LayoutTitle>조리순서</LayoutTitle>
        <Order>{recipe.order1}</Order>
        <Order>{recipe.order1}</Order>
        <Order>{recipe.order1}</Order>
        </RecipeLayout>
        </Layout>
        
    );
}

export default RecipeDetail;
