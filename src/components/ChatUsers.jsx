import { useState, useEffect } from 'react'
import { getAllPrivateChats } from '../services/private-chat';

import {
    RiSearchLine,
} from "react-icons/ri";

import SearchBar from './SearchBar';

export default function ChatUsers({ setChatUser }) {

    const [chats, setChats] = useState([])
    const [results, setResults] = useState([])

    useEffect(() => {

        let unsubscribe = () => { };

        const fetchData = async () => {

            unsubscribe = await getAllPrivateChats((chatss) => {

                setChats(chatss);
                setResults(chatss);
                console.log('chatss', chatss);

            });

        }

        fetchData();

        return () => { unsubscribe() };

    }, [])

    return (

        <>

            <div className="w-80 h-full bg-[#22222A]">

                <section
                    className={`col-span-2 bg-[#22222A] p-8 overflow-y-scroll fixed w-[80%] md:w-[50%] lg:w-full h-full top-0 transition-all z-50 lg:static`}
                >

                    {/* Title and Search */}
                    <div className="mb-8">

                        <h2 className="text-white text-3xl mb-4">Chats</h2>

                        <form className="hidden md:block">

                            <div className="relative">

                                <SearchBar
                                    data={chats}
                                    setResults={setResults}
                                    propertyName={'email'}
                                />

                                <RiSearchLine className="absolute right-2 top-3 text-gray-300" />

                            </div>


                        </form>

                    </div>

                    {/* Users */}
                    <div>

                        {/* User */}

                        {
                            results.map((chat) => (

                                <button
                                    key={chat.id}
                                    onClick={() => setChatUser(chat)}
                                    href="#" className="flex w-full gap-2 mb-8"
                                >

                                    {/* Image */}
                                    <div className="w-[15%] relative flex items-center justify-center">
                                        <img
                                            src="https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg"
                                            className="w-8 h-8 object-cover rounded-full"
                                        />
                                    </div>

                                    {/* Name and Hour */}
                                    <div className="w-[85%] flex justify-between">
                                        <div>
                                            <h3 className="text-gray-300 font-semibold">{chat.email}</h3>
                                        </div>
                                    </div>

                                </button>

                            ))
                        }


                    </div>

                </section>

            </div>

        </>

    )

}
