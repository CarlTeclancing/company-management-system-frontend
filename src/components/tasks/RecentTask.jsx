import React from 'react'
import check from '../../assets/icons/check.png'
import pending from '../../assets/icons/notchecked.png'
import inprogress from '../../assets/icons/progress.png'

function RecentTask(status) {
  return (
    <div className="recent-task">
    <div className="active-task">
        <img src={check} alt="" />
        <div className="content">
            <h4>Task Completed</h4>
            <p>John completed the inventory audit task</p>
        </div>
        <span>4 hours ago</span>
    </div>
</div>
  )
}

export default RecentTask