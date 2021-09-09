import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const Movie = (props) => {

   let [counter, setCounter] = useState(props.movies.like)
   
   const handleClick = () => {
      setCounter(counter + 1)
   }

    useEffect(() => {
      props.updateLike(props.movies.id,counter)
   }, [counter])


      let {title, year, poster,id, comments} = props.movies
      // console.log(this.props.movies.comments.length)
      const linkId = `singlePage/${id}`
      return(
         <div className = "max-w-sm rounded overflow-hidden shadow-lg">
            <Link to={linkId}>
               <img className="w-full" alt={id} src ={poster}/>
            </Link>
            <div className="px-6 py-4">
               <div className= "font-bold text-blue-400 text-xlmb-2">
                  <b>{title}</b>
               </div>
            
            <strong>Released: </strong> {year}
               <div class= "flex space-x-1 ...">
                  <img src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/htc/37/speech-balloon_1f4ac.png" alt={id} width="15px" height="15px"/>
                  <p>{comments.length}</p>
                  <p>Comments</p>
               </div>
            <p onClick ={handleClick}> ❤️ {counter} Likes</p>
            </div>
         </div>
      )
}

export default Movie