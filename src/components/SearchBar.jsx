import { useState } from 'react';

export default function SearchBar({ data, setResults, propertyName = 'nombre' }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();

        setSearchTerm(term);

        const results = term
            ? data.filter((item) => {

                return item[propertyName].toLowerCase().includes(term);
            })
            : data;

        setResults(results);
    };

    return (
        <input
            value={searchTerm}
            onChange={handleSearch}
            type="text"
            placeholder="Buscar..."
            className="bg-[#1E1F24] py-2 pl-5 pr-28 outline-none w-full rounded-full text-gray-300"
        />
    );
}
