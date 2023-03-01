import "./Comment.scss";
import Avatar from "@mui/material/Avatar";

const Comment = ({ data }) => {
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
            </div>
        </div>
    );
};

export default Comment;
