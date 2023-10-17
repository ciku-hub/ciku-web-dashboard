import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation  } from "react-router-dom";
import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Row, Col, Form, Input, Button, notification } from "antd";
import { postRequest } from "../../../../utils/APIRequest";
import Header from "../header";

export default function VerifyMail() {
    const location = useLocation();
    const history = useHistory();


    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const emailParam = searchParams.get("email");
  
      if (emailParam) {
        setEmail(emailParam);
      }
    }, [location]);

  
  // Function to handle the email input change
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode); // Update the email state with the input value

    // Enable or disable the button based 
    setButtonDisabled(newCode === "");
  };

  // get email verification code
  const verifyEmail = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true); 

      const response = await postRequest('/verify/email', {  
        "code":  code,
        "email_address": email
    });
    
      notification.open({
        description: response.message,
        icon: <RiCheckboxCircleFill style={{ color: "#00F7BF" }} />,
        closeIcon: (
          <RiCloseFill className="remix-icon hp-text-color-black-80" size={24} />
        ),
      });
      
       // Redirect to /auth/register
       history.push("/auth/register", { email });
    
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
            <h1>Verify Email</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Kindly enter the code sent to your mail
            </span>
            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >
            <Form.Item label="Verification Code:">
                <Input 
                id="error" 
                placeholder="Enter verification Code"
                value={code}
                onChange={handleCodeChange} />
              </Form.Item>
            </Form>
            <Button block 
            shape="round"
                type="primary" 
                onClick={verifyEmail}
                loading={loading}
                disabled={buttonDisabled}
                >
                Continue
            </Button>
            <div className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Didn't receive code?
              </span>

              <Link
                to="/"
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
              >
                Resend
              </Link>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};