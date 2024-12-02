import React, { useState } from 'react';
import { NodeData } from '../../types';

interface StatListProps {
  filteredNodeData : NodeData[]
}

const MergedStatList: React.FC<StatListProps> = ({filteredNodeData}) => { 
  const stats = filteredNodeData.map((node) => node.stats).flat();


  const statMap: Record<string, number> = {}; // To store summed values for each stat
  
  const statPattern = /([+-]?\d*\.?\d+%?)/g;

  stats.forEach((stat) => {
    // Extract numeric values (and keep the % sign)
    const matches = [...stat.matchAll(statPattern)];

    // Initialize the cumulative value for this stat
    let cumulativeValue = 0;
    let statKey = stat; // This will be used to track the "type" of stat

    // Sum the values for the current stat (e.g., +10, 1.5%, etc.)
    matches.forEach((match) => {
      const value = match[0];
      const isPercentage = value.includes("%");

      const numericValue = isPercentage
        ? parseFloat(value) // Percentage value
        : parseFloat(value); // Regular integer value

      cumulativeValue += numericValue; // Add value to cumulative sum
    });

    // Store the cumulative sum for this stat type in the map
    if (statMap[statKey] === undefined) {
      statMap[statKey] = cumulativeValue;
    } else {
      statMap[statKey] += cumulativeValue;
    }
  });

  // Rebuild the merged stats using the cumulative sums from the map
  const mergedStats = Object.entries(statMap).map(([statType, value]) => {
    return statType.replace(/\d+(\.?\d+)?%?/g, (match) => {
      const num = match.replace(/[^\d.]/g, ''); // Extract numeric part
      return value + (match.includes('%') ? '%' : ''); // Reattach '%' if it was there
    });
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
