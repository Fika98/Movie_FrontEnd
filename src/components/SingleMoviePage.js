// import { render } from '@testing-library/react'
import { comment } from 'postcss';
import React, {useState, useEffect} from 'react'
import { withRouter } from "react-router";

 const SingleMovieContainer = (props) => {
   
   let [movie, setMovie] = useState({})
   let [allValues, setAllValues]= useState({
      name: "",
      content: ""
   })

   useEffect(() => {
      
      fetch(`http://localhost:3000/movies/${props.match.params.id}`)
         .then(r => r.json())
         .then((movie) =>{
            setMovie(movie)
         })
   },[])

   const handleAllTheInputs = (e) =>{
      // console.log([e.target.name])
      setAllValues(preValues => {
         return {...preValues, [e.target.name]: e.target.value}
      })
   }

   const handleSubmitOfNewComment = (evt) =>{
      evt.preventDefault()
      let movieId = movie.id
      fetch(`http://localhost:3000/movies/${movieId}/comments`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({
            name: allValues.name,
            content: allValues.content
         })
      })
         .then(r => r.json())
         .then((newComment) => {
           props.addCommentToMovie(newComment)
            setMovie(
               {...movie, comments: [...movie.comments, newComment]}
            )
         })
         resetInputValue()
   }

   const resetInputValue = () => {
      setAllValues({
         name: "",
         content: ""
      })
   }

   const deleteComment = (commentId) =>{
       
      fetch(`http://localhost:3000/movies/${movie.id}/comments/${commentId}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then((deleteComment) => {

         let arrayComments = movie.comments.map((comment) => {
            return comment
         })
         let copyOfMovie = arrayComments.filter((singleMovie) => {
            return singleMovie.id !== deleteComment.id
         })
         setMovie({
            ...movie, comments: copyOfMovie
         })
      })
   }

      let comments = movie.comments
      let {title, year, poster, id} = movie;
      return(
         <div className="flex space-x-20 ... container mx-auto">
            <div className = "max-w-sm rounded overflow-hidden shadow-lg">
               <strong className="px-20 font-bold text-blue-400 text-xl">{title}({year})</strong>
               <img className="w-full" src ={poster} alt={id} />
               <div className = "bg-gray-200 px-2 py-4">
          {/* (if this part is true) && (this part will execute) */}
               {comments && comments.map(comment => (
                     <div className="flex">
                        <p>{comment.name} comments: {comment.content}.</p>
                        <img 
                        src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-delete-multimedia-kiranshastry-lineal-color-kiranshastry.png"
                         alt=""
                           width="20px"
                           height="20px"
                           onClick={() => deleteComment(comment.id)}
                         />
                     </div>
               ))} 
            </div>
               </div> 
                               
      <form className onSubmit={handleSubmitOfNewComment}>
         <strong className="text-3xl"> Add a comment: </strong>
         <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Jane Doe"
         type="text" 
         placeholder="Name"
         name="name"
         value={allValues.name}
         onChange={handleAllTheInputs}
         /><br />
         <textarea className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
         name="content" 
         placeholder="Comment" 
         value={allValues.content}
         onChange={handleAllTheInputs}
         /><br />
         <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Submit
         </button>
   </form>         
   </div>
  )
}







export default withRouter(SingleMovieContainer)