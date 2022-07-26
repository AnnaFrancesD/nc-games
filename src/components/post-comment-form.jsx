import { useContext, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import * as api from "../api";

export default function PostCommentForm({review_id}) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [commentToAdd, setCommentToAdd] = useState({username: currentUser});

    function handleChange(body, value) {
        setCommentToAdd((currComment) => {
            return { ...currComment, [body]: value };
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        api.addComment(review_id, commentToAdd);
        //ensure user has filled in the required info - add tag if user tries to submit without filling in the comment
        //adds the comment fine - need to work out how to show user the post has been successful
        //optimistic rendering of new comment at top of comment list?
    }


    return (
        <>
            <form className="post-comment-form" onSubmit={handleSubmit}>
                <label htmlFor="body">Add a comment: </label>
                <input className="post-comment-input" name="body" onChange={(e) => {
                    handleChange("body", e.target.value);
                }}></input>
                <input className="comment-button" type="submit" value="Post"></input>
            </form>
        </>
    )
}