import React from "react";
import ReactModal from "react-modal";
import "./Modals.css"
ReactModal.setAppElement("#root");

function ReModals({ walletopen,setwalletopen, children }) {
    const handleclose=()=>{
        setwalletopen(false);
    }
  return (
    <div>
      <ReactModal isOpen={walletopen} onRequestClose={()=>handleclose()}  className="modal"
      overlayClassName="overlay">{children}</ReactModal>
    </div>
  );
}

export default ReModals;