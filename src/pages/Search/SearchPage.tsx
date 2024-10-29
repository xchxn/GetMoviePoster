// src/pages/Search/SearchPage.tsx
import React, { useState } from 'react';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>Search and Filter</h1>
      <input
        type="text"
        placeholder="Search content..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {/* Map over filtered content */}
        <p>Showing results for "{searchTerm}"</p>
      </div>
    </div>
  );
};

export default SearchPage;
