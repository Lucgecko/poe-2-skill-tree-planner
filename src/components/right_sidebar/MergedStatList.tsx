import React, { useState } from 'react';
import { NodeData } from '../../types';

interface StatListProps {
  filteredNodeData : NodeData[],
  filterTerm : string
}

const MergedStatList: React.FC<StatListProps> = ({filteredNodeData, filterTerm}) => { 
  const stats = filteredNodeData.map((node) => node.stats).flat().filter((stat) => {
    return stat.toLowerCase().includes(filterTerm.toLowerCase())
    
  });
  
  // am too lazy, mostly chatgpt generated

  const statMap: Record<string, number> = {};
  
  const statPattern =/(?=[+-]?)(\d*\.?\d+)(%?)/g;

  stats.forEach((stat) => {
    const matches = [...stat.matchAll(statPattern)];

    let cumulativeValue = 0;
    let statKey = stat;
    // Initialize the cumulative value for this stat
    if (matches.length > 0) {
      const value = matches[0][1]; // First match
      const numericValue =  parseFloat(value) // Percentage value; // Regular integer value
      cumulativeValue += numericValue; // Add value to cumulative sum
      statKey = stat.replace(value, '*').trim();
    }

    // Store the cumulative sum for this stat type in the map
    if (statMap[statKey] === undefined) {
      statMap[statKey] = cumulativeValue;
    } else {
      statMap[statKey] += cumulativeValue;
    }
  });

  // Rebuild the merged stats using the cumulative sums from the map
  const mergedStats = Object.entries(statMap).map(([statType, value]) => {
    // Replace "*" with the cumulative value
    return statType.replace('*', value.toString());
  });

  return (
    <div>
        <h3 className="p-0 text-4xl font-bold mb-2 mt-4">Merged Stats</h3>
        <ul>
            {mergedStats.map((stat, index) => (
                    <li className='mb-1' key={index}>{stat}</li>
            ))}
        </ul>
    </div>

  );
};

export default MergedStatList;
