import { useNodes } from '../../hooks/useNodes';
import SkillTree from '../../components/SkillTree';
import Tooltip from '../../components/Tooltip';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';

export default function Home() {
  const {
    allNodes,
    selectedNodes,
    searchQuery,
    hideSmallPassives,
    hideNoStatPassives,
    setSearchQuery,
    setHideSmallPassives,
    setHideNoStatPassives,
    toggleNodeActivation,
    resetNodes,
    highlightedNodes,
  } = useNodes();

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <LeftSidebar
        activeNodes={selectedNodes}
        onReset={resetNodes}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        hideSmallPassives={hideSmallPassives}
        onHideSmallChange={setHideSmallPassives}
        hideNoStatPassives={hideNoStatPassives}
        onHideNoStatChange={setHideNoStatPassives}
      />

      <div onMouseMove={handleMouseMove} style={{ flex: 1, position: 'relative' }}>
        <SkillTree nodes={allNodes} onNodeActivate={toggleNodeActivation} hiddenSmalls={hideSmallPassives} hiddenNoID={hideNoStatPassives} />
        {hoveredNode && <Tooltip node={hoveredNode} position={mousePosition} />}
      </div>
    </div>
  );
}
