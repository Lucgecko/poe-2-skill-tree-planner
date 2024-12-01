import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Node from './Node';
import Stats from './Stats';
import { NodeData } from '../types';

interface SkillTreeProps {
  nodes: Map<string, NodeData>; // Map of nodes instead of an array
  onNodeActivate: (id: string) => void;
  onNodeHover: (id: string | null) => void;
  hiddenSmalls: boolean;
  hiddenNoID: boolean;
}

const SkillTree: React.FC<SkillTreeProps> = ({ nodes, onNodeActivate, onNodeHover, hiddenSmalls, hiddenNoID }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  const imageWidth = 2750;
  const imageHeight = 2864;

  const scale = Math.min(windowWidth / imageWidth, (windowHeight - 100) / imageHeight);

  const scaledWidth = imageWidth * scale;
  const scaledHeight = imageHeight * scale;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <img
          src="/skill-tree.png"
          alt="Skill Tree Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        {Array.from(nodes.values())
        .filter(
          (node) =>
            !(hiddenSmalls && node.type === 'small') && // Hide small nodes if hiddenSmalls is true
            !(hiddenNoID && node.stats.length === 0) // Hide nodes with no stats if hiddenNoID is true
        )
        .map((node) => (
        
          <Node key={node.id} node={node} onActivate={onNodeActivate} onHover={onNodeHover}/>
        
        
        ))}

      </div>
    </div>
  );
};

export default SkillTree;
