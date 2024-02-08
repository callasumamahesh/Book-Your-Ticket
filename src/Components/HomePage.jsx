import React, { useState } from 'react'
import { useEffect } from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
function HomePage() {
  let navigation = useNavigate()
    const [movieData,setMovieData] = useState()
    const [forMobile,setForMobile] = useState(
      window.innerWidth <= 600,
    )

    // useEffect(()=>{
    //   const isScreen = () =>{
    //     setForMobile(window.innerWidth <= 600);
    //   }
    //   window.addEventListener('resize',isScreen);
    //   return()=>{
    //     window.removeEventListener('resize',isScreen)
    //   }
    // },[])



    // useEffect(() => {
    //     const DataFunction = async ()=>{
    //         try{
    //             let response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=9b48421e56beff9d0381692f8b0ee7d7&language=en-US&page=1');
    //             let data = await response.json();
    //             setMovieData(data.results);
    //             console.log(data.results)
    //         }   
    //         catch(error){
    //             console.log('Error is',error)
    //         }
    //     }
    //     DataFunction()
    // },[])
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=9b48421e56beff9d0381692f8b0ee7d7&language=en-US&page=1')
        .then(response => response.json())
        .then(data => {
          const moviesList = data.results;
          console.log(moviesList)
          setMovieData(moviesList)
        })
      },[])


  return (
    <div>
        <div className='totalMovieData'>
          {movieData &&
            movieData.map((item, index)=>{
              return(
                <div key={item.id} className='singleMovie'>
                  <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="image" className='MovieImage'/>
                  <h3 style={{marginTop:'0.5rem',color:'white'}}>{item.title}</h3>
                  <button 
                  onClick={()=>{
                      navigation(`/movie/${item.id}`)
                  }}
                  style={{marginBottom:'1rem'}} className='PrimaryButton'>Watch</button>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default HomePage