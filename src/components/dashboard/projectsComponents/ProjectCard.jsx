import React from 'react'
import './ProjectCard.css'

function ProjectCard(key, project) {
  return (
    <div className="card-container" key={key}>
      <div className="card-checkmark">&#10003;</div>
            <div className="card-header">
            <h3>{project?.name}</h3>
            <span className="card-menu">⋮</span>
            </div>

            <div className="card-status-row">
            <span className="status-badge">On Track</span>
            <span className="date">📅 {project?.start_date}</span>
            </div>

            <p className="description">
            {project?.description}
            </p>

            <div className="progress-section">
            <div className="progress-label">
                <span>Progress</span>
                <span className="progress-percentage">75%</span>
            </div>
            <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: '75%' }}></div>
            </div>
            </div>

            <div className="card-footer">
            <div className="team-avatars">
                <img src="https://i.pravatar.cc/30?img=1" alt="user1" />
                <img src="https://i.pravatar.cc/30?img=2" alt="user2" />
                <img src="https://i.pravatar.cc/30?img=3" alt="user3" />
            </div>
            <div className="milestones">Milestones<br /><strong>3 / 4</strong></div>
        </div>

    </div>
  )
}

export default ProjectCard