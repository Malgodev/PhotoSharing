import { Link } from "react-router-dom";
import "./styles.css";
import fecthModelData from "../../lib/fetchModelData";

function CommentSection({ comments }) {
  const cmts =
    comments.length === 0 ? (
      <div className="comment">
        <p style={{ margin: 0 }}>
          <i>No comment heres ...</i>
        </p>
      </div>
    ) : (
      comments.map((cmt) => (
        <div className="comment" key={cmt._id}>
          <p style={{ "margin-top": 0 }}>
            <b>
              <Link to={`/users/${cmt.user_id}`}>{cmt.user_name}</Link>{" "}
            </b>
            {cmt.date_time}
          </p>
          <p
            style={{ "margin-bottom": 0 }}
            dangerouslySetInnerHTML={{ __html: cmt.comment }}
          ></p>
        </div>
      ))
    );
  return <div className="comment-section">{cmts}</div>;
}

export default CommentSection;
