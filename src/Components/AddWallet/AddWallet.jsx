import React, { useState } from 'react'
import "./AddWallet.css"
import { useSnackbar } from 'notistack'

function AddWallet({balance,setbalance,setwalletopen}) {
  const [walletAdd,setWalletadd]=useState("");
  const { enqueueSnackbar}=useSnackbar()
  const handlebalance=(e)=>{
    const amount=parseFloat(walletAdd)
    e.preventDefault();
    if(isNaN(amount) || amount<0){
      enqueueSnackbar("please enter valid money",{variant:"warning"})
      setwalletopen(false);
    }
    else{
      console.log("Previous Balance:", balance);
      setbalance((prev)=>prev+amount);
      setWalletadd("");
      console.log("Previous Balance:", balance);
      setwalletopen(false);
    }
   
  }
  const handlewallCancel=(e)=>{
    e.preventDefault();
    setwalletopen(false);
  }

  return (

    <div>
      <div className="AddWallet">
        <h3 className='heading'>Add Balance</h3>
        <div style={{padding:"20px"}}>
        <form onSubmit={(e)=>handlebalance(e)}>
          <input className="inputs" value={walletAdd} placeholder='Income Amount' onChange={(e)=>setWalletadd(e.target.value)}/>
          <button className='button3' type="submit">Add balance</button>
          <button className='button4'onClick={(e)=>handlewallCancel(e)}>Cancel</button>
        </form>
        </div>
       
      </div>
    </div>
  )
}

export default AddWallet;