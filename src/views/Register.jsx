import { useState } from "react";
import { register } from "../services/auth.js";

export default function Register() {

    const [form, setForm] = useState({
        fields: {
            email: "",
            password: "",
        },
        loading: false,
        feedback: {
            type: "",
            message: "",
        }
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        setForm({ ...form, loading: true});
        setForm({ ...form, feedback: {
            type: "",
            message: "",
        }});

        register({
            email: form.fields.email,
            password: form.fields.password,
        })
            .then(() => {
                setForm({...form, loading: false});
                console.log("Usuario registrado");
            })
            .catch((err) => {
                setForm({...form, loading: false});
                setForm({...form, feedback: {
                    type: "error",
                    message: err.message,
                }});
            });

    }

    return (
        <>
            <h1>Crear Cuenta</h1>

            <form
                action="#"
                method="post"
                onSubmit={handleSubmit}
            >

                <div className="mb-3">

                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="form-control"
                        value={form.fields.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                fields: {
                                    ...form.fields,
                                    email: e.target.value,
                                },
                            })
                        }
                    />

                </div>

                <div className="mb-3">

                    <label htmlFor="password" className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={form.fields.password}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                fields: {
                                    ...form.fields,
                                    password: e.target.value,
                                },
                            })
                        }
                    />

                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Registrarse
                </button>

                {
                    form.feedback.type === "error" && (
                        <p className="text-danger">{form.feedback.message}</p>
                    )
                }

            </form>

        </>
    );
}
