import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/userGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  return (
    <div
      style={{ maxHeight: "83vh" }}
      className="my-1 overflow-y-auto no-scrollbar"
    >
      {allUsers.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </div>
  );
}

export default Users;
