import React from 'react'
import { Link } from 'react-router-dom';
import { IPaper } from '../../models/IPaper'

const Paper = (paper: IPaper) => {
  return (
    <Link to={`/papers/${paper.paperId}`} className="candidate-list-box card mt-4">
      <div className="card-body">
        <div className="align-items-center row">
          <div className="col-auto">
            <div className="candidate-list-images">
              <img src={paper.icon} alt={paper.name} className="avatar-md img-thumbnail" />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="candidate-list-content mt-3 mt-lg-2">
              <h5 className="fs-19 mb-0">
                <p className="primary-link  mb-1">{paper.name}</p>
                <span className="badge bg-info"><i className="bi bi-database"></i> {paper.formattedSize}</span>
              </h5>
              <p className="text-muted mb-2">Owner:  {paper.ownerName}</p>
              <ul className="list-inline mb-0 text-muted">
                <li className="list-inline-item"><i className="mdi mdi-map-marker"></i> Created: {new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(paper.createdAt))}</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
              <span className="badge bg-soft-secondary fs-14 mt-1">Type: {paper.extension.toUpperCase()}</span>
              <span className="badge bg-soft-secondary fs-14 mt-1">Raw Size: {paper.size} Bytes</span>
            </div>
          </div>
        </div>
        <div className="favorite-icon">
          <i className="bi bi-eye"></i>
        </div>
      </div>
    </Link>
  );
};

export default Paper;
