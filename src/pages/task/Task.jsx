import React from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton';

const Task = () => {

  const [activeModal, setActiveModal] = React.useState(false);
  return (
    <Layout>
        <div className="row">
            <h3>Task Management</h3>
            <AddButton value={"Add Task"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
        </div>
    </Layout>
  )
}

export default Task
