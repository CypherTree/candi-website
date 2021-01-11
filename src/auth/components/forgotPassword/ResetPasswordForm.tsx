import React, { useEffect, useState } from "react";

import { Button, Card, Input, Typography, Form, Divider } from "antd";
import { LockOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { ResetPassword } from "../../core/redux/actions";
import { StateType } from "../../../app/core/redux/types";

const { Text } = Typography;

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type Props = {
  resetPassword: (resetToken: string, password: string) => void;
  auth: AuthProps;
  token: string;
};

const ResetPasswordForm: React.FC<Props> = ({ resetPassword, token, auth }) => {
  const resetToken = token;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFormSubmit = () => {
    if (password === password2) {
      resetPassword(resetToken, password);
    }
  };

  useEffect(() => {
    if (password === password2) {
      setPasswordError("");
    } else {
      setPasswordError("Entered Passwords do not match.");
    }
  }, [password2, password]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleFormSubmit();
  };

  return (
    <Card title={<Text>Reset Password</Text>}>
      {auth.hasOwnProperty("success") ? (
        <>
          <Text>{auth.message}</Text>
          <Link to="/login">Continue to login </Link>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{
              width: "500px",
            }}
          >
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="password2"
              rules={[
                { required: true, message: "Please re-enter your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Re-enter Password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Reset Password
              </Button>{" "}
            </Form.Item>
            <Divider />
            <div>
              Already a user? <Link to="/login">Go to login </Link>
            </div>
            <br />
            <div>
              Not a member? <Link to="/register">Sign Up</Link>
            </div>
            <br />

            {passwordError && <Text type="danger"> {passwordError}</Text>}

            {auth.success ? (
              <Text type="success">{auth.message}</Text>
            ) : (
              <Text type="danger">{auth.message}</Text>
            )}
          </Form>
        </div>
      )}
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
    resetPassword: (resetToken: string, password: string) =>
      dispatch(ResetPassword(resetToken, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
