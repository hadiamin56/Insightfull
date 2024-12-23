import React, { useState } from "react";

const SearchBar = ({ indexedContent }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const results = indexedContent.filter(item =>
      item.keywords.includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {/* Display search results */}
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            {/* Display search result information */}
            <p>{result.title}</p>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
