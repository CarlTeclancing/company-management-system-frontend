import React, { useState } from 'react';

//this componnet takes the tabData which is an object that has two value pair
//tabnumbr and tabvalue

function Tabs( {tabData}) {
  const [active, setActive] = useState(1);

  return (
    <div className='global-tab'>
      {tabData.map((data) => (
        <button
          key={data.tabNumb}
          className={active === data.tabNumb ? 'active-tab' : 'in-active-tab'}
          onClick={() => setActive(data.tabNumb)}
        >
          {data.tabValue}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
