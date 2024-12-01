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
        ? "1px solid red" 
        :
        "none",

        backgroundColor: node.stats.length === 0
          ? '#ff6464' 
          : node.highlighted
          ? '#ffffff00'
          : node.type == "keystone"
          ? '#64ff64'
          : node.type == "notable"
          ? '#ffff64'
          : '#ffffff',

        opacity: node.highlighted
        ? '0.9'
        :
        node.activated 
        ? '0.75'
        : '0.35',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
    ></div>
  );
};

export default Node;
