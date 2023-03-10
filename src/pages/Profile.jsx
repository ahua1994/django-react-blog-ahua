import "./Profile.scss";
import BlogCard from "../components/BlogCard";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const { getPosts, blogs } = useContext(BlogContext);
    console.log(currentUser);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="pfcontainer">
            {currentUser ? (
                <div className="Profile">
                    <div className="MyPosts">
                        <h1>My Posts</h1>
                        <hr />
                        <div className="mpgrid">
                            {blogs
                                .filter(blog => currentUser.id === blog.author_id)
                                .map(blog => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                        </div>
                    </div>
                    <div className="LikedPosts">
                        <h1>Liked Posts</h1>
                        <hr />
                        <div className="lpgrid">
                            {blogs
                                ?.filter(blog => blog?.likes?.includes(currentUser.uid))
                                .map(blog => (
                                    <BlogCard key={blog?.id} blog={blog} />
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="plea">Please Login to View Your Profile !</h1>
            )}
        </div>
    );
};

export default Profile;
