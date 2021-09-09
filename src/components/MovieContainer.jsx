import React from 'react' 
import Movie from './Movie'


let MovieContainer = (props) => {
   let arrayOfComponent = props.movies.map((singleMoviePOJO) => {
      return <Movie
         movies={singleMoviePOJO}
         key={singleMoviePOJO.id}
         updateLike={props.updateLike}
         // singleMovieData={props.singleMovieData}
      />
   })
   return(
      <div className="container mx-auto">
         <div className="grid grid-cols-4 gap-4">
            {arrayOfComponent}
         </div>
      </div>
      
   )
}


export default MovieContainer 