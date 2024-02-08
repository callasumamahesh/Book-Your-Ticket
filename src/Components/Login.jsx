
import React, { useEffect, useState } from 'react';
import movieimage from '../assets/moviepageimage.jpg';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigation = useNavigate();
    const [LoginEmail,setLoginEmail] = useState()
    const [screen, setScreen] = useState(window.innerWidth <= 1000);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const isScreen = () => {
            setScreen(window.innerWidth <= 1000);
        };

        isScreen();
        window.addEventListener('resize', isScreen);

        return () => {
            window.removeEventListener('resize', isScreen);
        };
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const LoginpageStyle = {
        flexDirection: screen ? 'column' : 'row',
        height : screen ? 'auto' : '85vh',
    };

    const mobileScreenSize = {
        width: screen ? '350px' : '400px',
        height: screen ? '350px' : '400px',
    };

    const navigatetoSignUp = (event) => {
        event.preventDefault();
        navigation('/signup');
    }
    const handleEmail = () => {
        const getUserEmail = localStorage.getItem('Email');
        if(getUserEmail){        
            setLoginEmail(getUserEmail)
            navigation('/home')
        }
        else{
            alert('Please SignUp First')
        }
    }


    return (
        <div className='LoginPage' style={LoginpageStyle}>
            <div className='ImageInLoginPage'>
                <img src={movieimage} alt='MovieHomePageImage' style={mobileScreenSize} />
            </div>
            <div className='form'>
                <form className='formItems'>
                    <input type='text' placeholder='Username' className='inputField' />
                    <div className='passwordIcons'>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Password'
                            className='inputField'
                            id='password'
                            style={{marginLeft:'1rem'}}
                        />
                        <i className='fa-solid fa-eye' onClick={togglePasswordVisibility} style={{ display: passwordVisible ? 'none' : 'block' }} id='icon1'></i>
                        <i className='fa-solid fa-eye-slash' onClick={togglePasswordVisibility} style={{ display: passwordVisible ? 'block' : 'none'}} id='icon2'></i>
                    </div>
                    <button className='PrimaryButton' 
                        onClick={(e)=>{
                            handleEmail()
                        }}
                    >Login</button>
                    <p className='matterinloginpage'>New to Book Your Ticket</p>
                    <p>Click here to <span style={{textDecoration:'underline',cursor:'pointer'}} onClick={navigatetoSignUp}>Sign Up</span></p>
                </form>
            </div>
        </div>
    );
}

export default Login;