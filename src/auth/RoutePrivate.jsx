import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { subscribeToAuthChanges } from "../services/auth";
import useUser from '../auth/useUser';

export default function RoutePrivate({ children, admin = false }) {

    const location = useLocation();

    const [user, setUser] = useState({
        id: null,
        email: null,
    });

    const { user: userAdmin } = useUser(user.id);

    useEffect(() => {
        let unsubscribe = () => { };

        unsubscribe = subscribeToAuthChanges((user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (location.pathname === "/" || location.pathname === "/registrar") return

    if (admin) {

        return userAdmin.id && userAdmin.rol ? React.cloneElement(children, { user: userAdmin }) : null
    
    } else {
        
        return userAdmin.id ? React.cloneElement(children, { user: userAdmin }) : null

    }

}
