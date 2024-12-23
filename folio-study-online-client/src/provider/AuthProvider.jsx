import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";
import toast from "react-hot-toast";


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const loggedUser = { email: currentUser?.email || user?.email }
            setUser(currentUser)
            setLoading(false)

            if (currentUser) {
                axios.post('https://folio-server.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        if (res.data?.success){
                            return toast.success('Token created successfully!')
                        }
                        toast.error('Error! Could not create token')
                    })
                    .catch(() => toast.error('Error! Could not create token'))
            }
            else {
                axios.post('https://folio-server.vercel.app/logout', {}, { withCredentials: true })
                .then(res => {
                    if (res.data?.success){
                        return toast.success('Token removed successfully!')
                    }
                    toast.error('Error! Could not remove token')
                })
            }
        })
        return () => unSubscribe()
    }, [])


    const authInfo = { user, createUser, signInUser, signOutUser, loading }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
}