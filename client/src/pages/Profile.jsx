import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { url } from "../utils/url";
import { toast, ToastContainer } from "react-toastify";
function Profile() {
  const navigate = useNavigate();
  const [contactData, setContactData] = useState({});
  const [contactPhoto, setContactPhoto] = useState();
  const [loading, setLoading] = useState(false);

  const handleAddContact = () => {
    setLoading(true);
    let token = localStorage.getItem("token");
    let { contactName, phone, email, address } = contactData;
    const contactFormData = new FormData();
    contactFormData.append("photo", contactPhoto);
    contactFormData.append("contactName", contactName);
    contactFormData.append("phone", phone);
    contactFormData.append("email", email);
    contactFormData.append("address", address);
    console.log(contactFormData);
    axios
      .post(`${url}/addContact`, contactFormData, {
        headers: { token },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        toast.success("Contact was added successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
        if (err.response.data.error.includes("Invalid token")) {
          localStorage.clear();
          navigate("/login");
        }
      });
  };

  return (
    <div className="md:px-[200px] md:py-[100px]">
      <Form className=" md:w-[60%] md:m-auto p-12 ">
        <h1>Add new contact</h1>
        <Form.Group
          onChange={(e) => {
            setContactData({ ...contactData, [e.target.name]: e.target.value });
          }}
          widths="equal"
        >
          <Form.Input
            type="text"
            placeholder="Contact name"
            name="contactName"
          />
          <Form.Input type="phone" placeholder="Phone" name="phone" />
        </Form.Group>
        <Form.Group
          widths="equal"
          onChange={(e) => {
            setContactData({ ...contactData, [e.target.name]: e.target.value });
          }}
        >
          <Form.Input type="email" placeholder="Email" name="email" />
          <Form.Input type="text" placeholder="Adress" name="address" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            type="file"
            name="photo"
            onChange={(e) => {
              setContactPhoto(e.target.files[0]);
            }}
          />
        </Form.Group>
        <Button
          color="violet"
          onClick={() => {
            handleAddContact();
          }}
          loading={loading}
        >
          Add
        </Button>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Profile;
