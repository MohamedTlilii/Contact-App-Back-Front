import React, { useState } from "react";
import { useFetch } from "../utils/useFetch";
import { adminUrl, url } from "../utils/url";
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
  Form,
  Button,
} from "semantic-ui-react";
import axios from "axios";
function Comments({ postId }) {
  let token = localStorage.getItem("token");
  let isAdmin = localStorage.getItem("isAdmin");
  let isUser = localStorage.getItem("isUser");
  let userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentID, setCommentId] = useState();
  const [commentBody, setCommentBody] = useState("");
  const [newCommentBody, setNewCommentBody] = useState({});
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
  const handleUserDeleteComment = (commentId) => {
    setLoading(true);
    axios
      .delete(
        `https://contactapp-api-uas9.onrender.com/api/user/deleteComment/${commentId}`,
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
  const handleAddComment = () => {
    axios
      .post(
        `${url}/addComment/${postId}`,
        { commentBody },
        {
          headers: { token },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.dir(err));
  };
  const handleEditComment = (commentId) => {
    setShowEdit(false);
    axios
      .put(`${url}/update/${commentId}`, newCommentBody, {
        headers: { token },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.dir(err);
      });
  };
  return (
    <div>
      <details style={{ cursor: "pointer" }}>
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
                    {showEdit && commentID === comment._id ? (
                      <Form>
                        <Form.Input
                          type="text"
                          onChange={(e) => {
                            setNewCommentBody({ commentBody: e.target.value });
                          }}
                          defaultValue={comment.commentBody}
                        />
                        <Button
                          onClick={() => {
                            handleEditComment(comment._id);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                        color="black"
                          onClick={() => {
                            setShowEdit(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Form>
                    ) : (
                      <CommentText>{comment.commentBody}</CommentText>
                    )}
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
                    {isUser === "true" && comment.userId._id === userId && (
                      <CommentActions>
                        {loading ? (
                          <Icon name="circle notched" loading />
                        ) : (
                          <>
                            <CommentAction
                              onClick={() => {
                                handleUserDeleteComment(comment._id);
                              }}
                            >
                              Delete
                            </CommentAction>
                            {!showEdit && (
                              <CommentAction
                                onClick={() => {
                                  setCommentId(comment._id);
                                  setShowEdit(true);
                                }}
                              >
                                Edit
                              </CommentAction>
                            )}
                          </>
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
          <Form>
            <Form.Input
              type="text"
              onChange={(e) => {
                setCommentBody(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                handleAddComment();
              }}
            >
              Comment
            </Button>
          </Form>
        </CommentGroup>
      </details>
    </div>
  );
}

export default Comments;
