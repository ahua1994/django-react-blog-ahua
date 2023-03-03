// import { db } from "../helpers/firebase";
import axios from "axios";
import { toast } from "react-toastify";
import { createContext, useState } from "react";
// import { addDoc, setDoc, collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openAddBlog, setOpenAddBlog] = useState(false);
    const [openEditBlog, setOpenEditBlog] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [likes, setLikes] = useState([]);
    const [commentsList, setCommentsList] = useState([]);

    const baseUrl = "https://ahua1994.pythonanywhere.com/";

    const toastStyle = {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        hideProgressBar: true,
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
        borderRadius: "15px",
    };

    const getComments = () => {
        axios
            .get(`${baseUrl}blog/comment/all/`)
            .then(res => {
                setCommentsList(res.data);
            })
            .catch(err => toast.error(err.message, toastStyle));
    };

    const deleteComment = async id => {
        let res = await axios
            .delete(`${baseUrl}/blog/comment/${id}`, {
                headers: {
                    Authorization: `Token ${
                        JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER")).key
                    }`,
                },
            })
            .catch(err => toast.error(err.message, toastStyle));
        res && toast("🦄 Comment Removed", toastStyle);
        getComments();
    };

    const getLikes = () => {
        axios
            .get(`${baseUrl}blog/like/all/`)
            .then(res => {
                setLikes(res.data);
            })
            .catch(err => toast.error(err.message, toastStyle));
    };

    const getPosts = () => {
        // onSnapshot(collection(db, "posts"), querySnapshot => {
        //     try {
        //         let data = querySnapshot.docs.map(doc => ({ ...doc.data(), postId: doc.id }));
        //         data.sort((a, b) => {
        //             let date1 = a.date.split(" ").slice(1, 4).join(" ");
        //             let date2 = b.date.split(" ").slice(1, 4).join(" ");
        //             return new Date(date2) - new Date(date1);
        //         });
        //         setBlogs(data);
        //     } catch (err) {
        //         toast.error(err.message.replace("Firebase:", ""), toastStyle);
        //     }
        // });
        axios
            .get(`${baseUrl}blog/all/`)
            .then(res => {
                setBlogs(res.data);
            })
            .catch(err => toast.error(err.message, toastStyle));
    };

    const addPost = async obj => {
        // try {
        //     let date = new Date();
        //     let postDate = `Posted ${date.toLocaleDateString("en-us", {
        //         year: "numeric",
        //         month: "short",
        //         day: "numeric",
        //     })} at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        //     await addDoc(collection(db, "posts"), { ...obj, date: postDate });
        //     toast.success("Thank You For Posting!", toastStyle);
        // } catch (err) {
        //     toast.error(err.message.replace("Firebase:", ""), toastStyle);
        // }
        // let date = new Date();
        // let postDate = `Posted ${date.toLocaleDateString("en-us", {
        //     year: "numeric",
        //     month: "short",
        //     day: "numeric",
        // })} at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        let res = await axios
            .post(`${baseUrl}blog/post/`, obj, {
                headers: {
                    Authorization: `Token ${
                        JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER")).key
                    }`,
                },
            })
            .catch(err => toast.error(err.message, toastStyle));
        res && toast.success("Thank You For Posting!", toastStyle);
        getPosts();
    };

    // const setLikes = async (obj, uid) => {
    //     if (!uid) return toast("🦄 Please Login to Leave Likes!", toastStyle);
    //     const docRef = doc(db, "/posts/" + obj.postId);
    //     if (!obj.likes) {
    //         obj.likes = [uid];
    //     } else {
    //         if (obj.likes.includes(uid)) {
    //             toast("🦄 Removed Like", toastStyle);
    //             obj.likes.splice(obj.likes.indexOf(uid), 1);
    //         } else {
    //             obj.likes.push(uid);
    //         }
    //     }
    //     try {
    //         await setDoc(docRef, obj);
    //     } catch (err) {
    //         toast.error(err.message.replace("Firebase:", ""), toastStyle);
    //     }
    // };

    const editPost = async (obj, id) => {
        // const docRef = doc(db, "/posts/" + obj.postId);
        // try {
        //     let date = new Date();
        //     let editDate = `Edited ${date.toLocaleDateString("en-us", {
        //         year: "numeric",
        //         month: "short",
        //         day: "numeric",
        //     })} at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        //     await setDoc(docRef, { ...obj, date: editDate });
        //     toast.success("Your Post Has Been Edited!", toastStyle);
        // } catch (err) {
        //     toast.error(err.message.replace("Firebase:", ""), toastStyle);
        // }

        // const docRef = doc(db, "/posts/" + obj.postId);
        // let date = new Date();
        // let editDate = `Edited ${date.toLocaleDateString("en-us", {
        //     year: "numeric",
        //     month: "short",
        //     day: "numeric",
        // })} at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
        let res = await axios
            .patch(`${baseUrl}blog/rud/${id}/`, obj, {
                headers: {
                    Authorization: `Token ${
                        JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER")).key
                    }`,
                },
            })
            .catch(err => {
                toast.error(err.message, toastStyle);
            });
        res && toast.success("Your Post Has Been Edited!", toastStyle);
        getPosts();
    };

    const deletePost = async id => {
        // try {
        //     await deleteDoc(doc(db, "posts", id));
        //     toast.info("Your Post Has Been Deleted", toastStyle);
        // } catch (err) {
        //     toast.error(err.message.replace("Firebase:", ""), toastStyle);
        // }
        let res = await axios
            .delete(`${baseUrl}blog/rud/${id}/`, {
                headers: {
                    Authorization: `Token ${
                        JSON.parse(localStorage.getItem("DJ_REACT_CURRENT_USER")).key
                    }`,
                },
            })
            .catch(err => toast.error(err.message, toastStyle));
        res && toast.info("Your Post Has Been Deleted", toastStyle);
        getPosts();
        // axios.delete(URL, {
        //     headers: {
        //       Authorization: authorizationToken
        //     },
        //     data: {
        //       source: source
        //     }
        //   });
    };

    const handleSwitch = () => {
        setOpenLogin(!openLogin);
        setOpenRegister(!openRegister);
    };

    return (
        <BlogContext.Provider
            value={{
                baseUrl,
                blogs,
                likes,
                openLogin,
                openRegister,
                openAddBlog,
                openEditBlog,
                style,
                toastStyle,
                commentsList,
                getPosts,
                getLikes,
                getComments,
                editPost,
                // setLikes,
                deletePost,
                deleteComment,
                setOpenLogin,
                setOpenRegister,
                setOpenAddBlog,
                setOpenEditBlog,
                handleSwitch,
                addPost,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
