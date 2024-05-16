import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
} from "@material-ui/core";
import { server } from "../../lib/fetchModelData.js";
import "./styles.css";

const UserPhotos = () => {
  const { userId } = useParams(); 
  const [photos, setPhotos] = useState([]);
  const [userComments, setUserComments] = useState({});

  useEffect(() => {
    server.fetchModel(
      `https://rw3fh2-8081.csb.app/api/photosOfUser/${userId}`
    )
      .then((result) => {
        setPhotos(result.data);
      })
      .catch((error) => {
        console.error("Error fetching user photos:", error);
        setPhotos([]); 
      });
  }, [userId]); 

  useEffect(() => {
    const fetchCommentsUserData = async () => {
      // console.log(typeof())
      const commentsUserData = {};
      for (const photo of photos) {
        for (const comment of photo.comments) {
          if (!commentsUserData[comment.user_id]) {
            commentsUserData[comment.user_id] = await fetchUserData(comment.user_id);
          }
        }
      }
      setUserComments(commentsUserData);
    };

    fetchCommentsUserData();
  }, [photos]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `https://rw3fh2-8081.csb.app/api/user/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Photos of User
      </Typography>
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo._id}>
            <Card className="photo-card">
              <CardMedia
                className="photo"
                image={`/images/${photo.file_name}`}
                title={photo.file_name}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Date: {new Date(photo.date_time).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Comments:
                </Typography>
                {photo.comments &&
                  photo.comments.map((comment) => (
                    <div key={comment._id} className="comment">
                      <Avatar alt={userComments[comment.user_id] ? userComments[comment.user_id].first_name : ""} />
                      <div className="comment-content">
                        <Typography variant="body2">
                          <Link to={`/users/${comment.user_id}`}>
                            {userComments[comment.user_id]
                              ? `${userComments[comment.user_id].first_name} ${userComments[comment.user_id].last_name}`
                              : "Unknown User"}
                          </Link>
                          : {comment.comment}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(comment.date_time).toLocaleString()}
                        </Typography>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Link to={`/users/${userId}`} key="userDetailLink">
        Back to User Detail
      </Link>
    </div>
  );
};

export default UserPhotos;
