import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton'
import AllInvoices from '../../components/dashboard/invoiceComponent/AllInvoices';
import Tabs from '../../components/layout/Tabs';
import AddInvoice from '../../components/dashboard/invoiceComponent/AddInvoice';

function Invoice() {
  const [activeModal, setActiveModal] = useState(false);
  return (
    <Layout>
      <div className="row">
        <h1>Invoices</h1>
        <AddButton value={"Add Task"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
      </div>
              <Tabs tabData={[
            {
                tabNumb: 1,
                tabValue: "All Invoices"
            },
            {
                tabNumb: 2,
                tabValue: "Pending"
            },
            {
                tabNumb: 3,
                tabValue: "Paid"
            }
        ]}/>
        <br /><br />
      <AllInvoices />

        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
            {activeModal== true? <AddInvoice modal={true}  />:""}

        </div>
    </Layout>
  )
}

export default Invoice