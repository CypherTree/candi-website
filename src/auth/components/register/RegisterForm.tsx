import React, { useState } from "react";

import { Button, Card, Input, Typography, Form, Divider, Row, Col } from "antd";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { sendOTP } from "../../core/services/register";
import { RegisterUser, SetAuthenticated } from "../../core/redux/actions";
import { StateType } from "../../../app/core/redux/types";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  phone_number_extension: string;
  otp: string;
}

type Props = {
  setAuthenticated: (value?: boolean) => void;
  registerUser: (registerData: RegisterData) => void;
  auth: AuthProps;
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const RegisterForm: React.FC<Props> = ({
  setAuthenticated,
  registerUser,
  auth,
}) => {
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOTP] = useState("");

  const [otpError, setOTPError] = useState("");

  let counter = 15;

  const registerError = auth.error;

  let otpCountdown: any;

  const countdown = () => {};

  const setOTPTimeout = () => {
    otpCountdown = setInterval(() => {
      if (counter > 0) {
        const newCounter = counter - 1;
        counter = counter - 1;
        console.log("counter value : ", newCounter);
      } else {
        counter = 11;
        setIsResendAllowed(true);
        clearInterval(otpCountdown);
        return;
      }
    }, 1000);
  };

  const handleGetOTP = () => {
    if (phone && phone.length === 10 && Number.isInteger(parseInt(phone))) {
      setIsOTPSent(true);
      setIsResendAllowed(false);
      setOTPTimeout();
      sendOTPFunc();
      setOTPError("");
    } else {
      setOTPError("OTP could not be sent.");
      console.log("error in sending OTP ", otpError);
    }
  };

  const sendOTPFunc = () => {
    isOTPSent ? handleResendOTP(phone) : sendOTP(phone);
  };

  const handleResendOTP = (phone: string) => {
    countdown();
  };

  type valuesType = {
    firstName?: string;
    lastName?: string;
    password?: string;
    password2?: string;
    otp?: string;
    phone_number_extension?: string;
    email?: string;
  };

  const validationCheck = () => {
    const errors: any = {};

    if (!firstName) {
      errors.firstName = "Required";
    }
    if (!lastName) {
      errors.lastName = "Required";
    }
    if (!password) {
      errors.password = "Required";
    }
    if (!password2) {
      errors.password2 = "Required";
    }
    if (!otp) {
      errors.otp = "Required";
    }

    if (!email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const onFinish = (values: any) => {
    const errors = validationCheck();

    if (Object.keys(errors).length === 0) {
      values.phone_number_extension = "+91";
      registerUser(values);
    } else {
      console.log("Errors", errors);
    }
  };

  return (
    <Card
      title={<Title level={4}>Register </Title>}
      style={{ paddingBottom: "0px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "20px",
          paddingBottom: "0px",
        }}
      >
        <Form
          name="normal_signup"
          className="signup-form"
          initialValues={{}}
          onFinish={onFinish}
          style={{
            width: "500px",
            paddingBottom: "0px",
          }}
        >
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: "Please enter your First Name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[
              { required: true, message: "Please enter your Last Name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password2"
            rules={[
              { required: true, message: "Please re-enter your Password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              { required: true, message: "Please enter your Phone number!" },
            ]}
          >
            <Row gutter={8}>
              <Col span={5}>
                <Input defaultValue="+91" disabled={true} />
              </Col>
              <Col span={19}>
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Phone number"
                  maxLength={10}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Item>

          {isOTPSent ? (
            <>
              <Row gutter={8}>
                <Col span={18}>
                  <Form.Item
                    name="otp"
                    rules={[
                      { required: true, message: "Please enter valid OTP" },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Enter OTP"
                      maxLength={6}
                      onChange={(e) => setOTP(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button
                    disabled={!isResendAllowed}
                    type="primary"
                    onClick={() => handleGetOTP()}
                  >
                    Resend OTP
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row gutter={8}>
                <Col span={18}>
                  <Form.Item
                    name="otp"
                    rules={[
                      { required: true, message: "Please enter valid OTP" },
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Enter OTP"
                      maxLength={6}
                      onChange={(e) => setOTP(e.target.value)}
                      disabled={true}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Button
                    disabled={isOTPSent}
                    type="primary"
                    onClick={() => handleGetOTP()}
                    style={{ width: "100%" }}
                  >
                    GET OTP
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {isOTPSent && (
            <Text>
              Check your phone for OTP.
              {!isResendAllowed && (
                <div> You can resend OTP in {counter} secs. </div>
              )}
            </Text>
          )}
          {otpError && (
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Text type="danger">{otpError}</Text>
            </Form.Item>
          )}
          {registerError && (
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Text type="danger">{registerError}</Text>
            </Form.Item>
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              Sign Up
            </Button>{" "}
          </Form.Item>
          <Divider />
          <Form.Item style={{ marginBottom: "0px" }}>
            Already a Member? <Link to="/login">Login</Link>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setAuthenticated: () => dispatch(SetAuthenticated(true)),
    registerUser: (registerData: RegisterData) =>
      dispatch(RegisterUser(registerData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
