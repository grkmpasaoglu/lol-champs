import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChampionDetail = () => {
    const { championName } = useParams();
    const [champion, setChampion] = useState(null);
    const [skins, setSkins] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        async function fetchChampionData() {
            const champUrl = "https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/champion.json";
            const skillUrl = `https://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion/${championName}.json`;

            try {
                // Fetch champion data
                const champResponse = await fetch(champUrl);
                if (!champResponse.ok) {
                    throw new Error(`Champion data fetch error: ${champResponse.status}`);
                }
                const champJson = await champResponse.json();
                const champData = champJson.data[championName];

                if (champData) {
                    setChampion({
                        name: champData.id,
                        title: champData.title,
                        image: `https://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${champData.id}.png`,
                        splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champData.id}_0.jpg`,
                        blurb: champData.blurb,
                        info: champData.info,
                        tag: champData.tags,
                    });

                    // Get skins
                    const skinResponse = await fetch(skillUrl);
                    if (!skinResponse.ok) {
                        throw new Error(`Skin data fetch error: ${skinResponse.status}`);
                    }
                    const skinJson = await skinResponse.json();
                    const skinData = skinJson.data[championName];

                    if (skinData && skinData.skins) {
                        setSkins(skinData.skins);
                    } else {
                        console.error('No skins found');
                    }

                    // Extract skills
                    const skillData = Object.values(skinData.spells || {});
                    setSkills(skillData);
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
            <div className="bg-white bg-opacity-50 p-6 rounded-lg mx-4 md:mx-8 mt-8">
                <div className="flex flex-col md:flex-row items-start">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                        <img
                            alt={champion.name}
                            className="w-48 h-48 object-cover border-4 border-gray-300 rounded-full"
                            src={champion.image}
                        />
                    </div>

                    <div className="flex-1">
                        <h1 className="text-5xl font-extrabold italic text-yellow-400">{champion.name}</h1>
                        <h2 className="text-2xl font-semibold text-gray-800 mt-2">{champion.title}</h2>
                        <p className="text-lg font-medium mt-2"><strong>Class:</strong> {champion.tag.join(', ')}</p>
                        <p className="text-lg mt-2">{champion.blurb}</p>
                        <div className="mt-4 flex gap-x-3">
                            <p className="font-medium"><strong>Attack:</strong> {champion.info.attack}</p>
                            <p className="font-medium"><strong>Defense:</strong> {champion.info.defense}</p>
                            <p className="font-medium"><strong>Magic:</strong> {champion.info.magic}</p>
                            <p className="font-medium"><strong>Difficulty:</strong> {champion.info.difficulty}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white bg-opacity-50 p-4 rounded-lg mx-4 md:mx-8 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Skins</h2>
                <div className="flex overflow-x-auto space-x-4 pb-4">
                    {skins.map(skin => (
                        <div key={skin.id} className="relative w-48 h-72 bg-white shadow-lg rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                alt={skin.name}
                                className="w-full h-full object-cover object-top"
                                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championName}_${skin.num}.jpg`}
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-center text-white">
                                <p className="text-lg font-medium">{skin.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white bg-opacity-50 p-4 rounded-lg mx-4 md:mx-8 mt-8">
                <div className="skills">
                    <h2 className="text-2xl font-semibold mb-4">Skills</h2>
                    <div className="flex flex-col gap-4">
                        {skills.map(skill => (
                            <div key={skill.id} className="p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                                <p className="text-gray-600">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChampionDetail;
