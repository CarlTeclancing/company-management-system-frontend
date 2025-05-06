import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import GeneralHeader from '../../components/layout/GeneralHeader'
import Tabs from '../../components/layout/Tabs'
import UserProfile from '../../components/dashboard/userComponents/UserProfile';
import AddUser from '../../components/dashboard/userComponents/AddUser';


//tab data
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

    const [modal, setModal] = useState(false)
  return (
    <Layout>
        <GeneralHeader pNmame={"Users"} btnValue={"Add Users"} />
        <Tabs tabData={tabData} />
        <UserProfile />
        {modal === true?<AddUser />:""}
    </Layout>
  )
}

export default Users