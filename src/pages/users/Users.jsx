import React, { useState, useContext } from 'react'
import Layout from '../../components/layout/Layout'
import Tabs from '../../components/layout/Tabs'
import UserProfile from '../../components/dashboard/userComponents/UserProfile'
import AddUser from '../../components/dashboard/userComponents/AddUser'
import UserList from '../../components/dashboard/userComponents/UserList'
import AddButton from '../../components/common/AddButton'
import { AppContext } from '../../contexts/AppContext'

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

  const {companyData, setCompanyData} = React.useContext(AppContext);
 
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
      {/*<UserProfile />*/}
      <hr />
      <hr />
      <UserList />
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
                {activeModal== true? <AddUser modal={true}  />:""}

        </div>
    </Layout>
  );
}

export default Users;
