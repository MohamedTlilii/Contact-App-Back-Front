import React from "react";
import AddPostForm from "../components/AddPostForm";
import UsersList from "../components/UsersList";
function AdminDashboard() {
  return (
    <div className="md:flex md:gap-2 md:py-12 md:px-4">
      <AddPostForm />
      <UsersList />
    </div>
  );
}

export default AdminDashboard;
