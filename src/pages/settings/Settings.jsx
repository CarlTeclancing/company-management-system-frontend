import React from 'react'
import Layout from '../../components/layout/Layout'
import GeneralHeader from '../../components/layout/GeneralHeader'
import AddButton from '../../components/common/AddButton'

function Settings() {
  return (
    <Layout>
        <GeneralHeader pNmame={"Settings"} showBtn={false} />
        <div className="row">
            <h3>Company Information</h3>
            <AddButton value={"Setup Company Information"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
        </div>
        <div className="row">
            <h3>User Information</h3>
        </div>
        <div className="row">
            <h3>Other Settings</h3>
        </div>
    </Layout>
  )
}

export default Settings