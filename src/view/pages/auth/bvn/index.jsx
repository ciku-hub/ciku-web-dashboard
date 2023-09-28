import React, {useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
  RiCloseFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from "react-icons/ri";
import { Row, Col, Form, Input, Button, notification } from "antd";

import { postRequest } from "../../../../utils/APIRequest";

export default function BvnVerification() {
  const history = useHistory();
  // Use the useLocation hook to access the location object
  const location = useLocation();
  // Retrieve the response data from the state object
  const responseData = location.state && location.state.response;
  
  const [bvn, setBVN] = useState("");

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Verify BVN - Ciku";
    // Function to enable or disable the button based on code and password values
    setButtonDisabled(!(bvn)); 
  }, [bvn]);
  

  // Verify BVN 
  const verifyBVN = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);

      const response = await postRequest("/user/bvn/verify", {
        "bvn":bvn
      }, responseData.data.token);

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
       // Redirect to /auth/bvn with response data
       console.log(response);
       //history.push("/auth/pin", { response: responseData });
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

      <Col flex="1 0 0" className="hp-px-32">
        <Row className="hp-h-100 hp-m-auto" align="middle" style={{ maxWidth: 400 }}>
          <Col span={24}>
            <h1>BVN Verification</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Verify your BVN to get NGN Bank Account issue for you.
            </span>

            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >
              <Form.Item 
              label="BVN"
              name="BVN"
              rules={[
                { required: true, message: "Please input your BVN!" },
                { pattern: /^[0-9]+$/, message: "Please enter a valid BVN (digits only)." },
              ]}>
                <Input
                  id="error"
                  placeholder="Enter your BVN"
                  value={bvn}
                  maxLength={11}
                  onChange={(e) => setBVN(e.target.value)}
                />
              </Form.Item>

      
              <Form.Item className="hp-mt-16 hp-mb-0">
                <Button block 
                type="primary" 
                htmlType="submit"
                onClick={verifyBVN}
                loading={loading}
                disabled={buttonDisabled}>
                  Verify BVN
                </Button>
              </Form.Item>
            </Form>

          </Col>
        </Row>
      </Col>

     
    </Row>
  );
}
