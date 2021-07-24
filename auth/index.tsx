import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { authenticate } from "../Firebase";

const index = ({ children }) => {
    const AuthProvider = createContext(null);

    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        authenticate.onAuthStateChanged((user) => {
            if (user) {
                setUser(user.email);
                setAuth(true);
            } else {
                setUser(null);
                setAuth(false);
            }
        });
        if (!auth) {
            router.push("/login");
        }
    }, [auth]);

    return (
        <AuthProvider.Provider value={{ auth, setAuth }}>
            {children}
        </AuthProvider.Provider>
    );
};

export default index;
