import React from 'react';
import './NewsItem.css';
import { formatDistanceToNow, parseISO } from 'date-fns';

const NewsItem = ({ title, description, imageurl, newsurl, date }) => {
  const formattedDate = date
    ? new Date(date).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Unknown date';

  const relativeTime = date
    ? `${formatDistanceToNow(parseISO(date), { addSuffix: true })}`
    : 'Publish time unknown';

  return (
    <div className="card h-100 shadow-sm d-flex flex-column">
      {imageurl && (
        <img
              src={imageurl || "/fallback.jpg"}
              onError={(e) => e.target.src = "/fallback.jpg"}
              className="card-img-top"
              alt="news"
        />
      )}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text scrollable-text">{description}</p>
        <a
          href={newsurl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-primary mt-auto"
        >
          Read More
        </a>
        <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
          Published on {formattedDate} (IST)
        </p>
        <div
          style={{
            fontSize: '0.75rem',
            textAlign: 'right',
            marginTop: '4px',
            color: '#6c757d',
          }}
        >
          {relativeTime}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

