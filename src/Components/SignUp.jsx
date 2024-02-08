import React, { useEffect, useState } from 'react';
import movieimage from '../assets/moviepageimage.jpg';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login({handleuser}) {
    const navigation = useNavigate();
    const [screen, setScreen] = useState(window.innerWidth <= 600);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    useEffect(() => {
        const isScreen = () => {
            setScreen(window.innerWidth <= 600);
        };

        isScreen();
        window.addEventListener('resize', isScreen);

        return () => {
            window.removeEventListener('resize', isScreen);
        };
    }, []);

    const togglePasswordVisibility = (fieldId) => {
        if (fieldId === 'password1') {
            setPasswordVisible1(!passwordVisible1);
        } else if (fieldId === 'password2') {
            setPasswordVisible2(!passwordVisible2);
        }
    };

    const handleUser = (e) => {
        e.preventDefault()
        localStorage.setItem('Email',email);
        navigation('/')
    }

    const LoginpageStyle = {
        flexDirection: screen ? 'column' : 'row',
        height : screen ? 'auto' : '85vh',
    }

    const mobileScreenSize = {
        width: screen ? '300px' : '400px',
        height: screen ? '300px' : '400px',
        margin: screen ? '2rem 0rem' : '3rem 0rem',
    };

    // const Submited = (event) => {
    //     event.preventDefault()
    //     const allData = {email,password}
    //     console.log(allData)
    //     setData({...data,...allData})
    //     localStorage.setItem('UserData',JSON.stringify({...allData}));
    // }

    return (
        <div className='SignUpPage' style={LoginpageStyle}>
            <div className='ImageInSignUpPage'>
                <img src={movieimage} alt='MovieHomePageImage' style={mobileScreenSize} />
            </div>
            <div className='SignUpform'>
                <form className='SignUpformItems' style={{ marginBottom: screen ? '2rem' : '0rem' }}>
                    <input type='text' placeholder='Email' 
                    className='inputField' 
                    value={email}
                    onChange={(e)=>
                        {
                            setEmail(e.target.value)
                            
                        }
                        }
                    />
                    <div className='passwordIcons'>
                        <input
                            type={passwordVisible1 ? 'text' : 'password'}
                            placeholder='Password'
                            className='inputField'
                            id='password1'
                            onChange={(e)=>setPassword(e.target.value)}
                            value = {password}
                            style={{ marginLeft: '1rem'}}
                        />
                        <i
                            className={`fa-solid ${passwordVisible1 ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={() => togglePasswordVisibility('password1')}
                            id='icon1'
                        ></i>
                    </div>
                    <div className='passwordIcons'>
                        <input
                            type={passwordVisible2 ? 'text' : 'password'}
                            placeholder='Password'
                            className='inputField'
                            id='password2'
                            style={{ marginLeft: '1rem' }}
                        />
                        <i
                            className={`fa-solid ${passwordVisible2 ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={() => togglePasswordVisibility('password2')}
                            id='icon2'
                        ></i>
                    </div>
                    <button className='PrimaryButton' onClick={(e) => handleUser(e)}>Sign Up</button>
                    <p className='matterinloginpage'>Already I'm a User</p>
                    <p>Click here to <span onClick={
                        (event)=>{
                            event.preventDefault();
                            navigation('/')
                        }
                    }
                    style={{textDecoration:'underline',cursor:'pointer'}}
                    >Sign In</span></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
