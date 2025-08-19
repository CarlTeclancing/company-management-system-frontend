import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../../globals';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';

function Meeting() {
  const { companyId } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetching, setErrorFetching] = useState('');


  useEffect(() => {
      const id = companyId;
    const getMeetingsById = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/meetings/${id}`);
        setMeetings(response.data);
        console.log('Fetched Meetings:', response.data);
      } catch (error) {
        console.error('Error fetching meetings:', error);
        setErrorFetching(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMeetingsById(id);
  }, [companyId]);

  if (isLoading) return <p>Loading Meeting data</p>
  if (errorFetching) return <p>Error fetching Meeting data</p>
  return (


          <table className='table'>
                  <tr>
                      <th>Meetings Title</th>
                      <th>Date & Time</th>
                      <th>Platform</th>
                      <th>Participants</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
                  <br /><br />
                  <tbody>
                  {meetings.map((meeting) => (
                  <>
                    <tr>
                      <td key={meeting.id}>
                        <span>{meeting.title}</span>
                      </td>   

                      <td>
                        <span><i class="bi bi-calendar4-event"></i> {meeting.date}</span><br/>
                        <span><i class="bi bi-stopwatch"></i>{meeting.start_time} - {meeting.end_time}</span>
                      </td>
                      <td>
                        <span><i class="bi bi-camera-video"></i><span> {meeting.platform}</span></span>
                      </td>
                      <td>
                        <span><i class="bi bi-link"></i><span><Link to={meeting.meeting_link} target='_black'>Join Link</Link></span></span><br/>
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
                                to={`/users/edit/${meeting.id}`}
                                state={meeting}
                                >
                                <li><i class="bi bi-pencil-square"></i> <span>Edit</span></li>
                              </Link>
                              <Link 
                              to={`/users/delete/${meeting.id}`}
                              state={meeting}
                              >
                                <li><i class="bi bi-trash"></i> Delete</li>
                              </Link>
                              <Link to={`/users/view/${meeting.id}`}>
                                <li><i class="bi bi-eye"></i> View</li>
                              </Link>
                            </ul>
                        </div>
                        </div>
                      </td>
                    </tr>
                    
                    <br />
                   </>

                  ))}
              </tbody>
          </table>
      
    

  )
}

export default Meeting