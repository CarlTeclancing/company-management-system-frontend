import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import GeneralHeader from '../../components/layout/GeneralHeader'
import Tabs from '../../components/layout/Tabs'
import UserProfile from '../../components/dashboard/userComponents/UserProfile'
import AddUser from '../../components/dashboard/userComponents/AddUser'
import { useLocation } from 'react-router-dom'

// Tab data
let tabData = [
  {
    tabNumb: 1,
    tabValue: "Grid View"
  },
  {
    tabNumb: 2,
    tabValue: "List View"
  },
];

function Users() {
 
  const [activeModal, setActiveModal] = useState(false);


  return (
    <Layout>
      <GeneralHeader pNmame={"Users"} btnValue={"Add Users"} />
      <button onClick={()=>setActiveModal(true)}>Add user</button>
      <Tabs tabData={tabData} />
      <UserProfile />
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
                {activeModal== true? <AddUser modal={true}  />:""}

        </div>
    </Layout>
  );
}

export default Users;
