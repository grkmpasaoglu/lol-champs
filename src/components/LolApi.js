import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LolApi = () => {
    const [champions, setChampions] = useState([]);
    const [searchChamp, setSearchChamp] = useState('');

    useEffect(() => {
        async function getData() {
            const url = "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                const champs = Object.keys(json.data).map(key => ({
                    name: key,
                    title: json.data[key].title,
                    id: json.data[key].id
                }));
                setChampions(champs);
            } catch (error) {
                console.error(error.message);
            }
        }

        getData();
    }, []);

    const filterChamp = (event) => {
        const searchTerm = event.target.value;
        setSearchChamp(searchTerm);
    };

    const filteredChampions = champions.filter(champion =>
        champion.name.toLowerCase().includes(searchChamp.toLowerCase())
    );

    return (
        <div>
            <div className='py-4 px-28'>
                <input
                    className="border border-gray-700 text-lg p-2 w-full rounded-md"
                    type="text"
                    placeholder="Search a champion"
                    value={searchChamp}
                    onChange={filterChamp}
                />
            </div>

            <div className="flex justify-center items-center text-center flex-wrap gap-4 p-4">
                {filteredChampions.map(champion => (
                    <Link
                        to={`/${champion.name}`}
                        key={champion.name}
                        className="card border bg-white shadow-lg rounded-lg p-4 w-72 h-48 text-center hover:text-gray-400 transform hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center justify-center"
                    >
                        <img
                            alt={champion.name}
                            className="w-24 h-24 mb-2"
                            src={`https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champion.id}.png`}
                        />
                        <h3 className="text-lg font-semibold">{champion.name}</h3>
                        <h3 className="text-lg font-semibold">{champion.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LolApi;
