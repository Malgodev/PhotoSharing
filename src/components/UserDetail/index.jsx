import React from "react";

import "./styles.css";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail({ setContext }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const user_detail = React.useRef(null);
  const user = useParams();
  React.useEffect(() => {
    server.fetchModel(`https://rw3fh2-8081.csb.app/api/user/${user.userId}`).then(
      (result) => {
        user_detail.current = result.data;
        setLoading(false);
        setContext(user_detail.current.first_name);
      },
    );
  });
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-detail">
          <h3>
            {user_detail.current.first_name +
              " " +
              user_detail.current.last_name}
          </h3>
          <p>Occupation: {user_detail.current.occupation}</p>
          <p>Location: {user_detail.current.location}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: "Description: " + user_detail.current.description,
            }}
          ></p>
          <button
            onClick={() => {
              navigate(`/photos/${user_detail.current._id}`);
            }}
          >
            ALBUM
          </button>
        </div>
      )}
    </>
  );
}

export default UserDetail;
