import React from 'react';


const statusColors = {
  'On Track': 'on-track',
  'Delayed': 'delayed',
  'At Risk': 'at-risk',
  'Completed': 'completed',
};

const ProjectStatus = ({ projects }) => {
  return (
    <div className="project-status-container">
      <h2>Project Status</h2>
      <p className="subtitle">Current project progress</p>
      {projects.map((project, index) => (
        <div key={index} className="project-row">
          <div className="project-header">
            <span className="project-title">{project.name}</span>
            <span className={`status-badge ${statusColors[project.status]}`}>
              {project.status}
            </span>
            <span className="project-percentage">{project.progress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStatus;
