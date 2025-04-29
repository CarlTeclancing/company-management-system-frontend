import React from 'react'
import Button from './components/common/button'
import AddButton from './components/common/AddButton'
import Widget from './components/common/Widget'
import FinancialOverview from './components/dashboard/FinancialOverview'
import TaskOverview from './components/dashboard/TaskOverview'
import RecentActivities from './components/dashboard/RecentActivities'

function App() {
  return (
    <div>
      <Button value={"Sign in"} type={"btn-primary"} />
      <AddButton value={"Add Widget"} type={"btn-secondary"} />
      <Widget title={"Task"} value={"12"} valueUp={12} message={'uncompleted task'} />
      <FinancialOverview />
      <TaskOverview />
      <RecentActivities />
    </div>
  )
}

export default App