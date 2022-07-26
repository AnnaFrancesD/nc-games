export default function CommentCard({comment}) {
    return (
        <>
        <p>{comment.author}: {comment.body}</p>
        <p>Votes: {comment.votes}</p>
        <p>on {comment.created_at.slice(0, -14)} at {comment.created_at.slice(-13, -8)}</p>
        </>
    )
}