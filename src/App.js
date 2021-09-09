import React, {useState, useEffect} from 'react';
import MovieContainer from './components/MovieContainer'
import Header from './components/Header'
import SingleMoviePage from './components/SingleMoviePage.js'
import {Route, Switch} from 'react-router-dom'
         //Link, NavLink
const App = () => {
   
   let [movieArray, setMovieArray] = useState([])
   let [searchTerm, setSearchTerm] = useState("")

   const changeSearchTerm = (newTerm) => {
      setSearchTerm(newTerm)
   }

   const functionThatReturnsArray = () =>{
      let filterVersionOfArray = movieArray.filter((moviePojo) => {
         return moviePojo.title.toLowerCase().includes(searchTerm.toLowerCase())
      })
      return filterVersionOfArray
   }

   useEffect(() => {
      fetch("http://localhost:3000/movies")
         .then(r => r.json())
         .then((allMovies) =>{
          setMovieArray(allMovies)
         })

   }, []);

      
   const updateLike = (movieId, newLikeValue) => {
      fetch(`http://localhost:3000/movies/${movieId}`,{
         method: "PATCH",
         headers:{
            "Content-Type": "Application/json"
         },
         body: JSON.stringify({
            like: newLikeValue
         })
      })

      .then(r => r.json())
      .then((updatedMovie) => {
         let copyOfMasterMovie = movieArray.map((singleMovie) =>{
            if(singleMovie.id === updatedMovie.id){
               return updatedMovie
            }else{
               return singleMovie
            }
         })
         setMovieArray(copyOfMasterMovie)

      })
   }

   //newlyCreatedComment => {id: 7, name: "asdsa", content: "asdas", movie_id: 31}
   const addCommentToMovie = (newlyCreatedComment) => {
      let foundMovie = movieArray.find((movie) =>{
         return movie.id === newlyCreatedComment.movie_id // returning the individual movie  {id: 31, title: "The Avengers", year: 2012, poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMj…GI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", like: 51, …}
      })
      let copyOfCommentsFromFoundMovie = [...foundMovie.comments, newlyCreatedComment ] // => [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {newlyCreatedComment}]
      let copyOfFoundMovie = {...foundMovie, comments: copyOfCommentsFromFoundMovie}
            //change the entire movieArray on state 
      let copyOfMovieArray = movieArray.map((movieOne) => {
         return (movieOne.id === copyOfFoundMovie.id ? copyOfFoundMovie : movieOne)
      }) 
      setMovieArray(copyOfMovieArray)
      // debugger
   }

      return(
         <div className="App">
            <Route exact path="/">  
               <Header 
                  searchTerm={searchTerm}
                  changeSearchTerm={changeSearchTerm}
               />
            </Route> 
            <Switch>    
               <Route exact path="/">
                  <MovieContainer
                  movies= {functionThatReturnsArray()}
                  updateLike= {updateLike}
                  />
               </Route>
               <Route exact path="/singlePage/:id">
                  <SingleMoviePage
                  addCommentToMovie={addCommentToMovie}
                />
               </Route>
            </Switch>
         </div>
      );
   }

  

 
export default App;
