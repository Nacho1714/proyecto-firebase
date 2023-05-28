import { useState, useEffect } from "react";
import Card from "../components/Card";

import { getGames } from "../services/videoGames";

export default function Store() {

    const [games, setGames] = useState([])

    useEffect(() => {

        const fetchGames = async () => {

            const data = await getGames();

            console.log(data)

            setGames(data);

        }

        fetchGames();

    }, [])

    return (

        <div className="flex-1 h-full overflow-y-scroll">

            {/* Portada */}

            <div className="rounded-2xl mb-4">
                <img
                    src="https://www.qloud.ar/SITES/IMG/m-y-m-computacion-06-2020/148_31-12-2022-01-12-49-portada---stalker-2-trailer.jpg"
                    className="w-full h-[500px] object-cover object-right md:object-center rounded-2xl"
                />
            </div>

            <div className="flex md:grid md:grid-cols-2 xl:flex items-center justify-around lg:justify-between flex-wrap gap-8">

                {
                    games.map((game) => (

                        <Card
                            key={game.id}
                            img={game.imagen}
                            title={game.titulo}
                            category={game.categoria}
                            price={game.precio}
                        />

                    ))
                }

            </div>

        </div>

    );

}
