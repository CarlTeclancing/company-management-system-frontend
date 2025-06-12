import { useState } from 'react'
import React from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton';
import ClientList from '../../components/dashboard/clientsComponents/ClientList';
import AddClient from '../../components/dashboard/clientsComponents/AddClient';

function Clients() {
    const [activeModal, setActiveModal] = useState(false);
  return (
    <Layout>
        <div className="row">
            <h1>Client Management</h1>
            <>
                <AddButton value={"Add client"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
            </>
        </div>
          <h4>All Clients</h4>
            <div className="row">
              <ClientList />
            </div>

        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
            {activeModal == true? <AddClient modal={true}  />:""}

        </div>
        
    </Layout>
  )
}

export default Clients