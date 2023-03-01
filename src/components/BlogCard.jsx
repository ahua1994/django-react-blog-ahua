import "./BlogCard.scss";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { ChatBubble } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";
import EditBlog from "./EditBlog";

const BlogCard = ({ blog }) => {
    const { currentUser, handleLike } = useContext(AuthContext);
    const { deletePost, likes, getLikes, commentsList } = useContext(BlogContext);

    let date = new Date(blog.published);
    let date2 = new Date(blog.updated);

    const postLikes = likes.filter(like => like.post === blog.id);
    const postComments = commentsList.filter(x => x.post === blog.id);
    const userLike = postLikes.filter(x => x.user === currentUser?.id);

    useEffect(() => {
        getLikes();
    }, []);

    return (
        <Card className="blogcard">
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: "#f44336" }}>{blog.author[0].toUpperCase()}</Avatar>}
                title={blog.title.length > 20 ? blog.title.slice(0, 20) + "..." : blog.title}
                subheader={`by ${blog.author}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={blog.image_file || blog.image_url || `https://picsum.photos/300`}
                alt="invalid img-url"
            />
            <CardContent>
                <Typography
                    style={{ marginBottom: "0.5rem", textAlign: "right", fontSize: "0.8rem" }}
                    variant="body2"
                >
                    {String(date) === String(date2)
                        ? `Posted ${date.toLocaleDateString("en-us", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                          })} at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
                        : `Edited ${date.toLocaleDateString("en-us", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                          })} at ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`}
                </Typography>
                <Typography variant="body2">
                    {blog.content.length > 85 ? `${blog.content.slice(0, 85)}...` : blog.content}
                </Typography>
            </CardContent>
            <CardActions>
                <div className="buttons">
                    <Link to={`/details/${blog.id}`} state={{ blog }}>
                        <Button
                            color="secondary"
                            style={{ marginLeft: "0.6rem" }}
                            variant="contained"
                        >
                            More
                        </Button>
                    </Link>
                    {currentUser?.id === blog.author_id && (
                        <>
                            <EditBlog blog={blog} />
                            <Button
                                color="error"
                                style={{ marginLeft: "0.6rem" }}
                                variant="contained"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this?")) {
                                        deletePost(blog.id);
                                    }
                                }}
                            >
                                Del
                            </Button>
                        </>
                    )}
                </div>
                <div className="iconbuttons">
                    <IconButton className="card-likes">
                        {postComments.length !== 0 && (
                            <p className="likes">{postComments.length}</p>
                        )}
                        <ChatBubble></ChatBubble>
                    </IconButton>
                    <IconButton
                        className="card-likes"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => handleLike(userLike[0], currentUser?.id, blog.id)}
                    >
                        {postLikes.length !== 0 && <p className="likes"> {postLikes.length}</p>}
                        <FavoriteIcon
                            style={{
                                color: userLike.length !== 0 ? "red" : null,
                            }}
                        />
                    </IconButton>
                </div>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
