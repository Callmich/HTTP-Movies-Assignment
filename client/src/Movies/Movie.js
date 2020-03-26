import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movies, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history =useHistory();
  const { id } = useParams();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5001/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateFlick = e => {
    e.preventDefault();
    history.push(`/update-movie/${match.params.id}`)
  }

  const deleteFlick = e =>{
    e.preventDefault()
    console.log("Before Delete", movies)
    axios 
      .delete(`http://localhost:5001/api/movies/${match.params.id}`)
      .then(resp => {
        console.log("What do we get from a delete?",resp)
        const updatedList = movies.filter(flick => {
          if (`${flick.id}`=== id){
              
          }else{
            return flick
          }
        })
        console.log("b4 delete set",updatedList)
        setMovieList(updatedList)
        console.log("after",updatedList)
        history.push("/")
      })
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button className='update-button' onClick={updateFlick}>Update Movie</button>
      <button className='delete-button' onClick={deleteFlick}>Delete Movie</button>
    </div>
  );
}

export default Movie;
