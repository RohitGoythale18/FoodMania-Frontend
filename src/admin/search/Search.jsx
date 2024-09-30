import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex justify-between items-center border rounded-md md:w-64 mx-4 px-2">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search recipe..."
        className="outline-none w-full py-2 md:w-64"
      />
      <SearchIcon sx={{fontSize: 30}} />
    </div>
  );
};

export default Search;