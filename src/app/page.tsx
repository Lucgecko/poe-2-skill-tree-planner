"use client"
import { useEffect, useRef, useState } from 'react';
import LeftSidebar from '../components/left_sidebar/LeftSidebar';
import RightSidebar from '../components/right_sidebar/RightSidebar';
import SkillTree from '../components/skill_tree/SkillTree';
import Tooltip from '../components/Tooltip';

import { useNodes } from "../contexts/NodesContext";
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

export default function Home() {
  const { hoveredNode } = useNodes();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const transformWrapperRef = useRef<ReactZoomPanPinchContentRef>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Hide the message when the close button is clicked
  const closeMessage = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Optionally, display the message only on the first load (can be adjusted)
    const messageVisible = localStorage.getItem("messageVisible");
    if (!messageVisible) {
      setIsVisible(true);
      localStorage.setItem("messageVisible", "true");
    }
  }, []);

  return (
    <div onMouseMove={handleMouseMove} >
      <LeftSidebar wrapperRef={transformWrapperRef}/>
      <RightSidebar />
      <SkillTree wrapperRef={transformWrapperRef} />
      <Tooltip nodeId={hoveredNode} position={mousePosition} />

      {isVisible && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50 hidden"
        >
          <div className="flex justify-between items-center ">
            <span>Also you can click the arrow on right for list of selected passives, filter them and click merge to turn +5 attr , +5 attr into +10 attr</span>
            <button
              onClick={closeMessage}
              className="text-white font-bold ml-4"
            >
              X
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
