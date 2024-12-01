import { NodeData } from '../types';

export async function loadNodes(): Promise<Map<string, NodeData>> {
  const [nodesResponse, nodesDescResponse] = await Promise.all([
    fetch('/nodes.json'),
    fetch('/nodes_desc.json'),
  ]);

  const nodesData = await nodesResponse.json();
  const nodesDescData = await nodesDescResponse.json();

  const combinedNodes = new Map<string, NodeData>();

  // Add keystone nodes
  nodesData.keystones.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: 'keystone',
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
    });
  });

  // Add notable nodes
  nodesData.notables.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: 'notable',
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
    });
  });

  // Add small nodes (if any)
  nodesData.smalls.forEach((node: any) => {
    combinedNodes.set(node.id, {
      ...node,
      type: 'small',
      name: nodesDescData[node.id]?.name || null,
      stats: nodesDescData[node.id]?.stats || [],
    });
  });

  console.log(combinedNodes.size);
  return combinedNodes;
}
