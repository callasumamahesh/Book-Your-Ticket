import { useEffect, useState } from 'react'
import MovieIcon from './assets/MovieIcon.jpg'
import{Routes,Route, useNavigate} from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import HomePage from './Components/HomePage'
import SingleMoviePage from './Components/SingleMoviePage'
import SeatPage from './Components/SeatPage'
import ProceedToPay from './Components/ProceedToPay'

function App() {
  let navigation = useNavigate()
  const [user,setUser] = useState();
  const [screen,setScreen] = useState(
    window.innerWidth <=800,
  )

    // useEffect(()=>{
    //   window.addEventListener('resize',() => {
    //     setScreen(window.innerWidth <= 800);
    //     return()=>{
    //       window.removeEventListener('resize',() =>{
    //         setScreen(window.innerWidth <= 800);
    //       })
    //     }
    //   })
    // },[])


    useEffect(()=>{
      const UserEmail = localStorage.getItem('Email');
      if(UserEmail){
        setUser(UserEmail)
      }
    },[])


    // const LoginUser =  (e) => {
    //   e.preventDefault()
    //   const UserEmail = localStorage.getItem('Email');
    //   if(UserEmail){
    //     setUser(UserEmail)
    //     console.log('good')
    //   }
    //   else{
    //     alert('Please SignUp First')
    //   }
    // }


  const handleuser = (getuser) =>{
    setUser({...getuser})
  }


  // const styleForHeader  = {
  //   display : screen ? 'flex' :'flex',
  //   flexDirection : screen ? 'column': 'row,',
  //   flexWrap : screen ? 'wrap' : 'nowrap'
  // }


  return (
    <main className='main'>

      
    <header className = "header" >
      <div className='section1'>
        <img className='MovieIcon' onClick={() => navigation('/')} src={MovieIcon} alt="icon" />
        <h1 style={{color: 'teal'}}>Book Your Ticket</h1>
      </div>
      {user ?
      <div>
        <button className='PrimaryButton' onClick={()=>{
          localStorage.removeItem('Email');
          navigation('/');
        }} >Log out</button>
      </div>
      :
      <div style={{display:'flex',justifyContent:'flex-end'}} className='Buttonsdiv'>
        <button style={{marginRight : '1rem'}} className='PrimaryButton add' onClick={() => navigation('/signup')}>SignUp</button>
        <button className='PrimaryButton add' onClick={(e) => navigation('/')}>Login</button>
      </div>
      }



    </header>
    <Routes>
    <Route path="/home" element={<HomePage />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp handleuser = {handleuser}/>} ></Route>
      <Route path="/movie/:id" element={<SingleMoviePage />}></Route>
      <Route path="/selectseat" element={<SeatPage />}></Route>
      <Route path="/Paymentsuccess" element={<ProceedToPay />}></Route>
    </Routes>
    </main>
  )
}

export default App
