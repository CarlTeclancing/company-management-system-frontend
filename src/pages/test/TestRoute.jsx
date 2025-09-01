import React, { useState } from 'react'

function Test() {
  const [action, setAction] = useState('No action yet');
  const [name, setName] = useState('');

  const submitData =(e)=>{
    e.preventDefault();
    console.log(name);
  }

  //functions that you run
  //useState, useEffect, useAction useRef, useContext
  return (
    <div>

      <form action="" onSubmit={submitData}>
        <input type="text" placeholder='enter name' name='name' value={name} onChange={(e) =>setName(e.target.value)}/>
        <button>submit data</button>
      </form>
      <p>{action}</p>
      <button onClick={() => setAction('Action set to true')}>Click to set action to true</button>
    </div>
  )
}

export default Test