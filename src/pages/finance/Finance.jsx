import React from 'react'
import Layout from '../../components/layout/Layout'
import Widget from '../../components/common/Widget'
import ProjectStatus from '../../components/dashboard/ProjectStatus'
import RecentActivities from '../../components/dashboard/RecentActivities'
import FinancialOverview from '../../components/dashboard/FinancialOverview'
import TaskOverview from '../../components/dashboard/TaskOverview'
import AddButton from '../../components/common/AddButton'

function Finance() {
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
    <Layout>
        <div className="row">
            <h1>Dashbaord</h1>
            <>
            <AddButton value={"Add Finance Record"} type={"btn-primary"} />
            </>
        </div>
        <div className="row-narrow">
            <Widget title={"Total Revenue"} value={"120000"} valueUp={12} message={'30% up this month'} />
            <Widget title={"Total Debits"} value={"90000"} valueUp={4} message={'10% Down ths month'} />
            <Widget title={"Inventory Net"} value={"120000"} valueUp={16} message={'Missing itens Low stock'} />
            <Widget title={"Finances"} value={"12B xaf"} valueUp={45} message={'This Month Revenue'} />
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
  )
}

export default Finance