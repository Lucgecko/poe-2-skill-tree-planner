import { createContext, useContext, useState } from "react";
import { useNodes } from "./NodesContext";
import { useAllNodes } from "./AllNodesContext";

type AscendancyContextType = {
    ascendancy: string;
    setAscendancy: (ascendancy: string) => void;
    characterClass: string;
    getAscendancies: () => string[];
    getClasses: () => string[];
  };
  
  const AscendancyContext = createContext<AscendancyContextType | undefined>(undefined);

  // Ascendancy to Class Mapping
  const ASCENDANCY_TO_CLASS: Record<string, string> = {
    GemlingLegionnaire: 'Mercenary',
    WitchHunter: 'Mercenary',
    AcolyteOfChayula: 'Monk',
    Invoker: 'Monk',
    Deadeye: 'Ranger',
    Pathfinder: 'Ranger',
    Chronomancer: 'Sorceress',
    Stormweaver: 'Sorceress',
    Titan: 'Warrior',
    Warbringer: 'Warrior',
    BloodMage: 'Witch',
    Infernalist: 'Witch'
  };
  
  export const AscendancyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {setSelectedNodes, selectedNodes} = useNodes();
    const {allNodes} = useAllNodes();

    const [ascendancy, setAscendancyState] = useState<string>("GemlingLegionnaire");
    const [characterClass, setCharacterClass] = useState<string>("mercenary");
  
    const setAscendancy = (newAscendancy: string) => {
        if(newAscendancy == ascendancy) return;


        const newClass = ASCENDANCY_TO_CLASS[newAscendancy].toLowerCase();
        const newSelectedNodes = Array.from(selectedNodes).filter((nodeId) => {
          return (nodeId.at(0) != "A");
        }).map((nodeId) => {
          const baseId = nodeId.split('-')[0];
          if(allNodes.has(`${baseId}-${newClass}`)) {
            return `${baseId}-${newClass}`;
          }

          return baseId;
        });
        setSelectedNodes(new Set(newSelectedNodes));

        setAscendancyState(newAscendancy);
        setCharacterClass(newClass);

    };


    const getAscendancies = () => Object.keys(ASCENDANCY_TO_CLASS);

    const getClasses = () => Array.from(new Set(Object.values(ASCENDANCY_TO_CLASS)));
  
    return (
      <AscendancyContext.Provider value={{ ascendancy, setAscendancy, characterClass ,getAscendancies, getClasses }}>
        {children}
      </AscendancyContext.Provider>
    );
  };
  

  export const useAscendancy = () => {
    const context = useContext(AscendancyContext);
    if (!context) {
      throw new Error('useAscendancy must be used within an AscendancyProvider');
    }
    return context;
  };