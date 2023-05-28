import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CardTicket from "../components/CardTicket";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { getGames } from "../services/videoGames";

export default function Dashboard() {

    const navigate = useNavigate();

    const [games, setGames] = useState([])

    useEffect(() => {

        const fetchGames = async () => {

            const data = await getGames();

            setGames(data);

        }

        fetchGames();

    }, [])

    return (

        <>

            <div className="flex-1 h-full overflow-y-auto">

                {/* Dashboard */}
                <div>

                    {/* Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        <CardTicket
                            ticket="total"
                            totalTickets={games.length}
                            text="Videojuegos"
                        />

                    </div>

                    <div className="flex items-center justify-between">

                        <h1 className="text-2xl text-white my-10 pl-3">Videojuegos</h1>

                        <button
                            className="h-[50px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-primary/80 hover:bg-primary"
                            onClick={() => navigate("/dashboard/crear")}
                        >
                            Agregar
                        </button>

                    </div>

                    <div className="bg-secondary-100 p-8 rounded-xl text-white">

                        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
                            <h5>#</h5>
                            <h5>Título</h5>
                            <h5>Categoría</h5>
                            <h5>Precio</h5>
                            <h5>Acciones</h5>
                        </div>

                        {
                            games.map((game, index) => (

                                    <div key={game.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">

                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">#</h5>
                                            <span>{index + 1}</span>
                                        </div>

                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Título</h5>
                                            <p>{game.titulo}</p>
                                        </div>

                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Categoría</h5>
                                            <span className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
                                                {game.categoria}
                                            </span>
                                        </div>

                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Precio</h5>
                                            <span>$ {game.precio}</span>
                                        </div>

                                        <div>
                                            <h5 className="md:hidden text-white font-bold mb-2">Acciones</h5>
                                            <Menu
                                                menuButton={
                                                    <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                                                        Acciones
                                                    </MenuButton>
                                                }
                                                align="end"
                                                arrow
                                                arrowClassName="bg-secondary-100"
                                                transition
                                                menuClassName="bg-secondary-100 p-4"
                                            >
                                                <MenuItem className="p-0 hover:bg-transparent">
                                                    <Link
                                                        to={`/dashboard/${game.id}/editar`}
                                                        className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                                                    >
                                                        Editar
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem className="p-0 hover:bg-transparent">
                                                    <Link
                                                        to={`/dashboard/${game.id}/eliminar`}
                                                        className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                                                    >
                                                        Eliminar
                                                    </Link>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </div>

                            ))
                        }

                    </div>
                </div>

            </div>

        </>

    )
}

