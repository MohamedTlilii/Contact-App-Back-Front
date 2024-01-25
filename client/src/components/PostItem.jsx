import React  from "react";
import Comments from "./Comments";
import {
  Button,
  ButtonGroup,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
} from "semantic-ui-react";
function PostItem({ postBody, image, createdAt, _id }) {
  let isAdmin = localStorage.getItem("isAdmin");
  return (
    <Card>
      <Image src={image} wrapped ui={false} />
      <CardContent>
        {/* <CardHeader>Daniel</CardHeader> */}
        {/* <CardMeta>Joined in 2016</CardMeta> */}
        <CardDescription>{postBody}</CardDescription>
        <CardDescription>
          <Comments postId={_id} />
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <Icon name="calendar" />
        {createdAt}
      </CardContent>
      {isAdmin === "true" && (
        <ButtonGroup>
          <Button color="red">Delete</Button>
        </ButtonGroup>
      )}
    </Card>
  );
}

export default PostItem;
