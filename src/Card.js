import React from 'react';
import './Card.css';
import Button from './Button';

function Card(props) {
  const { title, rating, description, genre, year, imgSrc } = props;

  function renderRating() {
    if (rating) {
      return <span className="movie-rate text-shadow">{rating}</span>;
    }
    return null;
  }

  // if (!title && !description) {
  //   return null;
  // }

  return (
    <div
      className="movie-container"
      style={{
        backgroundImage: `url(${
          imgSrc || 'https://wallpapercave.com/wp/uw0gHLX.jpg'
        })`,
      }}
    >
      <div className="movie-detail-wrapper">
        <div className="movie-detail-container">
          {renderRating()}
          <span className="movie-title text-shadow">{title}</span>
          <div>
            {year && <span className="movie-year text-shadow">{year}, </span>}
            <span className="movie-genre text-shadow">{genre} </span>
          </div>
        </div>
        <p className="description text-shadow">{description}</p>
        {title && <Button text="Watch thriller" className="thrillerBtn" />}
      </div>
    </div>
  );
}
export default Card;
