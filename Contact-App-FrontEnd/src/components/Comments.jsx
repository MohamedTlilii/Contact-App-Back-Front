import React, { useState } from "react";
import { useFetch } from "../utils/useFetch";
import { adminUrl } from "../utils/url";
import {
  Icon,
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  Comment,
  Header,
} from "semantic-ui-react";
import axios from "axios";
function Comments({ postId }) {
  let token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  let isAdmin = localStorage.getItem("isAdmin");
  const { data, error } = useFetch(`${adminUrl}/comments/${postId}`, token);
  const handleAdminDeleteComment = (commentId) => {
    setLoading(true);
    axios
      .delete(
        `https://contactapp-api-uas9.onrender.com/api/admin/deleteComment/${commentId}`,
        { headers: { token } }
      )
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  };
  return (
    <div>
      <details>
        <summary> {data?.length} Comment(s)</summary>
        <CommentGroup>
          <Header as="h3" dividing>
            Comments
          </Header>
          {data?.length > 0 ? (
            data.map((comment) => {
              let tIndex = comment.createdAt.indexOf("T");
              let dayDate = comment.createdAt.substr(0, tIndex);
              let hourDate = comment.createdAt.substr(
                tIndex + 1,
                comment?.createdAt.length
              );
              return (
                <Comment>
                  <CommentAvatar src={comment.userId.imageUrl} />
                  <CommentContent>
                    <CommentAuthor as="a">
                      {comment.userId.userName}
                    </CommentAuthor>
                    <CommentMetadata>
                      <div>
                        Today at {dayDate},
                        {hourDate.substr(0, hourDate?.length - 8)}
                      </div>
                    </CommentMetadata>
                    <CommentText>{comment.commentBody}</CommentText>
                    {isAdmin === "true" && (
                      <CommentActions>
                        {loading ? (
                          <Icon name="circle notched" loading />
                        ) : (
                          <CommentAction
                            onClick={() => {
                              handleAdminDeleteComment(comment._id);
                            }}
                          >
                            Delete
                          </CommentAction>
                        )}
                      </CommentActions>
                    )}
                  </CommentContent>
                </Comment>
              );
            })
          ) : (
            <h6>No comments yet</h6>
          )}
        </CommentGroup>
      </details>
    </div>
  );
}

export default Comments;
