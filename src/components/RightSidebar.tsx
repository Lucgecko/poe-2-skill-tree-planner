// components/Sidebar.tsx
interface SidebarProps {
    activeNodes: Set<string>;
    onReset: () => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    hideSmallPassives: boolean;
    onHideSmallChange: (value: boolean) => void;
    hideNoStatPassives: boolean;
    onHideNoStatChange: (value: boolean) => void;
  }
  
  export default function RightSidebar({
    activeNodes,
    onReset,
    searchQuery,
    onSearchChange,
    hideSmallPassives,
    onHideSmallChange,
    hideNoStatPassives,
    onHideNoStatChange,
  }: SidebarProps) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div style={{ width: '200px' }}>
          <div>
            <input
              type="text"
              placeholder="Search nodes"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={hideSmallPassives}
                onChange={(e) => onHideSmallChange(e.target.checked)}
              />
              Hide small passives
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={hideNoStatPassives}
                onChange={(e) => onHideNoStatChange(e.target.checked)}
              />
              Hide unidentified passives
            </label>
          </div>
        </div>
        <div>
          <button onClick={onReset}>Reset</button>
          <p>{activeNodes.size}/122 passive skills</p>
        </div>
      </div>
    );
  }
  