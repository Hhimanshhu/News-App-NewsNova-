import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsSkeleton = ({ count = 9 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="row">
      {skeletons.map((_, index) => (
        <div className="col-md-3 col-sm-6 col-12 mb-3" key={index}>
          <div className="card h-100 shadow-sm">
            <Skeleton height={180} borderRadius={8} />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <Skeleton height={20} />
              </h5>
              <p className="card-text scrollable-text">
                <Skeleton count={3} />
              </p>
              <Skeleton width={100} height={30} borderRadius={4} className="mt-auto" />
              <p className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
                <Skeleton width={120} />
              </p>
              <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                <Skeleton width={90} />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsSkeleton;








// import React from 'react';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

// const NewsSkeleton = ({ count = 9 }) => {
//   const skeletons = Array.from({ length: count });

//   return (
//     <div className="row">
//       {skeletons.map((_, index) => (
//         <div className="col-md-3 col-sm-6 col-12 mb-3" key={index}>
//           <div className="card h-100">
//             <Skeleton height={180} borderRadius={8} />
//             <div className="card-body">
//               <h5 className="card-title">
//                 <Skeleton count={1} height={20} />
//               </h5>
//               <p className="card-text">
//                 <Skeleton count={3} />
//               </p>
//               <Skeleton width={100} height={30} borderRadius={4} />
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NewsSkeleton;
