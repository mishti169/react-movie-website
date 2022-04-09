import React, { useState, useEffect } from 'react';
import './style.css';
import Card from './Card';
import axios from 'axios';

// const movieEndPoint = "https://api.themoviedb.org/3/movie/top_rated?api_key=d296f9125c5c7cacb5d98137b5dd8ded&language=en-US&page=1"

// const imageEndpoint = "https://api.themoviedb.org/3/movie/top_rated?api_key=d296f9125c5c7cacb5d98137b5dd8ded&language=en-US&page=1"

export default function App() {
  const [isMovieListVisible, setMovieVisibility] = useState(true);
  let data = {};

  async function fetchMovies() {
    const { data } = await axios(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=d296f9125c5c7cacb5d98137b5dd8ded&language=en-US&page=1'
    );
    console.log(data);
  }
  // if second argument (array) is empty, that means this function will be called only once as this concept is known as mounting
  useEffect(function () {
    console.log('component mounted App');
    fetchMovies();
  }, []);

  function toggleMovieList() {
    setMovieVisibility(!isMovieListVisible);
  }

  function renderMovieList() {
    const moviesCardList = data.results.map(function (item) {
      return (
        <Card
          title={item.title}
          rating={item.vote_average}
          imgSrc={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          description={item.overview}
        />
      );
    });
    return moviesCardList;
  }

  if (!data.results) {
    return 'Loading...';
  }

  return (
    <div>
      <button onClick={toggleMovieList}>Click Here to toggle movie List</button>
      <div className="movie-list-container">
        {isMovieListVisible && renderMovieList()}
        {/* true && [<Card/>, <Card/>] */}
      </div>
    </div>
  );
}
