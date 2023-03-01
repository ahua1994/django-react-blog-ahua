import "./Comment.scss";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ data }) => {
    const { currentUser } = useContext(AuthContext);
    const { deleteComment } = useContext(BlogContext);

    let date = new Date(data.timestamp);

    return (
        <div className="Comment">
            <Avatar sx={{ bgcolor: "#f44336" }}>{data.author[0].toUpperCase()}</Avatar>
            <div className="info">
                <div className="heading">
                    <h4>{data.author}</h4>
                    <span>{date.toDateString()}</span>
                </div>
                <p>{data.content.length === 255 ? data.content + "..." : data.content}</p>
                {currentUser?.id === data.author_id && (
                    <FontAwesomeIcon
                        onClick={() => window.confirm("Delete Comment?") && deleteComment(data.id)}
                        icon={faTrashCan}
                    ></FontAwesomeIcon>
                )}
            </div>
        </div>
    );
};

export default Comment;
