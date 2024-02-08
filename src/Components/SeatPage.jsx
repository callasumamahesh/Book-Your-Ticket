import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function SeatPage() {
    let navigation = useNavigate()
    const location = useLocation();
    const {SingleTheartre} = location.state;
    const [totalNumberOfSeats,settotalNumberOfSeats] = useState([])
    const [seatSelection,setSeatSelection] = useState([])

    function allSeats(){
        let ch = 'A';
        let totalNumberOfSeats1 = []
        for(let i=1;i<6;i++){
            let singleRow = []
            for(let j=1;j<9;j++){
                let seatNumber = ch+j;
                singleRow.push(seatNumber)
            }
            ch = String.fromCharCode(ch.charCodeAt(0) +1);
            totalNumberOfSeats1.push(singleRow);
        }
        settotalNumberOfSeats(totalNumberOfSeats1)
    }

    useEffect(()=>{
        allSeats()
    },[])

    const handleSeats = (selectedSeat) => {
        console.log(selectedSeat)
        setSeatSelection([selectedSeat,...seatSelection]);
        console.log(seatSelection)
    };
    useEffect(() => {
        console.log('Updated seatSelection:', seatSelection);
      }, [seatSelection]);
    

  return (
    <>
    
    <div>
        <h1 style={{color:'white',marginLeft:'1rem'}}>{SingleTheartre}</h1>
        <p style={{textAlign:'center',margin:'1rem 0rem',}}>Screen This Side</p>
    </div>
    <div className='totalSeats'>
        {totalNumberOfSeats.map((item, index) => {
            return(
                
                <div key={index}>
                    {
                        item.map((seat) => {
                            let isSeat = seatSelection.indexOf(seat) > -1;
                            return(
                                
                                <button style={{backgroundColor : isSeat ? 'orange' : 'none', color: isSeat ? 'white':'none'}} onClick={() => handleSeats(seat)} key={seat} className='seatButton'>{seat}</button>
                            )
                        })
                    }
                </div>
            )
        })}
    </div>
    <h1 style={{marginLeft:'1rem',color:'white',marginBottom:'.5rem',}}>Selected seats are</h1>
    <div className='seatBottom'>
        {seatSelection.length > 0 ? <div className="YouSelectedSeat">{
            
            seatSelection.map((seat) => {
                return(
                    <div>
                        <button style={{width:'100px',padding:'10px',marginLeft:'1rem',marginTop:'1rem'}}>{seat}</button>
                    </div>
                )
            })
            }</div> : <div style={{marginLeft:'2rem'}}>No Seat Selected</div>}
        <div>
            <h3>Total Ruppes : {seatSelection.length*200}</h3>
            <button style={{marginRight:'2rem'}} class="PrimaryButton" onClick={()=>{
                navigation('/Paymentsuccess')
            }}>Proceed To Payment</button>
        </div>
    </div>
    </>
  )
}

export default SeatPage