import React, {FC} from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchInputProps {
    setSearchValue: (e: string) => void,
    searchValue: string
}

const SearchInput:FC<SearchInputProps> = ({setSearchValue, searchValue}) => {
    return (
        <div className={'relative flex-1'}>
            <BsSearch className={'absolute right-2 top-[14px]'} />
            <input className={`w-full rounded-[6px] p-2 border-2 border-gray-300 
                           focus:border-blue-500 outline-none pr-10`}
                type="text"
                placeholder="Search"
                   value={searchValue}
                   onChange={(e) => setSearchValue(e.target.value)}
            />
            
        </div>
    );
};

export default SearchInput;