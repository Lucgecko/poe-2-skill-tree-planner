import { NodeData } from '../types';

export async function loadNodes(): Promise<Map<string, NodeData>> {
  const [nodesResponse, nodesDescResponse] = await Promise.all([
    fetch('/nodes.json'),
    fetch('/nodes_desc.json'),
  ]);

  const nodesData = await nodesResponse.json();
  const nodesDescData = await nodesDescResponse.json();

  const combinedNodes = new Map<string, NodeData>();

  nodesData.ascendancies.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: node.kind=="small" ? "small" : "notable",
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
      ascendancy: true
    });
  });

  // Add keystone nodes
  nodesData.keystones.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: 'keystone',
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
      ascendancy: false
    });
  });

  // Add notable nodes
  nodesData.notables.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: 'notable',
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
      ascendancy: false
    });
  });

  // Add small nodes (if any)
  nodesData.smalls.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: 'small',
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
      ascendancy: false
    });
  });




  
  return combinedNodes;
}
