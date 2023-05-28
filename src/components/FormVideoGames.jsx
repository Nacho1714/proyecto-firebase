import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGame, getGamesById, editGameById, deleteGameById } from "../services/videoGames";

export default function FormVideoGames({ formAction = "create" }) {

    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        titulo: "",
        categoria: "",
        precio: "",
        imagen: ""
    })

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formAction === "create") await createGame(form)
        if (formAction === "edit") await editGameById(id, form)
        if (formAction === "delete") await deleteGameById(id)

        setForm({
            titulo: "",
            categoria: "",
            precio: "",
            imagen: ""
        })

        navigate('/dashboard')
    }

    useEffect(() => {

        if (formAction !== 'create') {

            getGamesById(id)
                .then((data) => {setForm(data)})
        }

    }, [id])


    return (

        <>

            <div className="bg-secondary-100 p-5 rounded-xl mb-8 flex-1 text-white">

                <h2 className="text-xl text-gray-100">Agregar Videojuego</h2>
                <hr className="my-8 border-gray-500/30" />

                <form
                    action="#"
                    method="POST"
                    onSubmit={handleSubmit}
                >

                    <div className="flex flex-col gap-y-2 md:flex-row md:items-center mb-8">

                        <div className="w-full md:w-1/4">
                            <p>
                                Título <span className="text-red-500">*</span>
                            </p>
                        </div>

                        <div className="flex-1 flex items-center gap-4">

                            <div className="w-full">

                                <label htmlFor="titulo" className="sr-only">Nombre</label>
                                <input
                                    id="titulo"
                                    name="titulo"
                                    type="text"
                                    className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                    placeholder="Título del videojuego"
                                    required
                                    value={form.titulo}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            titulo: e.target.value
                                        })
                                    }}
                                    disabled={formAction === "delete"}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">

                        <div className="w-full md:w-1/4">
                            <p>
                                Categoría <span className="text-red-500">*</span>
                            </p>
                        </div>

                        <div className="flex-1">

                            <label htmlFor="categoria" className="sr-only"></label>
                            <input
                                id="categoria"
                                name="categoria"
                                type="text"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                placeholder="Categoría del videojuego"
                                required
                                value={form.categoria}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        categoria: e.target.value
                                    })
                                }}
                                disabled={formAction === "delete"}
                            />

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">

                        <div className="w-full md:w-1/4">
                            <p>
                                Precio <span className="text-red-500">*</span>
                            </p>
                        </div>

                        <div className="flex-1">

                            <label htmlFor="precio" className="sr-only">Precio</label>
                            <input
                                id="precio"
                                name="precio"
                                type="number"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                placeholder="Precio del videojuego"
                                required
                                value={form.precio}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        precio: e.target.value
                                    })
                                }}
                                disabled={formAction === "delete"}
                            />

                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">

                        <div className="w-full md:w-1/4">
                            <p>
                                URL de la imagen <span className="text-red-500">*</span>
                            </p>
                        </div>

                        <div className="flex-1">

                            <label htmlFor="imagen" className="sr-only">Imagen</label>
                            <input
                                id="imagen"
                                name="imagen"
                                type="text"
                                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                                placeholder="Imagen del videojuego"
                                required
                                value={form.imagen}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        imagen: e.target.value
                                    })
                                }}
                                disabled={formAction === "delete"}
                            />

                        </div>

                    </div>

                    <hr className="my-8 border-gray-500/30" />

                    <div className="flex justify-end">
                        

                        <button type="submit" className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                            {formAction !== "delete" ? "Guardar" : "Eliminar"}
                        </button>

                    </div>

                </form>

            </div>

        </>

    )
}
