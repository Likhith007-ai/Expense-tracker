import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import "./Pagination.css"


function Pagination({currentpage,totalpage,setcurrentpage}) {
    const leftArrow=()=>{
        if(totalpage!==currentpage){
            setcurrentpage((prev)=>prev+1);
            
        }
    }
    const rightArrow=()=>{
        if(currentpage>1 ){
            setcurrentpage((prev)=>prev-1);
        }
    
    }
  return (
    <div>
        <div style={{display:"flex" ,justifyContent:'center'}}><IoIosArrowRoundBack className="arrow" onClick={()=>rightArrow()} />
          <div className="num">{currentpage}</div>
          <IoIosArrowRoundForward className="arrow" onClick={()=>leftArrow()}/>
          </div>
    </div>
  )
}

export default Pagination