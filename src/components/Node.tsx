import React from 'react';
import { NodeData } from '../types';

interface NodeProps {
  node: NodeData;
  onActivate: (id: string) => void;
  onHover: (id: string | null) => void;
}

const Node: React.FC<NodeProps> = ({ node, onActivate, onHover }) => {
  const handleClick = () => {
    onActivate(node.id);
  };
  const handleMouseEnter = () => {
    onHover(node.id); // Trigger hover event when mouse enters node
  };

  const handleMouseLeave = () => {
    onHover(null); // Reset hovered node when mouse leaves node
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'absolute',
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        transform: "translate(-50%, -50%)",
        width: (node.type == 'small') ? '3px' : '5px',
        height: (node.type == 'small') ? '3px' : '5px',
        borderRadius: '50%',
        border: node.highlighted 
        ? "1px solid lightblue" 
        :
        "none",
        backgroundColor: node.highlighted
          ? 'rgba(255, 255, 204, 0.8)' // Highlighted node color
          : node.activated
          ? 'rgba(180, 255, 204, 0.7)'
          : node.stats.length == 0
          ? 'rgba(255, 100, 100, 0.5)'
          :
          'rgba(255, 255, 204, 0.3)', // Normal node color
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
    />
  );
};

export default Node;
