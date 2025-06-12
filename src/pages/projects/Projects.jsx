import React from 'react'
import Layout from '../../components/layout/Layout'
import AddButton from '../../components/common/AddButton'
import Tabs from '../../components/layout/Tabs'
import ProjectCard from '../../components/dashboard/projectsComponents/ProjectCard'
import AddProjects from '../../components/dashboard/projectsComponents/AddProjects'
import AllProjects from '../../components/dashboard/projectsComponents/AllProjects'

function Projects() {
    const [activeModal, setActiveModal] = React.useState(false);
  return (
    <Layout>
        <div className="row">
            <h1>Projects Tracker</h1>
            <AddButton type={"btn-primary"} value={"Add Projects"} onClick={()=>setActiveModal(true)} />
        </div>
        <>
        <Tabs tabData={[
            {
                tabNumb: 1,
                tabValue: "All Projects"
            },
            {
                tabNumb: 2,
                tabValue: "Active"
            },
            {
                tabNumb: 3,
                tabValue: "Completed"
            },
            {
                tabNumb: 4,
                tabValue: "Delayed"
            },
        ]}/>
        </>
        <div className="row">
            <AllProjects />
        </div>
        <div className={activeModal == true ?"form-container-overlay":"none"}>
            <i className="bi bi-x" id='close' onClick={()=>setActiveModal(false)}></i>
            {activeModal == true? <AddProjects modal={true}  />:""}

        </div>
        
    </Layout>
  )
}

export default Projects