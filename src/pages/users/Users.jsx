import React from 'react'
import Layout from '../../components/layout/Layout'
import GeneralHeader from '../../components/layout/GeneralHeader'
import Tabs from '../../components/layout/Tabs'
import UserProfile from '../../components/dashboard/userComponents/UserProfile';


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
  return (
    <Layout>
        <GeneralHeader pNmame={"Users"} btnValue={"Add Users"} />
        <Tabs tabData={tabData} />
        <UserProfile />
    </Layout>
  )
}

export default Users