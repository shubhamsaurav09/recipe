import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

export default function Veggie() {
  const [veggie, setVeggie] = useState(); // defined state, will store popular recipes from spoonacular api

  useEffect(() => {
    getVeggie(); // useEffect renders getPopular() after first render
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie"); // check if recipes are already stored in local storage

    if (check) {
      setVeggie(JSON.parse(check)); // if already stored update popular state
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=568d0160f76b486bbeb96e5ca3bfd13a&number=9&tags=vegetarian` // fetch recipe from api (number=9 restricts only 9 results)
      ); // .env is used as it can't be accessed by others. so only we will the api key
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes)); // store fetched recipe in local storage
      setVeggie(data.recipes); // update the popular recipe with useState
      // console.log(data.recipes);
    }
  };

  if (!veggie) {
    return <p></p>; // checking if data is there in recipe, if not this will cause the first render then useEffect will call setPopular
  }

  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt="recipe.title" />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  marin-left: 10px;
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;
