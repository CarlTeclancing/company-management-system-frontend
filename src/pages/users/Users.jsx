import React, { useState, useContext } from 'react'
import Layout from '../../components/layout/Layout'
import Tabs from '../../components/layout/Tabs'
import UserProfile from '../../components/dashboard/userComponents/UserProfile'
import AddUser from '../../components/dashboard/userComponents/AddUser'
import UserList from '../../components/dashboard/userComponents/UserList'
import AddButton from '../../components/common/AddButton'
import { AppContext } from '../../contexts/AppContext'
import GeneralCalender from '../../components/dashboard/calender/GeneralCalender'

// Tab data
let tabData = [
  {
    tabNumb: 1,
    tabValue: "All Users"
  },
  {
    tabNumb: 2,
    tabValue: "View General Calender"
  },
];

function Users() {

  const {companyData, setCompanyData} = React.useContext(AppContext);
 
  const [activeModal, setActiveModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1)


  return (
    <Layout>
        <div className="row">
            <h1>Users Management</h1>
            <>
                <AddButton value={"Add User"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
            </>
        </div>
      
      <div className='global-tab'>
        {tabData.map((data) => (
          <button
            key={data.tabNumb}
            className={activeTab === data.tabNumb ? 'active-tab' : 'in-active-tab'}
            onClick={() => setActiveTab(data.tabNumb)}
          >
            {data.tabValue}
          </button>
        ))}
      </div>
      {/*<UserProfile />*/}
      {activeTab ===1 && (
        <>
          <hr />
          <h3>Employees</h3>
          <hr />
          <UserList />
        </>
        )}
      {activeTab ===2 && (
        <>
          <hr />
          <h3>General Company Calender</h3>
          <hr />
          <GeneralCalender />
        </>
        )}
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
                {activeModal== true? <AddUser modal={true}  />:""}

        </div>
    </Layout>
  );
}

export default Users;
