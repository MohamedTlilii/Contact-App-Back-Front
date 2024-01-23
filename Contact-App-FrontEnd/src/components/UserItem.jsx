import React from "react";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Button,
  Card,
  Image,
} from "semantic-ui-react";
function UserItem({ createdAt, imageUrl, userName }) {
  return (
    <Card>
      <CardContent>
        <Image floated="right" size="mini" src={imageUrl} />
        <CardHeader>{userName}</CardHeader>
        <CardMeta>Friends of Elliot</CardMeta>
        {/* <CardDescription>
          Steve wants to add you to the group <strong>best friends</strong>
        </CardDescription> */}
      </CardContent>
      <CardContent extra>
        {createdAt}
        <div className="ui two buttons">
          {/* <Button basic color="green">
            Approve
          </Button> */}
          <Button basic color="red">
            Ban
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserItem;
