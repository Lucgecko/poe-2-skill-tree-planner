import { useNodes } from "@/contexts/NodesContext";
import React, { useEffect, useState } from "react";

interface SavesProps {
}

const Saves: React.FC<SavesProps> = ({}) => {
    const { selectedNodes, setSelectedNodes, savedTrees, setSavedTrees} = useNodes();
  const [currentSave, setCurrentSave] = useState<string>("");
  const [newSaveName, setNewSaveName] = useState<string>("");



  const handleSaveSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSave = event.target.value;
    setCurrentSave(selectedSave);

    const savedSet = savedTrees.get(selectedSave);
    if (savedSet) {
      setSelectedNodes(new Set(savedSet));
    } else {
        setSelectedNodes(new Set());
    }
  };


  const handleAddSave = () => {
    if (newSaveName && !savedTrees.has(newSaveName)) {
        savedTrees.set(newSaveName, new Set(selectedNodes)); 
        setCurrentSave(newSaveName);
        setNewSaveName("");
    }
  };

  const handleUpdateSave = () => {
    if (currentSave && savedTrees.has(currentSave)) {
      const updatedSavedTrees = new Map(savedTrees);
      updatedSavedTrees.set(currentSave, new Set(selectedNodes)); // Update the save with new selected nodes
      setSavedTrees(updatedSavedTrees);
    }
  };
  const handleDeleteSave = () => {
    const updatedSavedTrees = new Map(savedTrees);
    updatedSavedTrees.delete(currentSave);
    setSavedTrees(updatedSavedTrees);
    setCurrentSave("");
  };

  return (
    <div className="mt-2 space-y-4">
      <div>
        {/* Dropdown to select a save */}
        <div>
        <select
            id="saveSelector"
            value={currentSave}
            onChange={handleSaveSelection}
            className="p-2 border rounded-md mb-2 bg-gray-700"
            >
            {/* Render the default option only if no currentSave is selected */}
            <option value="">-- Select a save --</option>
            {Array.from(savedTrees.keys()).map((saveName) => (
                <option key={saveName} value={saveName}>
                {saveName}
                </option>
            ))}
        </select>

        </div>
        <div>
        <div>
        <input
          id="newSaveInput"
          type="text"
          value={newSaveName}
          onChange={(e) => setNewSaveName(e.target.value)}
          className="p-2 border rounded-md bg-gray-700"
          placeholder="Enter save name"
        />
      
        <button
          onClick={handleAddSave}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-2"
        >
          Add Save
        </button>
        </div>
        <div>
        <button
        disabled={!currentSave} 
          onClick={handleUpdateSave}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-2 mt-4"
        >
          Update Current Save
        </button>
        <button
        disabled={!currentSave} 
          onClick={handleDeleteSave}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-2 mt-4"
        >
          Delete Current Save
        </button>
        </div>
      </div>
    
        
      </div>
    </div>
  );
};

export default Saves;