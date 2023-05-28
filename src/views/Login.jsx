import { useState } from "react";
import { login, register } from "../services/auth.js";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ handlerRgister = false }) {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fields: {
            email: "",
            password: "",
        },
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        if (handlerRgister) {

            register({
                email: form.fields.email,
                password: form.fields.password,
            })
                .then((response) => {
                    if (response) navigate("/store");
                })


        } else {

            login({
                email: form.fields.email,
                password: form.fields.password,
            })
                .then((response) => {
                    if (response) navigate("/store");
                })

        }
    }

    return (

        <div className="w-11/12 max-w-[700px] h-[600px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">

            <form
                action="#"
                method="POST"
                onSubmit={handleSubmit}
            >

                <h1 className="text-5xl font-semibold">Bienvenido</h1>

                <p className="font-medium text-lg text-gray-500 mt-4">{handlerRgister ? 'Registrarse' : 'Iniciar Sesión'}</p>

                <div className="mt-8">

                    <div className="flex flex-col">

                        <label className="text-lg font-medium">Email</label>

                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Ingrese su email"
                            value={form.fields.email}
                            onChange={(e) => setForm({ fields: { ...form.fields, email: e.target.value } })}
                        />

                    </div>

                    <div className="flex flex-col mt-4">

                        <label className="text-lg font-medium">Contraseña</label>

                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Ingrese su contraseña"
                            type="password"
                            value={form.fields.password}
                            onChange={(e) => setForm({ fields: { ...form.fields, password: e.target.value } })} q
                        />

                    </div>

                    {!handlerRgister ? <Link to={'/registrar'}>¿No tienen una cuenta?</Link> : <Link to={'/'}>¿Ya tienes una cuenta?</Link>}

                    <div className="mt-8 flex flex-col gap-y-4">

                        <button
                            type="submit"
                            className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-[#E58D27] rounded-xl text-white font-bold text-lg">{handlerRgister ? 'Registrarse' : 'Iniciar Sesión'}</button>

                    </div>

                </div>

            </form>

        </div>


    );
}
