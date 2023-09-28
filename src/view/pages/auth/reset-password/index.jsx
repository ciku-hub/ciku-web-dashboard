import React, { useState, useEffect } from "react";
import { Link, useLocation,  useHistory } from "react-router-dom";
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";

import { Row, Col, Form, Input, Button, notification } from "antd";

import { putRequest } from "../../../../utils/APIRequest";

import Header from "../header";


export default function ResetPassword() {
  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Reset Password - Ciku";
  }, []);

  const location = useLocation();
  const history = useHistory();
  
  // Retrieve the email from the location state (if available)
  const retrieveEmail = location.state && location.state.email;
  const [email, setEmail] = useState(retrieveEmail || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

   // Function to enable or disable the button based on code and password values
  useEffect(() => {
    setButtonDisabled(!(code && password)); 
  }, [code, password]);

  // Reset Password 
  const resetPassword = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await putRequest("/auth/password/reset", {
        "reset_code":code,
        "email": email,
        "new_password": password
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
    <Row className="hp-authentication-page hp-d-flex" style={{ flexDirection: "column", overflow: "auto"  }}>

      <Col span={24}>
        <Header />
      </Col>

      <Col flex="1 0 0" className="hp-px-32">
        <Row className="hp-h-100 hp-m-auto" align="middle" style={{ maxWidth: 360 }}>
          <Col span={24}>
            <h1>Reset Password</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Provide code sent to your mail to reset password
            </span>

            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >

              <Form.Item 
                label="Code"
                name="Code"
                rules={[
                  { required: true, message: "Please input your Code!" },
                ]}>
                <Input
                  id="error"
                  placeholder="Enter Code"
                  value={email}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Item>
      
              <Form.Item
                label="New Password"
                name="New password"
                rules={[
                  { required: true, message: "Please input your new password!" },
                  { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit." },
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
                onClick={resetPassword}
                loading={loading}
                disabled={buttonDisabled}>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>


            <div className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Go back to
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
