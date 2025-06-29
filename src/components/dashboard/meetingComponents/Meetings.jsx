import React from 'react'

function Meetings() {
  return (
    <div className='row'>
        <h2>Meeting List</h2>
        <p>View of all scheduled meetings</p>
        <table>
                <tr>
                    <th>Meetings</th>
                    <th>Date & Time</th>
                    <th>Platform</th>
                    <th>Participants</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
        </table>
    </div>
  )
}

export default Meetings