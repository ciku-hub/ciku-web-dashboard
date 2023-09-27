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

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);

  const [stepEmail, setStepEmail] = useState(false)
  const [stepPassword, setStepPassword] = useState(false)
  const [stepPasswordConfirm, setStepPasswordConfirm] = useState(false)

  // Function to handle the email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state with the input value
  };

  // get email verification code
  const getVerificationCode = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true); 

      const response = await postRequest('/verification/email/code', {  
        "email_address": email });
      
      notification.open({
        description: response.message,
        icon: <RiCheckboxCircleFill style={{ color: "#00F7BF" }} />,
        closeIcon: (
          <RiCloseFill className="remix-icon hp-text-color-black-80" size={24} />
        ),
      });
      setStepEmail(true);
      setEmailDisabled(true);
    } catch (error) {
      console.error(error);
      notification.open({
        description: error.message,
        icon: <RiErrorWarningFill style={{ color: "#FF0022" }} />,
        closeIcon: (
          <RiCloseFill className="remix-icon hp-text-color-black-80" size={24} />
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
            <h1>Register</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
              Complete your registration
            </span>
            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >
              <Form.Item label="Firstname:">
                <Input 
                id="error" 
                placeholder="Firstname"
                value={email} // Bind the input value to the email state
                disabled={emailDisabled}
                onChange={handleEmailChange} />
              </Form.Item>

              <Form.Item label="Lastname:">
                <Input 
                id="error" 
                placeholder="Lastname"
                value={email} // Bind the input value to the email state
                disabled={emailDisabled}
                onChange={handleEmailChange} />
              </Form.Item>
             
              <Form.Item label="Email Address:">
                <Input 
                id="error" 
                placeholder="Email Address"
                value={email} // Bind the input value to the email state
                disabled={emailDisabled}
                onChange={handleEmailChange} />
              </Form.Item>
             
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
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
};