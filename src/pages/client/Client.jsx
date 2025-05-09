import { useState } from 'react'
import React from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton';

function Client() {
    const [activeModal, setActiveModal] = useState(false);
  return (
    <Layout>
        <div className="row">
            <h1>Client Management</h1>
            <>
                <AddButton value={"Add client"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
            </>
        </div>
    </Layout>
  )
}

export default Client