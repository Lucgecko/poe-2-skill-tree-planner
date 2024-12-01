export type NodeType = 'keystone' | 'notable' | 'small';

export interface NodeData {
  id: string;
  x: number;
  y: number;
  type: NodeType;
  name: string | null;
  stats: string[];
  activated: boolean;
  highlighted: boolean;
}