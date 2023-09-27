import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";

import { Row, Col, Form, Input, Button, notification } from "antd";

import { postRequest } from "../../../../utils/APIRequest";

import Header from "../header";

export default function SignUp() {
  // Use the useLocation hook to access the location object
  const location = useLocation();

  // Retrieve the email from the location state (if available)
  const retrieveEmail = location.state && location.state.email;
  const [email, setEmail] = useState(retrieveEmail || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Function to handle the email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state with the input value
  };

  // get email verification code
  const getVerificationCode = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await postRequest("/verification/email/code", {
        email_address: email,
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
    <Row
      className="hp-authentication-page hp-d-flex"
      style={{ flexDirection: "column", overflow: "auto" }}
    >
      <Col span={24}>
        <Header />
      </Col>

      <Col flex="1 0 0" className="hp-px-32">
        <Row
          className="hp-h-100 hp-m-auto"
          align="middle"
          style={{ maxWidth: 360 }}
        >
          <Col span={24}>
            <h1>Register</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
              Complete your registration
            </span>
            <Form layout="vertical" name="basic" className="hp-mt-sm-16 hp-mt-32">
              <Form.Item
                label="Firstname"
                name="Firstname"
                rules={[
                  { required: true, message: "Please input your Firstname!" },
                ]}
              >
                <Input
                  id="error"
                  placeholder="Firstname"
                  value={firstname}
                  onChange={() => setFirstname(firstname)}
                />
              </Form.Item>

              <Form.Item
                label="Lastname"
                name="Lastname"
                rules={[
                  { required: true, message: "Please input your Lastname!" },
                ]}
              >
                <Input
                  id="error"
                  placeholder="Lastname"
                  value={lastname}
                  onChange={() => setLastname(lastname)}
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email Address!",
                  },
                ]}
              >
                <Input
                  id="error"
                  placeholder={email}
                  value={email}
                  disabled={true}
                  onChange={handleEmailChange}
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="Phone Number"
                rules={[
                  { required: true, message: "Please input your Phone Number!" },
                ]}
              >
                <Input
                  id="error"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={() => setPhoneNumber(phoneNumber)}
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
                  onChange={() => setpassword(password)}
                />
              </Form.Item>

              <Form.Item className="hp-mt-16 hp-mb-0">
                <Button block type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Already have an account?
              </span>

              <Link
                to="/"
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
              >
                Login
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
