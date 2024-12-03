import React, { LegacyRef, Ref, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Node from './Node';
import { useAllNodes } from '@/contexts/AllNodesContext';

interface NodeListProps {
}

const NodeList: React.FC<NodeListProps> = () => {
    const { allNodes } = useAllNodes();
  
    // Memoize NodeList rendering to avoid unnecessary renders
    const nodeList = useMemo(() => {
      return Array.from(allNodes.values()).map((node) => (
        <Node key={node.id} node={node} />
      ));
    }, [allNodes]);
  
    return <div>{nodeList}</div>;
};

export default React.memo(NodeList);
