import { useState, useEffect, useRef } from "react";
import { sendPrivateMessage, subscribeToPrivateChat } from '../services/private-chat';
import { dateToString } from "../utils/date.js";

import {
    RiSendPlaneLine,
} from "react-icons/ri";

import Perfil from "../components/Perfil";
import ChatUsers from "../components/ChatUsers";

export default function Chat({ user }) {

    const [form, setForm] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatUser, setChatUser] = useState(null);

    const unsubscribeRef = useRef(() => { });

    useEffect(() => {

        let unsubscribe = () => { };
        
        if (user.rol) {

            // Si el usuario es admin, se suscribe a la conversación con el usuario seleccionado
            
            if (!chatUser) return;

            const fetchData = async () => {
                unsubscribe = await subscribeToPrivateChat(chatUser, (messages) => {
                    setMessages(messages);
                });
            };

            fetchData();

            unsubscribeRef.current(); // me desuscribo de la conversación anterior
            unsubscribeRef.current = unsubscribe; // Actualiza la referencia mutable

        } else {

            // Si el usuario es cliente, se suscribe a la conversación con el admin

            const fetchData = async () => {
                unsubscribe = await subscribeToPrivateChat(user, (messages) => {
                    setMessages(messages);
                });
            };

            fetchData();
        }

        return () => {
            unsubscribe(); // Ejecuta la función de cancelación al desmontar el componente
        };

    }, [chatUser, user]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form || !chatUser && user.rol) return;
        
        try {

            setForm("")

            await sendPrivateMessage({

                sender: user.id,
                chatUser: user.rol ? chatUser : user,
                message: form,

            });

        } catch (err) {

            console.error('[PrivateChat] Error al enviar el mensaje: ', err);

        }

    }

    return (

        <>

            <div className="flex-1 h-full">

                <div className="grid h-full">

                    <section className="col-span-4 px-4 relative">

                        {/* Info group */}
                        <div className="absolute left-0 top-0 w-full flex items-center gap-8 p-4 md:p-8 border-gray-800">

                            <div className="flex-1 flex flex-col md:flex-row gap-2 items-center justify-between">

                                <div>
                                    <h1 className="text-xl md:text-3xl text-gray-300">
                                        {user.rol ? `Chat - Atención al público (${chatUser?.email || 'selecciona un cliente'})` :"¿Tienes dudas? ¡Chatea con nosotros!"}
                                    </h1>
                                </div>

                            </div>

                        </div>

                        {/* Send Message */}
                        <div className="absolute bg-[#22222A] left-0 bottom-0 w-full p-3">

                            <form className="relative">

                                <input
                                    type="text"
                                    className="bg-[#1E1F24] py-2 pl-5 pr-28 outline-none w-full rounded-full text-gray-300"
                                    value={form}
                                    onChange={(e) => setForm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    disabled={!chatUser && user.rol}
                                />

                                {/* Icons message */}
                                <div className="absolute right-4 top-3 flex items-center gap-2 text-gray-300">
                                    <RiSendPlaneLine className="hover:cursor-pointer" onClick={handleSubmit} />
                                </div>

                            </form>

                        </div>

                        {/* Content messages */}
                        <div className="mt-32 overflow-y-scroll max-h-[calc(100%-210px)]">

                            {
                                messages.map((message, index) => {

                                    return (message.sender === user.id) ? (

                                        <div key={message.docId} className="flex justify-end gap-4">

                                            <div>

                                                <div className="flex items-center gap-2 mb-2">

                                                    <p className="bg-purple-500 py-2 px-4 rounded-tl-lg rounded-bl-lg rounded-br-lg text-white order-1">
                                                        {message.message}{" "}
                                                        <span className="font-normal text-sm ml-8">
                                                            {dateToString(message.created_at)}
                                                        </span>
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    ) : (

                                        <div key={message.docId} className="flex gap-4">

                                            <div>

                                                <div className="flex items-center gap-2 mb-2">

                                                    <p className="bg-[#292A30] py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-500">
                                                        {message.message}{" "}

                                                        <span className="font-normal text-sm ml-8">
                                                            {dateToString(message.created_at)}
                                                        </span>
                                                    </p>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </section>

                </div>

            </div>

            {
                user.rol === 1 ? (

                    <ChatUsers user={user} setChatUser={setChatUser} />

                ) : (

                    <Perfil user={user} />

                )
            }

        </>

    );

}
