import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { useState, useRef, useEffect } from "react";
import server from "../../lib/server";

function UserList() {
  const [loading, setLoading] = useState(true);
  const users = useRef(null);
  useEffect(() => {
    server("https://rw3fh2-8081.csb.app/api/user/list").then(
      (result) => {
        users.current = result.map((item) => (
          <>
            <ListItem className="user-item">
              <Link to={`/users/${item._id}`}>
                <ListItemText
                  primary={item.first_name + " " + item.last_name}
                />
              </Link>
            </ListItem>
            <Divider />
          </>
        ));
        setLoading(false);
      },
    );
  });
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <List component="nav">{users.current}</List>
      )}
    </div>
  );
}

export default UserList;
