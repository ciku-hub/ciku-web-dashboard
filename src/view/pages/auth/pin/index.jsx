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

export default function CreatePin() {
    const location = useLocation();
    const history = useHistory();
    const token =  localStorage.getItem('token');

    const [email, setEmail] = useState("");
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const emailParam = searchParams.get("email");
  
      if (emailParam) {
        setEmail(emailParam);
      }
    }, [location]);

  
  const handlePinChange = (e) => {
    const newpin = e.target.value;
    setPin(newpin);
    setButtonDisabled(newpin === "");
  };

  const handleConfirmPinChange = (e) => {
    const newpin = e.target.value;
    setConfirmPin(newpin);
    setButtonDisabled(newpin === "");
  };

  // get email verification code
  const createPin = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true); 

      const response = await postRequest('/user/pin/create', {  
        "pin":  pin,
        "confirm_pin": confirmPin
    }, token);
    
      notification.open({
        description: response.message,
        icon: <RiCheckboxCircleFill style={{ color: "#00F7BF" }} />,
        closeIcon: (
          <RiCloseFill className="remix-icon hp-text-color-black-80" size={24} />
        ),
      });

      console.log({response});
      if (response.success) {
        history.push("/main/dashboard/analytics");
      }
       // Redirect to /auth/register
       // history.push("/auth/register", { email });
    
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
            <h1>Create New Pin</h1>
            <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Kindly enter the code sent to your mail
            </span>
            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >
            <Form.Item label="New Pin">
                <Input 
                id="newpin" 
                placeholder="Input 4 digit pin"
                value={pin}
                maxLength={4}
                onChange={handlePinChange} />
              </Form.Item>
            </Form>
            <Form
              layout="vertical"
              name="basic"
              className="hp-mt-sm-16 hp-mt-32"
            >

            <Form.Item label="Confirm Pin">
                <Input 
                id="confrimPin" 
                placeholder="Enter pin again"
                maxLength={4}
                value={confirmPin}
                onChange={handleConfirmPinChange} />
              </Form.Item>
            </Form>



            <Button block 
            shape="round"
                type="primary" 
                onClick={createPin}
                loading={loading}
                disabled={buttonDisabled}
                >
                Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};