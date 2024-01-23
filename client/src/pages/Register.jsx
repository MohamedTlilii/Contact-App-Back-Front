import React, { useState } from "react";
import { Button, Form, Checkbox } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MessageHeader, Message } from "semantic-ui-react";
function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    setLoading(true);
    axios
      .post(
        "https://contactapp-api-uas9.onrender.com/api/user/register",
        registerData
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
        setMessage("Your account was created successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        if (err.response.data.error.email) {
          setError(err.response.data.error.email.message);
        } else {
          setError(err.response.data.error);
        }
        setTimeout(() => {
          setError("");
        }, 10000);
        console.dir(err);
      });
  };
  return (
    <div className="md:px-[200px] md:py-[135px]">
      <Form
        size="large"
        className="border-2 border-slate-300 md:w-[60%] md:m-auto p-12 rounded-2xl"
        onChange={(e) => {
          setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        }}
      >
        <h1>Register.</h1>
        <Form.Input type="text" name="userName" placeholder="Username" />
        <Form.Input type="email" name="email" placeholder="Email" />
        <Form.Input
          type={showPass ? "text" : "password"}
          name="password"
          placeholder="Password"
        />
        <Form.Field>
          <Checkbox
            label="Show password"
            onClick={() => {
              setShowPass(!showPass);
            }}
          />
        </Form.Field>
        {error && (
          <Message negative>
            <MessageHeader>OOOPPPS! 🤕</MessageHeader>
            <p>{error}</p>
          </Message>
        )}
        {message && (
          <Message positive>
            <MessageHeader>{message} 🥳</MessageHeader>
            <p>You wil be redirect to the Login page</p>
          </Message>
        )}
        <Button
          onClick={() => {
            handleRegister();
          }}
          loading={loading}
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
