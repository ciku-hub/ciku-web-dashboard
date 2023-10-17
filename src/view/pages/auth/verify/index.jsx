import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";

import { Row, Col, Form, Input, Button, notification } from "antd";

import { postRequest } from "../../../../utils/APIRequest";


import Header from "../header";

export default function VerifyMail() {
  const history = useHistory(); // Initialize the useHistory hook

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  

  // Function to handle the email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail); // Update the email state with the input value

    // Enable or disable the button based on whether the email is empty
    setButtonDisabled(newEmail === "");
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

       // Redirect to /auth/verify with the email as a query parameter
       history.push(`/auth/verify?email=${email}`);
    
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
        <Row className="hp-m-auto" align="middle" style={{ maxWidth: 360 }}>
          <Col span={24}>
            <h1>Get Started</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Please provide your active email address
            </span>
            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >
            <Form.Item label="Email address:">
                <Input 
                id="error" 
                placeholder="Email"
                value={email}
                onChange={handleEmailChange} />
              </Form.Item>
            </Form>
            <Button block 
                type="primary" 
                shape="round"
                onClick={getVerificationCode}
                loading={loading}
                disabled={buttonDisabled}
                >
                Continue
            </Button>
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