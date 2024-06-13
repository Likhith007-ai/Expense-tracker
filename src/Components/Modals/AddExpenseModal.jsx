import React from "react";
import ReactModal from "react-modal";
import "./Modals.css"
ReactModal.setAppElement("#root");

function ReModals({ expenseopen,setexpenseopen, children }) {
    const handleclose=()=>{
        setexpenseopen(false);
    }
  return (
    <div>
      <ReactModal isOpen={expenseopen} onRequestClose={()=>handleclose()}  className="modal"
      overlayClassName="overlay">{children}</ReactModal>
    </div>
  );
}

export default ReModals;