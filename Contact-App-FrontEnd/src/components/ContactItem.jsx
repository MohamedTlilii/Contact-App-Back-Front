import React, { useState } from "react";
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
  ButtonGroup,
  Button,
  ModalHeader,
  ModalContent,
  ModalActions,
  Form,
  Modal,
} from "semantic-ui-react";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../utils/url";
function ContactItem({
  contactName,
  phone,
  _id,
  email,
  imageUrl,
  address,
  createdAt,
  updatedAt,
}) {
  let token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newContactData, setNewContactData] = useState({});
  const [newContactPhoto, setNewContactPhoto] = useState();
  const handleUpdateContact = () => {
    setLoading(true);
    axios
      .put(`${url}/updateContact/${_id}`, newContactData, {
        headers: { token },
      })
      .then((res) => {
        setLoading(false);

        setOpen(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);

        console.dir(err);
      });
  };
  let tIndex = createdAt.indexOf("T");
  let date = createdAt.substr(0, tIndex);
  const handleDeleteContact = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/deleteContact/${_id}`, {
            headers: { token },
          })
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error occured!",
              text: "Something happend",
              icon: "error",
            });
          });
      }
    });
  };
  const handleUpdateContactPhoto = () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("photo", newContactPhoto);
    axios
      .put(`${url}/updateContactPhoto/${_id}`, formData, {
        headers: { token },
      })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setOpen2(false);
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  };
  return (
    <>
      <Card style={{ margin: 0, position: "relative" }}>
        <div
          className="absolute top-1 right-2 z-20 cursor-pointer"
          onClick={() => {
            setOpen2(true);
          }}
        >
          <Icon name="picture" size="large" color="orange" />
        </div>
        <Image src={imageUrl} wrapped ui={false} />
        <CardContent>
          <CardHeader style={{ textTransform: "capitalize" }}>
            {contactName}
          </CardHeader>
          <CardMeta>
            <span className="date">Added on: {date}</span>
          </CardMeta>
          <CardDescription style={{ textTransform: "capitalize" }}>
            {" "}
            <Icon name="map marker alternate" /> {address}
          </CardDescription>
          <CardDescription>
            {" "}
            <Icon name="mail" /> {email}
          </CardDescription>
        </CardContent>
        <CardContent extra>
          <Icon name="phone" />
          {phone}
        </CardContent>
        <ButtonGroup>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDeleteContact();
            }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Card>
      {/* EDIT CONTACT MODAL */}
      <Modal onClose={() => setOpen(false)} open={open}>
        <ModalHeader>Update contact</ModalHeader>
        <ModalContent>
          <Form
            onChange={(e) => {
              setNewContactData({
                ...newContactData,
                [e.target.name]: e.target.value,
              });
            }}
          >
            <Form.Group widths="equal">
              <Form.Input
                type="text"
                placeholder="Contact name"
                name="contactName"
              />
              <Form.Input type="phone" placeholder="Phone" name="phone" />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input type="email" placeholder="Email" name="email" />
              <Form.Input type="text" placeholder="Adress" name="address" />
            </Form.Group>
          </Form>
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Update"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              handleUpdateContact();
            }}
            positive
            loading={loading}
          />
        </ModalActions>
      </Modal>
      {/* EDIT CONTACT PHOTO MODAL */}
      <Modal onClose={() => setOpen2(false)} open={open2}>
        <ModalHeader>Update contact photo</ModalHeader>
        <ModalContent>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                type="file"
                name="photo"
                onChange={(e) => {
                  setNewContactPhoto(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Form>
        </ModalContent>
        <ModalActions>
          <Button color="black" onClick={() => setOpen2(false)}>
            Cancel
          </Button>
          <Button
            content="Update"
            labelPosition="right"
            icon="checkmark"
            onClick={() => {
              handleUpdateContactPhoto();
            }}
            positive
            loading={loading}
          />
        </ModalActions>
      </Modal>
    </>
  );
}

export default ContactItem;
