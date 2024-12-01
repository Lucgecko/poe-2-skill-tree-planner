import React, { useState } from 'react';
import { NodeData } from '../types';

interface StatListProps {
  activeSkills: Set<string>;  // A Set of active skill IDs
  allSkills: Map<string, NodeData>;  // A Map of all skills
}

const StatList: React.FC<StatListProps> = ({ activeSkills, allSkills }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Get all active nodes by filtering the allSkills map using the activeSkills set
  const activeNodeData = Array.from(activeSkills)
    .map((id) => allSkills.get(id))
    .filter((node) => node !== undefined) as NodeData[];

  const keystoneStats = activeNodeData.filter((node) => node.type === 'keystone');
  const notableStats = activeNodeData
    .filter((node) => node.type === 'notable')
    .sort((a, b) => {
      const nameA = a.name ?? '';  
      const nameB = b.name ?? '';
      return nameA.localeCompare(nameB);
    });
  const smallStats = activeNodeData.filter((node) => node.type === 'small');

  return (
    <div
      style={{
        position: 'absolute',
        right: '10px',
        top: '10px',
        width: '30vw', 
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        borderRadius: '8px',
        padding: '10px',
        paddingTop: "0px",
        maxHeight: '90vh',  // Set the max height for scrollability
        overflowY: 'auto',
      }}
    >
      {/* Collapsible title */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
    
          cursor: 'pointer',
          padding: '10px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          backgroundColor: '#333',
          borderRadius: '2px',
          marginBottom: '10px',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: '0',
          zIndex: 10,  // Ensures it stays above the content
        }}
      >
        Stat List
        {/* Down arrow icon */}
        <span
          style={{
            marginTop: '0px',
            marginLeft: '10px',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▼
        </span>
      </div>

      {/* Only show stats when the list is open */}
      {isOpen && (
        <div>
          {/* Keystone Stats */}
          <div style={{ marginBottom: '20px' }}>
            <h3
              style={{
                padding: '0px', 
                fontSize: '22px', 
                fontWeight: 'bold',
                marginBottom: '10px',
                marginTop: '10px', // Keeps a gap between the title and section
              }}
            >
              Keystones
            </h3>
            {keystoneStats.map((node) => (
              <div key={node.id} style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '18px', color: "#64ff64" }}>{node.name}</strong>
                <ul>
                  {node.stats.map((stat, index) => (
                    <li key={index}>{stat}</li>
                  ))}
                </ul>
              </div>
            ))}
            <hr></hr>
          </div>
          
          {/* Notable Stats */}
          <div style={{ marginBottom: '20px'}}>
            <h3
              style={{
                padding: '0px', 
                fontSize: '22px', 
                fontWeight: 'bold',
                marginTop: '20px',
                marginBottom: '10px'
              }}
            >
              Notables
            </h3>
            {notableStats.map((node) => (
              <div key={node.id} style={{ marginBottom: '15px' }}>
                <strong style={{ fontSize: '18px', color: '#ffcc00' }}>{node.name}</strong>
                <ul>
                  {node.stats.map((stat, index) => (
                    <li key={index}>{stat}</li>
                  ))}
                </ul>
              </div>
            ))}
            <hr></hr>
          </div>

          {/* Small Stats */}
          <div>
            <h3
              style={{
                padding: '0px', 
                fontSize: '22px', 
                fontWeight: 'bold',
                marginBottom: '10px',
                marginTop: '20px',
              }}
            >
              Smalls
            </h3>
            {smallStats.map((node) => (
              <div key={node.id} style={{ marginBottom: '10px' }}>
                <strong style={{ fontSize: '16px' }}>
                  {node.name}
                </strong>
                <ul>
                  {node.stats.map((stat, index) => (
                    <li key={index} style={{ fontSize: '16px' }}>
                      {stat}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatList;
