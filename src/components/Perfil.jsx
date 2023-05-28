import {
    RiInstagramLine,
    RiTwitterLine,
    RiTwitchLine,
    RiFacebookLine,
} from "react-icons/ri";

export default function Perfil({ user }) {

    return (

        <>

            <div className="w-80 h-full bg-[#22222A]">

                <section className="hidden lg:block h-full col-span-2 py-5">

                    {/* Image */}
                    <div className="flex flex-col items-center justify-center gap-2 text-center my-10">

                        <img
                            src="https://www.4x4.ec/overlandecuador/wp-content/uploads/2017/06/default-user-icon-8.jpg"
                            className="w-20 h-20 object-cover rounded-full"
                        />

                        <div>
                            <h2 className="text-gray-300 text-xl">{user.email}</h2>
                            <p className="text-gray-500">#{user.id}</p>
                        </div>

                    </div>

                    {/* Attachments */}
                    <div className="p-8">

                        {/* Social media */}
                        <a
                            href="#"
                            className="flex items-center gap-4 mb-4 p-4 rounded-lg hover:bg-[#292A30] transition-colors"
                        >
                            {/* Icon */}
                            <div className="bg-[#1E1F24] p-4 text-xl rounded-lg text-purple-600">
                                <RiInstagramLine />
                            </div>
                            <div>
                                <span className="text-gray-300 font-semibold">instagram</span>
                                <p className="text-gray-500">150,000 followers</p>
                            </div>
                        </a>

                        {/* Social media */}
                        <a
                            href="#"
                            className="flex items-center gap-4 mb-4 p-4 rounded-lg hover:bg-[#292A30] transition-colors"
                        >
                            {/* Icon */}
                            <div className="bg-[#1E1F24] p-4 text-xl rounded-lg text-purple-600">
                                <RiTwitterLine />
                            </div>
                            <div>
                                <span className="text-gray-300 font-semibold">twitter</span>
                                <p className="text-gray-500">150,000 followers</p>
                            </div>
                        </a>

                        {/* Social media */}
                        <a
                            href="#"
                            className="flex items-center gap-4 mb-4 p-4 rounded-lg hover:bg-[#292A30] transition-colors"
                        >
                            {/* Icon */}
                            <div className="bg-[#1E1F24] p-4 text-xl rounded-lg text-purple-600">
                                <RiTwitchLine />
                            </div>
                            <div>
                                <span className="text-gray-300 font-semibold">twitch</span>
                                <p className="text-gray-500">150,000 followers</p>
                            </div>
                        </a>

                        {/* Social media */}
                        <a
                            href="#"
                            className="flex items-center gap-4 mb-4 p-4 rounded-lg hover:bg-[#292A30] transition-colors"
                        >
                            {/* Icon */}
                            <div className="bg-[#1E1F24] p-4 text-xl rounded-lg text-purple-600">
                                <RiFacebookLine />
                            </div>
                            <div>
                                <span className="text-gray-300 font-semibold">facebook</span>
                                <p className="text-gray-500">150,000 followers</p>
                            </div>

                        </a>
                        
                    </div>

                </section>

            </div>

        </>

    )

}
