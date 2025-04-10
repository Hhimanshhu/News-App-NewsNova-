import React, { Component } from 'react';
import './NewsItem.css';
import { formatDistanceToNow, parseISO } from 'date-fns';

export default class NewsItem extends Component {
  render() {
    const { title, description, imageurl, newsurl, date } = this.props;

    return (
      <div className="card h-100 shadow-sm d-flex flex-column">
        {imageurl && (
          <img
            src={imageurl}
            className="card-img-top"
            alt="news"
            style={{ height: '200px', objectFit: 'cover' }}
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
            Published on{' '}
            {date
              ? `${new Date(date).toLocaleString('en-IN', {
                  timeZone: 'Asia/Kolkata',
                  hour12: true,
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })} (IST)`
              : 'Unknown date'}
          </p>

          <div style={{ fontSize: '0.75rem', textAlign: 'right', marginTop: '4px', color: '#6c757d' }}>
            {this.props.date
              ? `${formatDistanceToNow(parseISO(this.props.date), { addSuffix: true })}`
              : 'Publish time unknown'}
          </div>


        </div>
      </div>
    );
  }
}
