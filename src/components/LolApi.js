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
                    id: json.data[key].id,
                    splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${json.data[key].id}_0.jpg` // Splash URL ekleniyor
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
        <div
            style={{
                backgroundImage: `url('https://wallpapers.com/images/featured/league-of-legends-background-a1iu7ppvueyfvfdw.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh'
            }}
        >
            {/* Logo Container */}
            <div className="flex items-center justify-center py-4">
                <img
                    alt="League of Legends Logo"
                    src="https://upload.wikimedia.org/wikipedia/tr/7/77/League_of_Legends_logo.png"
                    className="w-52 h-auto" // Resim boyutunu ayarlayın
                />
            </div>

            {/* Search Input */}
            <div className="py-4 px-28">
                <input
                    className="border border-gray-700 text-lg p-2 w-full rounded-md"
                    type="text"
                    placeholder="Search a champion"
                    value={searchChamp}
                    onChange={filterChamp}
                />
            </div>

            {/* Champions Display */}
            <div className="flex justify-center items-center text-center flex-wrap gap-4 p-4">
                {filteredChampions.map(champion => (
                    <Link
                        to={`/${champion.name}`}
                        key={champion.name}
                        className="card border bg-cover bg-center text-white shadow-lg rounded-lg p-4 w-72 h-48 flex flex-col items-center justify-center"
                        style={{
                            backgroundImage: `url(${champion.splash})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="bg-black bg-opacity-50 p-2 mt-auto rounded">
                            <h3 className="text-md font-semibold">{champion.name}</h3>
                            <h3 className="text-md font-semibold">{champion.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default LolApi;
