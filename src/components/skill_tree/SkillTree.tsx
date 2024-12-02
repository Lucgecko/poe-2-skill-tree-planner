import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Node from './Node';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface SkillTreeProps {}

const SkillTree: React.FC<SkillTreeProps> = () => {
  const { displayedNodes, allNodes} = useNodes();

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
      }}>

    <TransformWrapper
    initialScale={2}
    minScale={0.8}
    maxScale={10}
    centerOnInit={true}
    doubleClick={{disabled: true}}
    panning={{velocityDisabled: true}}
    >
      <TransformComponent>
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

        {Array.from(allNodes.values())
        .filter((node) => {return displayedNodes.has(node.id)})
        .map((node) => (
          <Node key={node.id} node={node}/>
        ))}

      </div>
      </div>

      </TransformComponent>
      </TransformWrapper>
    </div>

  );
};

export default SkillTree;
