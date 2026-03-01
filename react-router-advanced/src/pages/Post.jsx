import { useParams, Link } from "react-router-dom";

function Post() {
  const { postId } = useParams();

  return (
    <div>
      <h2>Post</h2>
      <p>Dynamic Post ID: <strong>{postId}</strong></p>

      <p>
        <Link to="/">Back Home</Link>
      </p>
    </div>
  );
}

export default Post;