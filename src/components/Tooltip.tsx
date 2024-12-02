import { useNodes } from "../contexts/NodesContext";
import React from 'react';

interface TooltipProps {

  nodeId: string;
  position: { x: number; y: number }; // The position of the mouse
}

const Tooltip: React.FC<TooltipProps> = ({ nodeId, position }) => {
  const { allNodes } = useNodes(); // Access allNodes from context
  const node = allNodes.get(nodeId);

  if (!node) return null;

  return (
    <div className="select-none"
    style={{
        position: 'absolute',
        left: position.x + 10, // Offset from mouse position to avoid overlap
        top: position.y + 10,  // Offset from mouse position
        backgroundColor: 'rgba(0, 0, 0, 1)',
        color: 'white',
        padding: '8px',
        borderRadius: '5px',
        fontSize: '1em',
        maxWidth: '500px',
        overflow: 'hidden',
        zIndex: 1000, // Make sure it's on top of other elements
        pointerEvents: 'none', // Prevent tooltip from blocking mouse events
      }}
    >
    <div>
          <strong>{node.name}</strong>
          <ul>
            {node.stats.map((stat, index) => (
              <li key={index}>{stat}</li>
            ))}
          </ul>
        </div>
    </div>
  );
};

export default Tooltip;
