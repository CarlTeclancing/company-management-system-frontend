import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import Tabs from '../../components/layout/Tabs'
import UserProfile from '../../components/dashboard/userComponents/UserProfile'
import AddUser from '../../components/dashboard/userComponents/AddUser'
import UserList from '../../components/dashboard/userComponents/UserList'
import AddButton from '../../components/common/AddButton'

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
        <div className="row">
            <h1>Users Management</h1>
            <>
                <AddButton value={"Add User"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
            </>
        </div>
      
      <Tabs tabData={tabData} />
      <UserProfile />
      <UserList />
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
                {activeModal== true? <AddUser modal={true}  />:""}

        </div>
    </Layout>
  );
}

export default Users;
