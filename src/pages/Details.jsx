import "./Details.scss";
import { Button, CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { AuthContext } from "../contexts/AuthContext";
import CommentBox from "../components/CommentBox";
import Comment from "../components/Comment";

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const blog = location?.state?.blog || null;
    const { currentUser } = useContext(AuthContext);

    const { setLikes, commentsList, getComments } = useContext(BlogContext);
    useEffect(() => {
        getComments();
    }, []);

    let date = new Date(blog.published);
    let date2 = new Date(blog.updated);
    return (
        <div className="Details">
            {blog ? (
                <div className="post">
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: "#f44336" }}>
                                {blog.author[0].toUpperCase()}
                            </Avatar>
                        }
                        title={blog.author}
                        subheader={`@ ${blog.author}`}
                    />
                    <hr style={{ width: "100%" }}></hr>
                    <h2 className="title">{blog.title} </h2>
                    <img src={blog.image || "https://picsum.photos/1000"} alt={"invalid img-url"} />
                    <hr style={{ width: "100%" }}></hr>
                    <p className="date">
                        {String(date) === String(date2)
                            ? `Posted ${date.toLocaleDateString("en-us", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                              })} at ${date.getHours()}:${String(date.getMinutes()).padStart(
                                  2,
                                  "0"
                              )}`
                            : `Edited ${date.toLocaleDateString("en-us", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                              })} at ${date.getHours()}:${String(date.getMinutes()).padStart(
                                  2,
                                  "0"
                              )}`}
                    </p>
                    <p className="info">{blog.content}</p>
                    <hr style={{ width: "100%", marginTop: "2rem" }}></hr>
                    <CommentBox post={blog.id} />
                    <hr style={{ width: "100%" }}></hr>
                    {commentsList
                        // .filter(obj => obj.post === blog.id)
                        .map(obj => (
                            <Comment data={obj} key={obj.id} />
                        ))}
                    <div className="btn">
                        <Button onClick={() => navigate(-1)} color="secondary" variant="contained">
                            Back
                        </Button>
                        <IconButton
                            onClick={() => setLikes(blog, currentUser?.uid)}
                            className="right"
                        >
                            {blog?.likes?.length !== 0 && (
                                <p className="likes">{blog?.likes?.length}</p>
                            )}
                            <FavoriteIcon
                                style={{
                                    color: blog?.likes?.includes(currentUser?.uid) ? "red" : null,
                                }}
                            />
                        </IconButton>
                    </div>
                </div>
            ) : (
                <Button color="secondary" variant="contained" onClick={() => navigate("/")}>
                    Go Back
                </Button>
            )}
        </div>
    );
};

export default Details;
