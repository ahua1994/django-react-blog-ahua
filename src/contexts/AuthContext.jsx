// import { auth } from "../helpers/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useState, useContext } from "react";
// import {
//     signInWithEmailAndPassword,
//     sendPasswordResetEmail,
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     updateProfile,
//     GoogleAuthProvider,
//     signInWithPopup,
//     signOut,
// } from "firebase/auth";
import { BlogContext } from "./BlogContext";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER"))
    );
    const [loginPassword, setLoginPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const { setOpenLogin, baseUrl, getLikes, getComments } = useContext(BlogContext);
    const toastStyle = {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
    };

    const handleLike = async (like, user, post) => {
        if (like) {
            let res = await axios
                .delete(`${baseUrl}blog/like/${like.id}/`, {
                    headers: {
                        Authorization: `Token ${currentUser?.key}`,
                    },
                })
                .catch(err => toast.error(err.message, toastStyle));
            res && toast("🦄 Removed Like", toastStyle);
        } else {
            let res = await axios
                .post(
                    `${baseUrl}blog/like/`,
                    { user: user, post: post },
                    {
                        headers: {
                            Authorization: `Token ${currentUser?.key}`,
                        },
                    }
                )
                .catch(err => toast.error(err.message, toastStyle));
            res && toast.success("Liked!", toastStyle);
        }
        getLikes();
    };

    const handleComment = async (comment, post) => {
        const res = await axios
            .post(
                `${baseUrl}blog/comment/`,
                { content: comment, post: post },
                {
                    headers: {
                        Authorization: `Token ${currentUser?.key}`,
                    },
                }
            )
            .catch(err => toast.error("Login to Comment", toastStyle));
        res && toast.success("Comment has been posted!", toastStyle);
        getComments();
    };
    // useEffect(() => {
    //     // setCurrentUser(JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER")));
    // }, [currentUser]);

    const handleRegister = async e => {
        e.preventDefault();
        // try {
        //     await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        //     await updateProfile(auth.currentUser, { displayName: registerUsername });
        // } catch (err) {
        //     return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        // }
        const res = await axios
            .post(`${baseUrl}user/register/`, {
                email: registerEmail,
                password: registerPassword,
                username: registerUsername,
            })
            .catch(err => toast.error(err.message, toastStyle));
        if (res) {
            localStorage.setItem(
                "DJ_REACT_CURRENT_USER",
                JSON.stringify({ key: res.data.key, ...res.data.user })
            );
            setCurrentUser({ key: res.data.key, ...res.data.user });
            setRegisterEmail("");
            setRegisterPassword("");
            setRegisterUsername("");
            toast.success("Registered Successfully!", toastStyle);
        }
    };

    // const forgetPassword = async email => {
    //     try {
    //         await sendPasswordResetEmail(auth, email);
    //         return toast.success("Please Check Your Inbox", toastStyle);
    //     } catch (err) {
    //         return toast.error(err.message.replace("Firebase:", ""), toastStyle);
    //     }
    // };

    // const signInProvider = async () => {
    //     const provider = new GoogleAuthProvider();
    //     await signInWithPopup(auth, provider);
    //     toast.success("Login Successful !", toastStyle);
    // };

    const handleLogin = async e => {
        // e.preventDefault();
        // try {
        //     await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        // } catch (err) {
        //     return toast.error(err.message.replace("Firebase:", ""), toastStyle);
        // }
        // setLoginEmail("");
        // setLoginPassword("");
        // toast.success("Login Successful !", toastStyle);
        // setOpenLogin(false);
        e.preventDefault();
        const res = await axios
            .post(`${baseUrl}user/login/`, {
                username: loginEmail,
                password: loginPassword,
            })
            .catch(err => toast.error("An Error Occured :(", toastStyle));
        if (res.data) {
            setCurrentUser({ ...res.data });
            localStorage.setItem("DJ_REACT_CURRENT_USER", JSON.stringify({ ...res.data }));
            setLoginEmail("");
            setLoginPassword("");
            toast.success("Login Successful !", toastStyle);
            setOpenLogin(false);
        }
    };

    // const userObserver = setCurrentUser => {
    //     onAuthStateChanged(auth, user => {
    //         if (user) setCurrentUser(user);
    //         else setCurrentUser(null);
    //     });
    // };

    const logout = () => {
        // toast.info("You Have Been Signed Out", toastStyle);
        // signOut(auth);
        axios.post(
            `${baseUrl}user/logout/`,
            {},
            {
                headers: {
                    Authorization: `Token ${
                        JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER")).key
                    }`,
                },
            }
        );
        toast.info("You Have Been Signed Out", toastStyle);
        localStorage.removeItem("DJ_REACT_CURRENT_USER");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                loginEmail,
                loginPassword,
                registerUsername,
                registerEmail,
                registerPassword,
                currentUser,
                setLoginEmail,
                setLoginPassword,
                setRegisterUsername,
                setRegisterEmail,
                setRegisterPassword,
                handleLogin,
                handleRegister,
                handleComment,
                handleLike,
                // signInProvider,
                logout,
                setCurrentUser,
                // userObserver,
                // forgetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
