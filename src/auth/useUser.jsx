import { useState, useEffect } from "react";
import { getUserById } from "../services/user";

export default function useUser(id) {

    const [user, setUser] = useState({
        id: null,
        email: null,
        rol: null,
    });

    useEffect(() => {

        if (!id) return;

        getUserById(id)
            .then((user) => {
                setUser(user);
            })
            .catch((err) => {
                console.log(err);
                return null;
            });
            
    }, [id]);

    return {
        user,
    };
}
