import React, { useState } from "react";
import {
  FormField,
  Form,
  Input,
  Button,
  Message,
  MessageHeader,
} from "semantic-ui-react";
import { adminUrl } from "../utils/url";
import axios from "axios";
function AddPostForm() {
  let token = localStorage.getItem("token");
  const [postData, setPostData] = useState("");
  const [imgData, setImgData] = useState();
  const [message, setMessage] = useState();

  const [loading, setLoading] = useState(false);
  const handleAddPost = () => {
    setLoading(true);
    const postForm = new FormData();
    postForm.append("postPic", imgData);
    postForm.append("postBody", postData);
    axios
      .post(`${adminUrl}/addPost`, postForm, {
        headers: { token },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          setMessage("Post added successfully");
          setPostData("");
        }
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  };
  return (
    <div className="w-[30%]">
      <Form size="small">
        <FormField
          type="text"
          control={Input}
          placeholder="Write your post here"
          onChange={(e) => {
            setPostData(e.target.value);
          }}
        />
        <FormField
          control={Input}
          type="file"
          onChange={(e) => {
            setImgData(e.target.files[0]);
          }}
        />
        {message && (
          <Message positive>
            <MessageHeader>{message}</MessageHeader>
          </Message>
        )}
        <Button
          onClick={() => {
            handleAddPost();
          }}
          loading={loading}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddPostForm;
