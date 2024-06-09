import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import styled from "styled-components";
import Topbar from "../components/Topbar";
import IconSearch from "../assets/images/IconSearch.svg";
import IconRecipe from "../assets/images/layout.svg";
import RecipeItem from "../store/dummyFile";
import RecipeDetail from "./recipedetail.js";

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
    width: 100%;
    max-width: 1600px;
    height: auto;
    background-color: rgba(168, 209, 204, 0.2);
    border-radius: 50px;
    gap: 20px;
    margin-top: 29.6px;
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const ItemLayout = styled.div`
    width: 378.603px;
    height: 288px;
    border-radius: 30px;
    background: #fffbfb;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 70px;
    //flex-direction : column;

    margin-top: 20px;
    //margin-left : 10px;
    //margin-right : 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    //width: calc(25% - 20px);
`;

const RecipeImage = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    width: 240px;
    height: 170px;
`;

const RecipeText = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 20px;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
`;
function Recipe() {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log("검색어:", query);
    };

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
                {RecipeItem.map((recipe) => (
                    <ItemLayout key={recipe.id}>
                        <StyledLink to={`/recipe/${recipe.id}`}>
                            <RecipeImage
                                src={recipe.image}
                                alt={`Recipe ${recipe.id}`}
                            />
                            <RecipeText>{recipe.title} </RecipeText>
                        </StyledLink>
                    </ItemLayout>
                ))}
            </RecipeLayout>
            <Routes>
                <Route path="/recipe/:id" component={RecipeDetail} />
            </Routes>
        </Layout>
    );
}

export default Recipe;
