import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Topbar from "../components/Topbar";
import IconSearch from "../assets/images/IconSearch.svg";
import IconRecipe from "../assets/images/layout.svg";
import RecipeItem from "../store/dummyFile";
import { useParams } from "react-router-dom";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: flex-start;
`;
const SearchingInput = styled.input`
    width: 767px;
    height: 47.4px;
    border-radius: 13px;
    background: rgba(250, 250, 250, 0.93);
    padding-left: 20px;
    margin-top: 60px;
    font-size: 23px;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    margin-left: -400px;
    border: none;
    &::placeholder {
        font-size: 23px;
    }
    &:focus {
        outline: none;
    }
    position: absolute;
`;
const SearchButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-left: -400px;
`;

const SearchImg = styled.img`
    width: 24.62px;
    height: 25.439px;
    margin-top: 67px;
    width: 36.867px;
    height: 36.867px;
`;

const RecipeLayout = styled.div`
    width: 1600px;
    height: auto;
    background-color: rgba(168, 209, 204, 0.2);
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    margin-top: 29.6px;
    padding-bottom: 30px;
`;

const RecipeLayout1 = styled.div`
    width: 360px;
    height: auto;
    background-color: rgba(168, 209, 204, 0.2);
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding-bottom: 30px;
`;
const RecipeLayout2 = styled.div`
    width: 1200px;
    height: auto;
    background-color: rgba(168, 209, 204, 0.2);
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding-bottom: 30px;
`;
const ItemLayout = styled.div`
    width: 378.603px;
    height: 288px;
    border-radius: 30px;
    background: #fffbfb;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: start;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    //width: calc(25% - 20px);
`;

const RecipeImage = styled.img`
    display: block; /* 이미지를 블록 요소로 표시하여 수평 중앙 정렬을 위한 auto margin을 사용할 수 있게 합니다. */
    margin: 10px auto;
    margin-top: 30px;
    text-align: center;
    width: 400px;
    height: 280px;
`;

const RecipeText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 20px;
    font-size: 30px;
`;
const Title = styled.div`
    margin-top: 45px;
    font-size: 25px;
    margin-left: 40px;
`;
const Material = styled.div`
    display: flex;
    flex-direction: row;
    gap: 70px;
    margin-top: 30px;
`;

const Ingredient = styled.div`
    display: flex;
    margin-top: 30px;
    font-size: 20px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
`;
const LayoutTitle = styled.div`
    margin-top: 45px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Order = styled.div`
    margin-top: 50px;
    font-size: 25px;
    width: 1000px;
    margin-left: 100px;
`;

function RecipeDetail() {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log("검색어:", query);
    };
    const { id } = useParams();
    const recipe = RecipeItem.find((recipe) => recipe.id === parseInt(id));

    return (
        <Layout>
            <Topbar />
            <SearchBar>
                <SearchingInput
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search"
                />
                <SearchButton onClick={handleSearch}>
                    <SearchImg src={IconSearch} alt="검색" />
                </SearchButton>
            </SearchBar>
            <RecipeLayout>
                <RecipeImage src={recipe.image} alt={recipe.text} />
                <RecipeText>{recipe.title}</RecipeText>
            </RecipeLayout>
            <Material>
                <RecipeLayout1>
                    <LayoutTitle>재료(1인분)</LayoutTitle>

                    <Ingredient>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index}>
                                {ingredient.name} - {ingredient.quantity}
                            </div>
                        ))}
                    </Ingredient>
                </RecipeLayout1>
                <RecipeLayout2>
                    <LayoutTitle>조리순서</LayoutTitle>
                    {recipe.steps.map((step, index) => (
                        <Order key={index}>{step}</Order>
                    ))}
                </RecipeLayout2>
            </Material>
        </Layout>
    );
}

export default RecipeDetail;
