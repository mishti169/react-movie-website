import React, { useState, useEffect } from 'react';
import './style.css';
import Card from './Card';
import axios from 'axios';
import Button from './Button';

// const movieEndPoint = "https://api.themoviedb.org/3/movie/top_rated?api_key=d296f9125c5c7cacb5d98137b5dd8ded&language=en-US&page=1"

// const imageEndpoint = "https://api.themoviedb.org/3/movie/top_rated?api_key=d296f9125c5c7cacb5d98137b5dd8ded&language=en-US&page=1"

export default function App() {
  const [isMovieListVisible, setMovieVisibility] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [apiData, setApiData] = useState({});

  async function fetchMovies(page) {
    const res = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=d296f9125c5c7cacb5d98137b5dd8ded&language=en-US&page=${
        page || 1
      }`
    );
    setApiData(res); //async
  }
  // if second argument (array) is empty, that means this function will be called only once as this concept is known as mounting
  // useEffect(function () {
  //   console.log('component mounted App');
  //   fetchMovies();
  //   console.log('hiiiii from useEffect');
  // }, []);

  // useEffect(() => {
  //   fetchMovies(pageNo);
  // }, [pageNo]);

  useEffect(
    function () {
      fetchMovies(pageNo);
    },
    [pageNo]
  );

  function toggleMovieList() {
    setMovieVisibility(!isMovieListVisible);
  }

  function renderMovieList() {
    const moviesCardList = apiData.data.results.map(function (item) {
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

  function getPageDataAndScroll(page) {
    if (page <= 0) {
      return;
    }
    setPageNo(page);
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }

  function getNextPageData() {
    console.log('next btn clicked');
    getPageDataAndScroll(pageNo + 1);
  }

  function getPreviousPageData() {
    console.log('Previous btn clicked');
    getPageDataAndScroll(pageNo - 1);
  }

  if (!apiData.data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={toggleMovieList}>Click Here to toggle movie List</button>
      <div className="movie-list-container">
        {isMovieListVisible && renderMovieList()}
      </div>
      <div className="page-btn-container">
        <Button
          onBtnClick={getPreviousPageData}
          text="Previous"
          variant="primary"
        />
        <Button onBtnClick={getNextPageData} text="Next" variant="primary" />
      </div>
    </div>
  );
}
