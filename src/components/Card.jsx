const Card = (props) => {

    const { img, title, category, price } = props;

    return (

        <div className="bg-[#362C29]/50 p-6 rounded-2xl flex flex-col gap-2 w-full md:w-auto">

            <img
                src={img}
                className="w-full xl:w-52 h-72 lg:h-64 object-cover rounded-2xl"
            />

            <h2 className="text-xl text-white">{title}</h2>

            <span className="text-gray-400">{category}</span>

            <div className="flex items-center gap-4">

                <p className="text-3xl text-[#E58D27]">${price}</p>

                <button className="bg-[#E58D27] text-black font-bold rounded-full w-full p-3 hover:-translate-y-1 transition-all duration-200">
                    Comprar
                </button>

            </div>
            
        </div>

    );
};

export default Card;
