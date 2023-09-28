import React, { useState } from "react";
import { Link, useLocation,  useHistory } from "react-router-dom";
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
  const history = useHistory();

  // Retrieve the email from the location state (if available)
  const retrieveEmail = location.state && location.state.email;
  const [email, setEmail] = useState(retrieveEmail || "");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Function to handle the email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state with the input value
  };

  // complete Registration
  const completeRegistration = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await postRequest("/auth/register", {
        "firstname": firstname,
        "lastname":lastname,
        "phone_number":phoneNumber,
        "email": email,
        "password":password
      });

      notification.open({
        description: "Succesfully Register, you can now login",
        icon: <RiCheckboxCircleFill style={{ color: "#00F7BF" }} />,
        closeIcon: (
          <RiCloseFill
            className="remix-icon hp-text-color-black-80"
            size={24}
          />
        ),
      });
      // Redirect to /
      history.push("/");
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
                  onChange={(e) => setFirstname(e.target.value)}
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
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
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
                  // { pattern: /^[0-9]+$/, message: "Please enter a valid phone number (digits only)." },
                ]}
              >
                <Input
                  id="error"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  maxLength={11}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                    setPhoneNumber(input);
                  }}
                />
              </Form.Item>


              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  // { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit." },
                ]}
              >
                <Input.Password
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item className="hp-mt-16 hp-mb-0">
                <Button block 
                type="primary" 
                htmlType="submit"
                onClick={completeRegistration}
                loading={loading}
                disabled={buttonDisabled}>
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
