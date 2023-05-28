import { Routes, Route } from "react-router-dom";

import RoutePrivate from "./auth/RoutePrivate";

import Header from "./components/Header";
import LayoutAdmin from "./components/LayoutAdmin";
import FormVideoGames from "./components/FormVideoGames";

import Login from "./views/Login";
import Store from "./views/Store";
import Chat from "./views/Chat";
import Dashboard from "./views/Dashhboard"


function App() {

    return (
        <>

            <div className="min-h-screen flex flex-col">

                {
                    <RoutePrivate>
                        <Header />
                    </RoutePrivate>
                }

                <main className="h-[90vh] flex p-8 pt-0 justify-center items-center gap-2">

                    <Routes>

                        <Route
                            path="/"
                            exact={true}
                            element={
                                <Login />
                            }
                        />
                        
                        <Route
                            path="/registrar"
                            exact={true}
                            element={
                                <Login handlerRgister={true}/>
                            }
                        />

                        <Route
                            path="/store"
                            exact={true}
                            element={
                                <RoutePrivate>
                                    <Store />
                                </RoutePrivate>
                            }
                        />
                        <Route
                            path="/perfil"
                            exact={true}
                            element={
                                <RoutePrivate>
                                    <Chat />
                                </RoutePrivate>
                            }
                        />
                        <Route path="/dashboard" element={

                            <RoutePrivate admin={true}>

                                <LayoutAdmin />

                            </RoutePrivate>
                        }>
                            <Route index element={<Dashboard />} />
                            <Route path="crear" element={<FormVideoGames />} />
                            <Route path=":id/editar" element={<FormVideoGames formAction={"edit"} />} />
                            <Route path=":id/eliminar" element={<FormVideoGames formAction={"delete"} />} />
                        </Route>

                    </Routes>

                </main>

            </div>

        </>
    );
}

export default App;
