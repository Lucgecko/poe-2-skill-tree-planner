import React from 'react';

const Searchbar: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ value, onChange }) => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-2 rounded bg-opacity-50  z-10">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search nodes..."
        className="border-2 border-gray-300 rounded p-2 w-48"
      />
    </div>
  );
};

export default Searchbar;
