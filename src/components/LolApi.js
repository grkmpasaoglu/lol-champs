import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LolApi = () => {
    const [champions, setChampions] = useState([]);
    const [searchChamp, setSearchChamp] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                setError(error.message);
            } finally {
                setLoading(false);
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
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: `url('https://wallpapers.com/images/featured/league-of-legends-background-a1iu7ppvueyfvfdw.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Logo Container */}
            <div className="flex items-center justify-center py-4">
                <img
                    alt="League of Legends Logo"
                    src="https://upload.wikimedia.org/wikipedia/tr/7/77/League_of_Legends_logo.png"
                    className="w-52 h-auto"
                />
            </div>

            {/* Search Input */}
            <div className="py-4 px-6 md:px-28">
                <input
                    className="border border-gray-700 text-lg p-3 w-full rounded-md shadow-lg"
                    type="text"
                    placeholder="Search for a champion"
                    value={searchChamp}
                    onChange={filterChamp}
                />
            </div>

            {/* Loading and Error Handling */}
            {loading && <div className="flex justify-center items-center text-white text-xl py-4">Loading...</div>}
            {error && <div className="flex justify-center items-center text-red-500 text-xl py-4">Error: {error}</div>}

            {/* Champions Display */}
            <div className="flex justify-center items-center text-center flex-wrap gap-4 p-4">
                {filteredChampions.length > 0 ? (
                    filteredChampions.map(champion => (
                        <Link
                            to={`/${champion.name}`}
                            key={champion.name}
                            className="relative card border bg-cover bg-center text-white shadow-lg rounded-lg p-4 w-72 h-72 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
                            style={{
                                backgroundImage: `url(${champion.splash})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center p-4 rounded">
                                <div>
                                    <h3 className="text-xl font-extrabold mb-2">{champion.name}</h3>
                                    <h4 className="text-lg font-medium">{champion.title}</h4>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="flex justify-center items-center text-white text-lg py-4">No champions found</div>
                )}
            </div>
        </div>
    );
};

export default LolApi;
