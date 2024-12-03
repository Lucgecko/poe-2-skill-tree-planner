"use client"
import { useEffect, useRef, useState } from 'react';
import LeftSidebar from '../components/left_sidebar/LeftSidebar';
import RightSidebar from '../components/right_sidebar/RightSidebar';
import SkillTree from '../components/skill_tree/SkillTree';
import Tooltip from '../components/Tooltip';

import { useNodes } from "../contexts/NodesContext";
import { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';

export default function Home() {
  
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
    <div onMouseMove={handleMouseMove} className='bg-gray-900'>
      <LeftSidebar wrapperRef={transformWrapperRef}/>
      <RightSidebar />
      <Tooltip position={mousePosition} />
      <SkillTree wrapperRef={transformWrapperRef} />
    
      {isVisible && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-md shadow-lg z-50 hidden"
        >
          <div className="flex justify-between items-center ">
            <span>!!!!! use then button on the right side of screen when you have selected some nodes</span>
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
