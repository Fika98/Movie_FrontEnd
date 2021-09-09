import React from 'react'

let Header = (props) => {

   const callbackFunc = (evt) =>{
      props.changeSearchTerm(evt.target.value)
   }
      return(
         <div>
            <div className='max-w-sm rounded overflow-hidden my-10 mx-auto'>
            <form className="w-full max-w-sm">
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input 
               className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
               type="text" 
               placeholder="Search Movie Term..."
               value={props.searchTerm}
               onChange={callbackFunc}
            />
            <button className="flex-shrink-0 bg-green-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Search</button>
            </div>
            </form>
		      </div>
         </div>
      )
}



export default Header