import React from 'react';

interface SkeletonLoaderProps {
  rows: number;
  cols: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ rows, cols }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <div className="animate-pulse bg-slate-200 h-5 w-full rounded-md"></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default SkeletonLoader;