import React from "react";
import { useFetch } from "../utils/useFetch";
import { adminUrl } from "../utils/url";
import { CardGroup } from "semantic-ui-react";
import PostItem from "../components/PostItem";
function Posts() {
  let token = localStorage.getItem("token");
  const { data, error } = useFetch(`${adminUrl}/posts`, token);
  //   console.log(data);
  return (
    <div className="md:p-6">
      <h2>Posts</h2>
      <div className="md:p-8">
        <CardGroup>
          {data?.map((post) => (
            <PostItem key={post._id} {...post} />
          ))}
        </CardGroup>
      </div>
    </div>
  );
}

export default Posts;
