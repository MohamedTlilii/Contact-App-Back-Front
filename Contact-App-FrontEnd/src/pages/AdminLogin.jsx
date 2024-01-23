import React, { useState } from "react";
import { Button, Form, Checkbox } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MessageHeader, Message } from "semantic-ui-react";
function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    axios
      .post(
        "https://contactapp-api-uas9.onrender.com/api/admin/login",
        loginData
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("isAdmin", res.data.data.isAdmin);
        setTimeout(() => {
          setLoading(false);
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        setError(err.response.data.error);
        setTimeout(() => {
          setError("");
        }, 8000);
      });
  };
  return (
    <div className="md:px-[200px] md:py-[135px]">
      <Form
        size="large"
        className="border-2 border-slate-300 md:w-[60%] md:m-auto p-12 rounded-2xl"
        onChange={(e) => {
          setLoginData({ ...loginData, [e.target.name]: e.target.value });
        }}
      >
        <h1>Login.</h1>
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

        <Button
          onClick={() => {
            handleLogin();
          }}
          loading={loading}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
