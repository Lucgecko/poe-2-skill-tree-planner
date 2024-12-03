import React, { useState } from 'react';
import { NodeData } from '../../types';

interface StatListProps {
  filteredNodeData : NodeData[]
}

const StatList: React.FC<StatListProps> = ({filteredNodeData}) => { 
  const ascendancyStats = filteredNodeData.filter((node) => node.ascendancy);

  const keystoneStats = filteredNodeData.filter((node) => node.type === 'keystone' );
  const notableStats = filteredNodeData
    .filter((node) => node.type === 'notable' && !node.ascendancy)
    .sort((a, b) => {
      const nameA = a.name ?? '';  
      const nameB = b.name ?? '';
      return nameA.localeCompare(nameB);
    });
  const smallStats = filteredNodeData.filter((node) => node.type === 'small' && !node.ascendancy);


  return (
    <div>
        { (ascendancyStats.length > 0) &&
        <div className="mb-5">
        <h3 className="p-0 text-2xl font-bold mb-2 mt-4">Ascendancies</h3>
        {ascendancyStats.map((node) => (
          <div key={node.id} className="mb-4">
            <strong className="text-lg text-purple-400">{node.name}</strong>
            <ul>
              {node.stats.map((stat, index) => (
                <li key={index}>{stat}</li>
              ))}
            </ul>
          </div>
        ))}
        <hr />
      </div>
      }

      {(keystoneStats.length > 0) &&
      <div className="mb-5">
        <h3 className="p-0 text-2xl font-bold mb-2 mt-4">Keystones</h3>
        {keystoneStats.map((node) => (
          <div key={node.id} className="mb-4">
            <strong className="text-lg text-green-400">{node.name}</strong>
            <ul>
              {node.stats.map((stat, index) => (
                <li key={index}>{stat}</li>
              ))}
            </ul>
          </div>
        ))}
        <hr />
      </div>
      }

        { (notableStats.length > 0) &&
      <div className="mb-5">
        <h3 className="p-0 text-2xl font-bold mb-2 mt-5">Notables</h3>
        {notableStats.map((node) => (
          <div key={node.id} className="mb-4">
            <strong className="text-lg text-yellow-400">{node.name}</strong>
            <ul>
              {node.stats.map((stat, index) => (
                <li key={index}>{stat}</li>
              ))}
            </ul>
          </div>
        ))}
        <hr />
      </div>
}
  { (smallStats.length > 0) &&
      <div>
        <h3 className="p-0 text-2xl font-bold mb-2 mt-5">Smalls</h3>
        {smallStats.map((node) => (
          <div key={node.id} className="mb-3">
            <strong className="text-base">{node.name}</strong>
            <ul>
              {node.stats.map((stat, index) => (
                <li key={index} className="text-base">
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default StatList;
