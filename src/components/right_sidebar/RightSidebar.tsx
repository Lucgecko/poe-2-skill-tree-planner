import { useNodes } from "@/contexts/NodesContext";
import StatList from "./StatList";
import { useState } from "react";
import { NodeData } from "@/types";
import MergedStatList from "./MergedStatList";
import { useAllNodes } from "@/contexts/AllNodesContext";

// components/Sidebar.tsx
interface RightSidebarProps { }
  
  export default function RightSidebar({}: RightSidebarProps) {

    const {allNodes} = useAllNodes();
    const { selectedNodes } = useNodes();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMerged, setIsMerged] = useState<boolean>(false);
    const [filterTerm, setFilterTerm] = useState<string>("");

    const filteredNodeData = Array.from(selectedNodes)
    .map((id) => allNodes.get(id))
    .filter((node) => node !== undefined)
    .filter((node) => {
        const statsMatch = node.stats.some((stat) =>
          stat.toLowerCase().includes(filterTerm.toLowerCase())
        );

        const nameMatch = !isMerged && node.name?.toLowerCase().includes(filterTerm.toLowerCase());

        return statsMatch || nameMatch;

    }) as NodeData[];


    return (
      <div className=" absolute right-0 top-2 h-[90vh] w-[40vw]">
        <div className="flex items-center justify-end h-full">
          <div         
          onClick={() => setIsOpen(!isOpen)}    
           className="w-cursor-pointer w-fit p-2 text-center font-bold text-lg bg-blue-500 rounded-l-md mb-2 flex items-center justify-between sticky top-0 z-10 cursor-pointer select-none">
              <span
                className={`ml-2 mr-2 mt-40 mb-40 z-20 `}
                style={{ transformOrigin: 'center left' }}>
                &lt;
              </span>
          </div>

          {isOpen && (
            <div className="flex items-center justify-end h-full">
                <div className="w-[30vw] bg-gray-800  text-white font-sans text-sm rounded-lg p-4 max-h-[90vh] overflow-y-auto z-20 h-[90vh]">
                  <div className="flex items-center">
                    <input
                        type="text"
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                        placeholder="Filter..."
                        className="border-2 border-gray-300 rounded p-2 w-48 mr-2 bg-gray-700"
                      />
                      <label className="z-21">
                      <input
                        type="checkbox"
                        checked={isMerged}
                        onChange={(e) => setIsMerged(e.target.checked)}
                        className="mr-2"
                      />
                      Merge stats
                    </label>


                  </div>

                  {isMerged ? (
                    <MergedStatList filteredNodeData={filteredNodeData} filterTerm={filterTerm}/>
                  ) : (
                    <StatList filteredNodeData={filteredNodeData} />
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  