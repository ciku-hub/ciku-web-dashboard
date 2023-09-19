import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Form, Input, Button, Checkbox } from "antd";

import LeftContent from "../leftContent";
import Footer from "../footer";

export default function Login() {
  return (
    <Row gutter={[32, 0]} className="hp-authentication-page">
      <LeftContent />

      <Col lg={12} span={24} className="hp-py-sm-0 hp-py-md-64">
        <Row className="hp-h-100" align="middle" justify="center">
          <Col
            xxl={11}
            xl={15}
            lg={20}
            md={20}
            sm={24}
            className="hp-px-sm-8 hp-pt-24 hp-pb-48"
          >
            <h1 className="hp-mb-sm-0">Login</h1>
            <p className="hp-mt-sm-0 hp-mt-8 hp-text-color-black-60">
              Welcome back, please login to your account.
            </p>

            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              className="hp-mt-sm-16 hp-mt-32"
            >
              <Form.Item label="Username :" className="hp-mb-16">
                <Input id="error" />
              </Form.Item>

              <Form.Item label="Password :" className="hp-mb-8">
                <Input.Password id="warning2" />
              </Form.Item>

              <Row align="middle" justify="space-between">
                <Form.Item className="hp-mb-0">
                  <Checkbox name="remember">Remember me</Checkbox>
                </Form.Item>

                <Link
                  className="hp-button hp-text-color-black-80 hp-text-color-dark-40"
                  to="/pages/authentication/recover-password"
                >
                  Forgot Password?
                </Link>
              </Row>

              <Form.Item className="hp-mt-16 hp-mb-8">
                <Link to="/">
                  <Button block type="primary" htmlType="submit">
                    Sign in
                  </Button>
                </Link>
              </Form.Item>
            </Form>

            <Col className="hp-form-info hp-text-center">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Don’t you have an account?
              </span>

              <Link
                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                to="/pages/authentication/register"
              >
                Create an account
              </Link>
            </Col>

            <Footer />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};