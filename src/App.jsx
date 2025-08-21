import React from 'react'
import Button from './components/common/Button';
import AddButton from './components/common/AddButton'
import Widget from './components/common/Widget'
import FinancialOverview from './components/dashboard/FinancialOverview'
import TaskOverview from './components/dashboard/TaskOverview'
import RecentActivities from './components/dashboard/RecentActivities'
import ProjectStatus from './components/dashboard/ProjectStatus'

function App() {
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
      <Button value={"Sign in"} type={"btn-primary"} />
      <Button value={"Sign in"} type={"btn-primary-100"} />
      <AddButton value={"Add Widget"} type={"btn-secondary"} />
      <Widget title={"Task"} value={"12"} valueUp={12} message={'uncompleted task'} />
      <FinancialOverview />
      <TaskOverview />
      <RecentActivities />

      <ProjectStatus projects={projectData} />
    </>
  )
}

export default App