"use client"
import "./globals.css";
import { useEffect, useState } from 'react';
import { loadNodes } from '../utils/loadNodes';
import SkillTree from '../components/SkillTree';
import { NodeData } from '../types';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Stats from "../components/Stats";
import SearchBar from '../components/SearchBar';
import Tooltip from "@/components/Tooltip";
import StatList from "../components/Stats";

export default function Home() {
  const [allNodes, setAllNodes] = useState<Map<string, NodeData>>(new Map<string, NodeData>());
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set<string>());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  

  useEffect(() => {
    async function fetchData() {
      const loadedNodes = await loadNodes();
      setAllNodes(loadedNodes);
    }

    fetchData();
  }, []);

  const highlightedNodes = Array.from(allNodes.values()).map((node) => {
    const lowerQuery = searchQuery.toLowerCase();
    
    if (lowerQuery.length > 0 && 
      (node.name?.toLowerCase().includes(lowerQuery) ||
      node.stats.some((stat) => stat.toLowerCase().includes(lowerQuery)))
    ) {
      node.highlighted = true;  // Highlight node if it matches the search query
    } else {
      node.highlighted = false; // Unhighlight node if it doesn't match
    }
    return node;
  });

  const onNodeActivate = (id: string) => {
    const node = allNodes.get(id);
    if (!node) return;
    

    const updatedNode = { ...node, activated: !node.activated };

    if(updatedNode.activated){
      activeNodes.add(id);
    } else {
      activeNodes.delete(id);
    }
  
    setAllNodes((prevNodes) => {
      const updatedNodes = new Map(prevNodes);
      updatedNodes.set(id, updatedNode);
      return updatedNodes;
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const onNodeHover = (id: string | null) => {
    if(!id) {
      setHoveredNode(null);
    } else {
      const node = allNodes.get(id);
      if(node){
        setHoveredNode(node);
        console.log(`hovering ${node}`)
      }
    }
  };
  

  return (


    <div onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
      <TransformWrapper
        initialScale={2}
        minScale={0.8}
        maxScale={10}
        wheel={{ step: 0.1 }}
        centerOnInit={true}
        doubleClick={{disabled: true}}>
        <TransformComponent>
          <SkillTree nodes={allNodes} onNodeActivate={onNodeActivate} onNodeHover={onNodeHover}/>
        </TransformComponent>
      </TransformWrapper>
      
      {hoveredNode && (
      <Tooltip content={
        <div>
          <strong>{hoveredNode.name}</strong>
          <ul>
            {hoveredNode.stats.map((stat, index) => (
              <li key={index}>{stat}</li>
            ))}
          </ul>
        </div>
      } position={mousePosition} />)}

        <div
        style={{
          position: 'absolute',
          top: '10px', // Adjust the position as necessary
          left: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background for visibility
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        {activeNodes.size}/122 passive skills
      </div>

      <button
    onClick={() => {
      setActiveNodes(new Set()); // Clear the active skills
      setAllNodes((prevNodes) => {
        // Reset all nodes to their unactivated state
        const updatedNodes = new Map(prevNodes);
        updatedNodes.forEach((node) => {
          node.activated = false;
          node.highlighted = false; // Optional: unhighlight all nodes
        });
        return updatedNodes;
      });
    }}
    style={{
      backgroundColor: '#ff6666',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
      fontSize: '14px',
      position: 'absolute',
          top: '10px', // Adjust the position as necessary
          left: '240px',
    }}
  >
    Reset
  </button>


      <div
        style={{
          position: 'absolute',
          top: '50px', // Adjust the position as necessary
          left: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional background for visibility
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          width: '200px',
        }}
      >
        <input
          type="text"
          placeholder="Search nodes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>

      <StatList allSkills={allNodes} activeSkills={activeNodes} />

    </div>
  );
}