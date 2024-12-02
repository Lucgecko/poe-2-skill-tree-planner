import React, { LegacyRef, Ref, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Node from './Node';
import { NodeData } from '../../types';
import { useNodes } from '@/contexts/NodesContext';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

interface SkillTreeProps {
  wrapperRef: Ref<ReactZoomPanPinchContentRef> | null;
}

const SkillTree: React.FC<SkillTreeProps> = ({wrapperRef}) => {
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


  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleMouseDown = () => setIsGrabbing(true);
  const handleMouseUp = () => setIsGrabbing(false);

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
    ref={wrapperRef}
    initialScale={2}
    minScale={0.8}
    maxScale={10}
    centerOnInit={true}
    doubleClick={{disabled: true}}
    panning={{velocityDisabled: true}}
    smooth={true}
    wheel={{step:0.3, smoothStep: 0.005}}
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

      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Reset on mouse leave
      className={`${
        isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
      }`}
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
