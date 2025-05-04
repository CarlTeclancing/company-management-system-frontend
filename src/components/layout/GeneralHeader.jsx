import React from "react";
import AddButton from "../common/AddButton";

function GeneralHeader( {pNmame, btnValue}) {
  return (
    <div className="row">
      <h1>{pNmame}</h1>
      <>
        <AddButton value={btnValue} type={"btn-primary"} />
      </>
    </div>
  );
}

export default GeneralHeader;
