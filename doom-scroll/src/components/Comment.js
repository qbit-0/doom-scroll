export const Comment = ({ comment }) => {
  return (
    <div>
      <div>
        <p>{comment.data.body}</p>
      </div>
    </div>
  );
};
