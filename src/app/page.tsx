"use client"
import { useState } from 'react';
import LeftSidebar from '../components/left_sidebar/LeftSidebar';
import RightSidebar from '../components/right_sidebar/RightSidebar';
import SkillTree from '../components/skill_tree/SkillTree';
import Tooltip from '../components/Tooltip';

import { useNodes } from "../contexts/NodesContext";

export default function Home() {
  const { hoveredNode } = useNodes();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove} >
      <LeftSidebar/>
      <RightSidebar />
      <SkillTree />
      <Tooltip nodeId={hoveredNode} position={mousePosition} />
      
    </div>
  );
}
