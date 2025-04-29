import React from 'react'
import RecentTask from '../tasks/RecentTask'


function RecentActivities( ) {
  return (
    <div className='recent-activities'>
        <h2>Recent Activities</h2>
        <p>Latest updates and notifications</p>

        {/* Recent Activities */}
        <RecentTask />
        <RecentTask />
        <RecentTask />
        <RecentTask />
    </div>
  )
}

export default RecentActivities