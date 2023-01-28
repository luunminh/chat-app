import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

// instead of using redux for complicated and longthy code, we use useContext to save some properties and data that can be use in many components
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            // console.log({ user });
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                // console.log({ displayName, email, uid, photoURL });
                setUser({ displayName, email, uid, photoURL })
                setLoading(false);
                navigate("/")
                return;
            }
            setLoading(false);
            navigate('/login')
        })


        // clean function
        return () => {
            unSub();
        }
    }, [navigate])
    return (

        <AuthContext.Provider value={user}>
            {(loading) ?
                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'center', height: '100vh' }}>
                    <Spin />
                </div>
                : children}
        </AuthContext.Provider>
    )
}
