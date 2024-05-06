import React, {useState} from "react";
import styled from 'styled-components'
import Topbar from "../components/Topbar";
import IconSearch from "../assets/images/IconSearch.svg"
import IconRecipe from "../assets/images/layout.svg"
import RecipeItem from "../store/dummyFile"

const Layout=styled.div`
display : flex;
flex-direction : column;
justify-content :center;
align-items: center;
width : 100%;



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
  width : 90%;
  height : 70vh;
  background-color: rgba(168, 209, 204, 0.20);
  border-radius : 50px;
  display : flex;
flex-wrap: wrap;
justify-content: space-between;
  margin-top : 29.6px;

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
display : flex;
justify-content : center;
align-items : center;
margin-top : -20px;
margin-left : 65px;
`

const RecipeText = styled.span`
display : flex;
justify-content : center;
align-items : center;
margin-left : 10px;
margin-top : 20px;

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
        <RecipeLayout>
        {RecipeItem.map(recipe => (
          <ItemLayout key={recipe.id}>
            <RecipeImage src={recipe.image} alt={`Recipe ${recipe.id}`} />
            <RecipeText>{recipe.text} </RecipeText>
            </ItemLayout>
          
        ))}
     </RecipeLayout>
    

        </Layout>
        
    );
}

export default Recipe;
