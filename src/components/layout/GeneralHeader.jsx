import React, { useState } from "react";
import AddButton from "../common/AddButton";

function GeneralHeader( {pNmame, btnValue, modal, showBtn} ) {
    
  return (
    <div className="row">
      <h1>{pNmame}</h1>
      <>
        {showBtn == true ?<AddButton value={btnValue} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>:""}
      </>
    </div>
  );
}

export default GeneralHeader;
