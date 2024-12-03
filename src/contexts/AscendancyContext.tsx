import { createContext, useContext, useState } from "react";
import { useNodes } from "./NodesContext";

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
    const [ascendancy, setAscendancyState] = useState<string>("GemlingLegionnaire");
    const [characterClass, setCharacterClass] = useState<string>("mercenary");
  
    const setAscendancy = (newAscendancy: string) => {
        const newClass = ASCENDANCY_TO_CLASS[newAscendancy].toLowerCase();
        setAscendancyState(newAscendancy);
        setCharacterClass(newClass);
        console.log("setting ascend");
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