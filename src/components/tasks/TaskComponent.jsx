import React from 'react'
import check from '../../assets/icons/check.png'
import pending from '../../assets/icons/notchecked.png'
import inprogress from '../../assets/icons/progress.png'
import { Link } from 'react-router-dom'

function TaskComponent(status) {

  let u = 0
  return (
    <div className="recent-task">
    <div className="active-task">
        <div className="row-narrow-p0">
          <div className="row-narrow">
            <img src={check} alt="" />
            <h4>Task Completed</h4>
          </div>
            <p>John completed the inventory audit task</p><br/>
            <div className='m-1'>
              <button className='action'>Priority: High</button>
              <span><i class="bi bi-calendar4-event"></i>    Due: 12/03/2025</span>
              <span><i class="bi bi-chat-left-dots"></i>: 12 Comments</span>

            </div>
        </div>
        
        <div className='drop'>
          <i class="bi bi-three-dots"></i>
        <div className="drop-down">
                <ul>
                  <Link 
                    to={`/users/edit/${u.id}`}
                    state={u}
                    >
                    <li><i class="bi bi-pencil-square"></i> Edit</li>
                  </Link>
                  <Link 
                  to={`/users/delete/${u.id}`}
                  state={u}
                  >
                    <li><i class="bi bi-trash"></i> Delete</li>
                  </Link>
                  <Link to={`/users/view/${u.id}`}>
                    <li><i class="bi bi-eye"></i> View</li>
                  </Link>
                </ul>
        </div>
        </div>
    </div>
</div>
  )
}

export default TaskComponent