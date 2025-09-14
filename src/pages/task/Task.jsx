import React from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton';
import RecentTask from '../../components/tasks/RecentTask';
import TaskComponent from '../../components/tasks/TaskComponent';
import AddTask from '../../components/tasks/AddTask';
import Tabs from '../../components/layout/Tabs';
import KanbanColumn from '../../components/tasks/KanbanColumn';
import KanbanTaskCard from '../../components/tasks/KanbanTaskCard';
import KanbanBoard from '../../components/tasks/KanbanBoard';

const Task = () => {

  const [activeModal, setActiveModal] = React.useState(false);
  return (
    <Layout>
        <div className="row">
            <h3>Task Management</h3>
            <AddButton value={"Add Task"} type={"btn-primary"}  onClick={()=>setActiveModal(true)}/>
        </div>
                <>
        <Tabs tabData={[
            {
                tabNumb: 1,
                tabValue: "All Task"
            },
            {
                tabNumb: 2,
                tabValue: "ToDo"
            },
            {
                tabNumb: 3,
                tabValue: "In Progress"
            },
            {
                tabNumb: 4,
                tabValue: "Done"
            },
        ]}/>
        </>


          <br /><br />
          <h2>All Task</h2><br />
         <KanbanBoard />
 
        
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
            {activeModal== true? <AddTask modal={true}  />:""}

        </div>
    </Layout>
  )
}

export default Task
