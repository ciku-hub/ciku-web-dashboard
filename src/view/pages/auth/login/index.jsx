import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { postRequest } from "../../../../utils/APIRequest";
import Header from "../header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // login 
  const login = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await postRequest("/auth/login", {
        "email": email,
        "password":password
      });

      notification.open({
        description: response.message,
        icon: <RiCheckboxCircleFill style={{ color: "#00F7BF" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon hp-text-color-black-80"
            size={24}
          />
        ),
      });
      // Redirect to /
      console.log(response);
    } catch (error) {
      console.error(error);
      notification.open({
        description: error.message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon hp-text-color-black-80"
            size={24}
          />
        ),
      });
    } finally {
      setLoading(false); // Set loading to false when request completes (whether success or error)
      setButtonDisabled(false);
    }
  };


  return (
    <Row className="hp-authentication-page hp-d-flex" style={{ flexDirection: "column" }}>
      
      <Col span={24}>
        <Header />
      </Col>

      <Col flex="1 0 0" className="hp-px-32">
        <Row className="hp-h-100 hp-m-auto" align="middle" style={{ maxWidth: 360 }}>
          <Col span={24}>
            <h1>Login</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Login to your Ciku Account
              </span>
              <Form layout="vertical" name="basic" className="hp-mt-sm-16 hp-mt-32">
              <Form.Item
                label="Email Address"
                name="Email Address"
                rules={[
                  { required: true, message: "Please input your Email Address!" },
                ]}
              >
                <Input
                  id="error"
                  placeholder={email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Link
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption hp-text-center"
                to="/auth/recover-password"
              >
                Forget Password?
              </Link>
              <Form.Item className="hp-mt-16 hp-mb-0">
                <Button block 
                type="primary" 
                htmlType="submit"
                onClick={login}
                loading={loading}
                disabled={buttonDisabled}>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <Col className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Don’t you have an account?
              </span>

              <Link
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                to="/auth/verification"
              >
                Create an account
              </Link>
            </Col>
          </Col>
        </Row>
      </Col>


    </Row>
  );
};