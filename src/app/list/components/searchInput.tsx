import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import './searchInput.scss';

type SearchInputType = {
  searchFn: (str: string) => void;
}

function SearchInput({ searchFn }: SearchInputType): JSX.Element{
  const [searchText, setSearchText] = useState('');

  const debounced = useDebouncedCallback((value) => {
    searchFn(value);
  }, 1000);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    debounced.callback(searchText);
  };

  return (
    <div className="search-input">
      <input type="text" onChange={onChange} value={searchText} placeholder="Search By Artist Name ..." />
    </div>
  );
}

export default SearchInput;
