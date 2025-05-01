import React from 'react'
import SideBar from '../../components/layout/SideBar'
import TopBar from '../../components/layout/TopBar'
import Layout from '../../components/layout/Layout'
import RecentActivities from '../../components/dashboard/RecentActivities'
import TaskOverview from '../../components/dashboard/TaskOverview'
import FinancialOverview from '../../components/dashboard/FinancialOverview'
import ProjectStatus from '../../components/dashboard/ProjectStatus'
import Widget from '../../components/common/Widget'
import AddButton from '../../components/common/AddButton'

function Dashbaord() {

    //project data for the projectstatus component
    const projectData = [
        {
          name: 'Website Redesign',
          status: 'On Track',
          progress: 75,
        },
        {
          name: 'Mobile App Development',
          status: 'Delayed',
          progress: 45,
        },
        {
          name: 'CRM Integration',
          status: 'At Risk',
          progress: 30,
        },
        {
          name: 'CRM Integration',
          status: 'Completed',
          progress: 100,
        },
      ];
  return (
    <>
        <Layout>
            <div className="row">
                <h1>Dashbaord</h1>
                <>
                <AddButton value={"Add Widget"} type={"btn-primary"} />
                </>
            </div>
            <div className="row">
            <Widget title={"Task"} value={"12"} valueUp={12} message={'uncompleted task'} />
            <Widget title={"Projects"} value={"9"} valueUp={4} message={'uncompleted Projects'} />
            <Widget title={"Inventory"} value={"120"} valueUp={16} message={'Missing itens Low stock'} />
            <Widget title={"Finances"} value={"200900xaf"} valueUp={45} message={'This Month Revenue'} />
            </div>
            <div className="row">
                <FinancialOverview />
                <TaskOverview />
                
            </div>
            <div className="row">
                <ProjectStatus projects={projectData} />
                <RecentActivities />
                
            </div>
        </Layout>
    </>
  )
}

export default Dashbaord