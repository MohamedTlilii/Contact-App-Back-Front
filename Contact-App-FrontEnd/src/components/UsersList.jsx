import React from "react";
import { useFetch } from "../utils/useFetch";
import { adminUrl } from "../utils/url";
import { CardGroup } from "semantic-ui-react";
import UserItem from "./UserItem";
function UsersList() {
  let token = localStorage.getItem("token");
  const { data, error } = useFetch(`${adminUrl}/getUsers`, token);
    // console.log(data)
  return (
    <div className="w-[70%] border-2 border-black">
      <CardGroup>
        {data?.map((user, i) => (
          <UserItem key={i} {...user} />
        ))}
      </CardGroup>
    </div>
  );
}

export default UsersList;
