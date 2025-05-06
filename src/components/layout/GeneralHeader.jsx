import React, { useState } from "react";
import AddButton from "../common/AddButton";

function GeneralHeader( {pNmame, btnValue, modal, setModal} ) {
    
  return (
    <div className="row">
      <h1>{pNmame}</h1>
      <>
        <AddButton value={btnValue} type={"btn-primary"} onClick={() =>setModal(true)} />
      </>
    </div>
  );
}

export default GeneralHeader;
