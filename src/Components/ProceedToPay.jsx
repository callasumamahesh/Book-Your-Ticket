import React from 'react'
import enjoyMovie from '../assets/enjoyMovie.png'
import qrcode from '../assets/qrcode.png'

function ProceedToPay() {
  return (
    <>
    <h1 style={{textAlign:'center',color:'white'}}>Enjoy Your Movie</h1>
    <div className="paymentSection">
        <div style={{display:'flex',flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',}}>
            <img src={enjoyMovie} alt="Enjoy The Movie" style={{width:'300px',height:'300px'}}/>
            <h5>Tickets Confirmed</h5>
        </div>
        <div style={{display:'flex',flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',}}>
            <img src={qrcode} alt="Enjoy The Movie" style={{width:'300px',height:'300px'}}/>
        </div>
    </div>
    </>
  )
}

export default ProceedToPay