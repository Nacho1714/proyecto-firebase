import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { logout } from "../services/auth";

import {
    RiMenu2Line,
    RiCloseLine,
} from "react-icons/ri";


const Header = ({ user }) => {

    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const handleLogout = (e) => {

        e.preventDefault();

        logout();
        navigate("/");
    };

    return (

        <header className="h-[7vh] lg:h-[10vh] text-gray-400 py-4 px-10 flex items-center justify-between z-40">

            {/* Movile */}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden text-2xl"
            >
                <RiMenu2Line />
            </button>

            <div
                className={`fixed left-0 bg-[#181A20] w-full h-full z-50 transition-all ${showMenu ? "top-0" : "-top-full"
                    }`}
            >

                <button onClick={() => setShowMenu(!showMenu)} className="text-3xl p-4">
                    <RiCloseLine />
                </button>

                <ul className="mt-20">

                    <li>

                        <NavLink
                            to="/store"
                            className={({ isActive, isPending }) =>
                                isPending ? "hover:text-[#E58D27] transition-colors" : isActive ? "text-[#E58D27] transition-colors" : ""
                            }
                        >
                            Game store
                        </NavLink>

                    </li>

                    {
                        user.rol !== 0 && (

                            <>

                                <li>

                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "hover:text-[#E58D27] transition-colors" : isActive ? "text-[#E58D27] transition-colors" : ""
                                        }
                                    >
                                        Dashboard
                                    </NavLink>

                                </li>

                            </>
                        )
                    }


                </ul>

            </div>

            {/* Menu */}
            <ul className="hidden lg:flex items-center gap-6">

                <li>

                    <button
                        onClick={() => navigate("/store")}
                    >
                        <h1>
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/007/131/902/original/game-shop-with-bag-logo-concept-icon-gaming-or-symbol-logo-free-vector.jpg"
                                className="w-8 h-8 object-cover rounded-full ring-2 ring-[#E58D27]"
                                alt="Logo Game Store"
                            />

                        </h1>
                    </button>

                </li>

                <li>

                    <NavLink
                        to="/store"
                        className={({ isActive, isPending }) =>
                            isPending ? "hover:text-[#E58D27] transition-colors" : isActive ? "text-[#E58D27] transition-colors" : ""
                        }
                    >
                        Game store
                    </NavLink>

                </li>

                {
                    user.rol !== 0 && (

                        <>

                            <li>

                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "hover:text-[#E58D27] transition-colors" : isActive ? "text-[#E58D27] transition-colors" : ""
                                    }
                                >
                                    Dashboard
                                </NavLink>

                            </li>

                        </>
                    )
                }

            </ul>

            {/* User menu */}
            <ul className="flex items-center gap-6 text-xl">


                <li>
                    <button
                        onClick={() => navigate("/perfil")}
                    >
                        <img
                            src="https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg"
                            className="w-8 h-8 object-cover rounded-full ring-2 ring-[#E58D27]"
                            alt="Foto de perfil"
                        />
                    </button>
                </li>
                <li>
                    <form
                        action="#"
                        method="post"
                        onSubmit={handleLogout}
                    >
                        <button>Cerrar Sesión ({user.email})</button>
                    </form>
                </li>

            </ul>

        </header>

    );
};

export default Header;
