import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChampionDetail = () => {
    const { championName } = useParams();
    const [champion, setChampion] = useState(null);

    useEffect(() => {
        async function fetchChampionData() {
            const url = "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json";
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                const champData = json.data[championName];

                if (champData) {
                    setChampion({
                        name: champData.id,
                        title: champData.title,
                        image: `https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champData.id}.png`,
                        splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champData.name}_0.jpg`,
                        blurb: champData.blurb,
                        info: champData.info,
                        tag: champData.tags
                    });
                } else {
                    console.error('Champion not found');
                }
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchChampionData();
    }, [championName]);

    if (!champion) {
        return <div>Loading...</div>;
    }

    return (

        <div
            className="min-h-screen flex flex-col p-4"
            style={{
                backgroundImage: `url(${champion.splash})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="bg-white bg-opacity-50 p-4 rounded-lg max-w-4xl w-full mx-4 md:mx-8">
                <div className="flex flex-col md:flex-row items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                        <img
                            alt={champion.name}
                            className="w-48 h-48 object-cover"
                            src={champion.image}
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold">{champion.name}</h1>
                        <h2 className="text-xl font-semibold text-gray-700">{champion.title}</h2>
                        <p><strong>Class:</strong> {champion.tag.join(', ')}</p>
                        <p className="mt-2">{champion.blurb}</p>
                        <div className="mt-4 flex gap-x-3">
                            <p><strong>Attack:</strong> {champion.info.attack}</p>
                            <p><strong>Defense:</strong> {champion.info.defense}</p>
                            <p><strong>Magic:</strong> {champion.info.magic}</p>
                            <p><strong>Difficulty:</strong> {champion.info.difficulty}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChampionDetail;
