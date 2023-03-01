import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mui/material";

const CommentBox = ({ post }) => {
    const { currentUser, handleComment } = useContext(AuthContext);
    const [comment, setComment] = useState("");

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
                <div className="icon-username" style={{ marginTop: "1rem " }}>
                    <AccountCircle /> <p>{currentUser?.username}</p>
                </div>
                <TextField
                    id="input-with-sx"
                    multiline
                    minRows="2"
                    maxRows={2}
                    label="Comment"
                    variant="outlined"
                    required
                    name="content"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </Box>
            <Button
                onClick={() => {
                    if (comment) {
                        handleComment(comment, post);
                        setComment("");
                    }
                }}
                style={{ alignSelf: "flex-end" }}
                color="primary"
            >
                Submit
            </Button>
        </div>
    );
};

export default CommentBox;
