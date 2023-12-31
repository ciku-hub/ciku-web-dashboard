import React, {useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Row, Col, Form, Input, Button, notification } from "antd";

import { postRequest } from "../../../../utils/APIRequest";
import Header from "../header";

export default function RecoverPassword() {
  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Recover Password - Ciku";
  }, []);

  const history = useHistory();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  // Function to handle the email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail); // Update the email state with the input value

    // Enable or disable the button based on whether the email is empty
    setButtonDisabled(newEmail === "");
  };

  // Recover Password 
  const recoverPassword = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await postRequest("/auth/password/reset-instruction", {
        "email": email
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
      // Redirect to /auth/reset-password
      history.push("/auth/reset-password", { email });
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
        <Row className="hp-h-100 hp-m-auto" align="middle" style={{ maxWidth: 400 }}>
          <Col span={24}>
            <h1>Recover Password</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Provide your email to reset your password.
            </span>

            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >
              <Form.Item 
              label="Email Address:"
              name="Email Address"
              rules={[
                { required: true, message: "Please input your Email Address!" },
              ]}>
                <Input
                  id="error"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Item>

      
              <Form.Item className="hp-mt-16 hp-mb-0">
                <Button block 
                type="primary" 
                htmlType="submit"
                onClick={recoverPassword}
                loading={loading}
                disabled={buttonDisabled}>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>

            <div className="hp-form-info hp-text-center">
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
