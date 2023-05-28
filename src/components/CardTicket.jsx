import { RiTicketLine } from "react-icons/ri";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const CardTicket = (props) => {

    const { ticket, totalTickets, text } = props;

    let status = "";
    let textColor = "";

    switch (ticket) {

        case "pending":
            status = "bg-yellow-500/10 text-yellow-500";
            textColor = "text-yellow-500";
            break;
        case "inProcess":
            status = "bg-blue-500/10 text-blue-500";
            textColor = "text-blue-500";
            break;
        case "close":
            status = "bg-green-500/10 text-green-500";
            textColor = "text-green-500";
            break;
        case "total":
            status = "bg-pink-500/10 text-pink-500";
            textColor = "text-pink-500";
            break;
    }

    return (

        <div className="bg-secondary-100 p-8 rounded-xl">

            <div className="flex items-center justify-between mb-4">

                <div>
                    <RiTicketLine
                        className={`text-4xl ${status} p-2 box-content rounded-xl`}
                    />
                </div>

            </div>

            <div>

                <h2 className="text-4xl text-white font-bold mb-4">{totalTickets}</h2>
                <p className={textColor}>{text}</p>

            </div>

        </div>

    );
};

export default CardTicket;
