import React from 'react'
import { Link } from 'react-router-dom'

function Meeting() {
  const u = 0
  return (


          <table className='table'>
                  <tr>
                      <th>Meetings</th>
                      <th>Date & Time</th>
                      <th>Platform</th>
                      <th>Participants</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
                  <br /><br />
                  <tr>
                    <td>
                      <span>Quarterly Review Meeting</span><br/>
                      <span>Acme Inc. Website Redesign</span>
                    </td>

                    <td>
                      <span><i class="bi bi-calendar4-event"></i> May 5, 2025</span><br/>
                      <span><i class="bi bi-stopwatch"></i> 10:00 AM - 11:30 AM</span>
                    </td>
                    <td>
                      <span><i class="bi bi-camera-video"></i> Google Meet</span>
                    </td>
                    <td>
                      <span><i class="bi bi-link"></i> Join Meeting</span><br/>
                      <span><i class="bi bi-copy"></i> Copy link</span>
                    </td>
                    <td>
                      <span className="action">Scheduled</span>
                    </td>
                    <td>
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
                    </td>
                  </tr>
          </table>
      
    

  )
}

export default Meeting