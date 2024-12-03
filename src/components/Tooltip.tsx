import { useHover } from "@/contexts/HoverContext";
import { useNodes } from "../contexts/NodesContext";
import React from 'react';
import { useAllNodes } from "@/contexts/AllNodesContext";

interface TooltipProps {
  position: { x: number; y: number }; // The position of the mouse
}

const Tooltip: React.FC<TooltipProps> = ({ position }) => {
  const { allNodes } = useAllNodes(); // Access allNodes from context
  const {hoveredNode} = useHover();
  
  const node = allNodes.get(hoveredNode);

  if (!node) return null;

  const tooltipWidth = 500; // Set the maximum width of the tooltip
  const tooltipHeight = 200; // Set the maximum height of the tooltip

  const left = position.x + ( position.x + 500 > window.innerWidth ? -10: 10);
  const top = position.y + ( position.y + 300 > window.innerWidth ? -10: 10);

  const transform_x =  left + 500 > window.innerWidth ? "-100%":"0%";
  const transform_y =  top + 300 > window.innerHeight ? "-100%":"0%";


  return (
    <div className={`select-none absolute bg-black text-white p-2 rounded-lg text-sm max-w-[500px] z-10`}
    style={{
        position: 'absolute',
        left: left, // Offset from mouse position to avoid overlap
        top: top,  // Offset from mouse position
        backgroundColor: 'rgba(0, 0, 0, 1)',
        transform: `translate(${transform_x},${transform_y})`,
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
