// components/NewsSkeleton.js
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsSkeleton = ({ count = 9 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="row">
      {skeletons.map((_, index) => (
        <div className="col-md-3 col-sm-6 col-12 mb-3" key={index}>
          <div className="card h-100">
            <Skeleton height={180} />
            <div className="card-body">
              <h5 className="card-title">
                <Skeleton count={1} height={20} />
              </h5>
              <p className="card-text">
                <Skeleton count={3} />
              </p>
              <Skeleton width={100} height={30} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;
