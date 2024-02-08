import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import axios from 'axios';

function SingleMoviePage() {
    const { id } = useParams();
    const navigation = useNavigate();
    const [data,setMovieData] = useState('')
    const [userlocation,setUserLocation] = useState({})
    const [theatre,setTheatre] = useState([])
    const Timings = ["11:00AM","02:30pm","6:00PM","9:30PM"]

    useEffect(()=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation( {
                    UserLatitude : position.coords.latitude,
                    UserLongitude : position.coords.longitude, 
                } )
            })
        }
        else{
            console.log('NO navigation')
        }
    },[])

    useEffect(()=>{
        const getUserLocation = async () =>{
            if(Object.keys(userlocation).length > 0){
                //const userlocationData = await axios.get(`https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:${userlocation.UserLongitude},${userlocation.UserLatitude},100000&bias=proximity:78.2289017259476,15.757573979194618&limit=20&apiKey=16a4653de765489c9275d63f01b55439`);
                const userlocationData = await axios.get(`https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:${userlocation.UserLongitude},${userlocation.UserLatitude},100000&bias=proximity:${userlocation.UserLongitude},${userlocation.UserLatitude}&limit=20&apiKey=16a4653de765489c9275d63f01b55439`);
                console.log(userlocationData.data)
                const featuresArray = await userlocationData.data.features; 
                const theatreNames = []
                featuresArray.map((feature) => theatreNames.push(feature.properties.name));
                setTheatre(theatreNames)
            }
            else{
                console.log('User location is not getted')
            }
        }
        getUserLocation()
    },[userlocation])


    // useEffect(()=>{
    //     const getUserLocation = async () =>{
    //         if(Object.keys(userlocation).length > 0){
    //             let userlocationData = await axios.get('https://api.geoapify.com/v2/places?categories=entertainment.cinema&filter=circle:78.2289017259476,15.757573979194618,100000&bias=proximity:78.2289017259476,15.757573979194618&limit=20&apiKey=16a4653de765489c9275d63f01b55439');
    //             const featuresArray = await userlocationData.data.features; 
    //             const theatreNames = []
    //             featuresArray.map((feature) => theatreNames.push(feature.properties.name));
    //             setTheatre(theatreNames)
    //         }
    //         else{
    //             console.log('User location is not getted')
    //         }
    //     }
    //     getUserLocation()
    // },[userlocation])

    useEffect(() => {
        const fetchData = async () =>{
            try{
                let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9b48421e56beff9d0381692f8b0ee7d7&language=en-US`);
                let data = await response.json();
                setMovieData(data)
            }
            catch(error){
                console.log('error is',error)
            }
            
        } 
        fetchData()
    },[id])
  return (
    <div class="singleMovieMainPage">
        <div className="aboutMovie">
            <img style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                margin:'1rem 0rem',
                borderRadius:'20px',
            }}
            id="moviepageImage"
            src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`} alt="" />
            <h2>{data.title}</h2>
            <p>{data.overview}</p>
        </div>
        <h1 style={{textAlign:'center',margin:'1rem 0rem',color:'rgb(255,255,255,0.7)'}} className='nearyou'>Theatres Near you</h1>
        <div className='Alltheatres'>
            {theatre.map((SingleTheartre, index) => {
                return(
                    <div key={index}>
                        <h2 style={{marginLeft:'0.7rem'}}>{SingleTheartre}</h2>
                        <div>
                            {Timings.map((MovieTime, index) => {
                                return(
                                    <button onClick = {()=>{navigation('/selectseat',{state : {SingleTheartre: SingleTheartre} })}} key={index} className="timingsButton">{MovieTime}</button>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default SingleMoviePage