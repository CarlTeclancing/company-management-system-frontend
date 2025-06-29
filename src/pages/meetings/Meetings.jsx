import React from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton'
import AddMeetings from '../../components/dashboard/meetingComponents/AddMeeting';

function Meetings() {
  const [activeModal, setActiveModal] = React.useState(false);
  return (
    <Layout>
        <div className="row">
            <h1>Meetings</h1>
            <AddButton type={"btn-primary"} value={"Add Meeting"} onClick={()=>setActiveModal(true)} />
        </div>
        <div className="row">
            <h2>All Meetings</h2>
            {/* Here you can add a component to display all meetings */}
            <Meetings/>
        </div>
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
            {activeModal == true? <AddMeetings />:""}

        </div>
    </Layout>
  )
}

export default Meetings