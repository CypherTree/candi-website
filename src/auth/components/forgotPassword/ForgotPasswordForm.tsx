import React, { useEffect, useState } from "react";

import { Button, Card, Input, Typography, Form, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { ClearState, ForgotPassword } from "../../core/redux/actions";
import { StateType } from "../../../app/core/redux/types";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type Props = {
  forgotPassword: (email: string) => void;
  clearState: () => void;
  auth: AuthProps;
};

const ForgotPasswordForm: React.FC<Props> = ({
  forgotPassword,
  clearState,
  auth,
}) => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<boolean | string>("");

  useEffect(() => {
    auth && auth.success ? setStatus(auth.success) : setStatus("");
  }, [auth, status]);

  useEffect(() => {
    // to clear any previous error
    clearState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = () => {
    forgotPassword(email);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleFormSubmit();
  };

  return (
    <Card title={<Title level={4}>Forgot Password</Title>}>
      {auth.hasOwnProperty("success") ? (
        <>
          <Text>{auth.message}</Text>
          <br />
          <Link to="/login">Continue to login </Link>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            paddingBottom: "0px",
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
              name="email"
              rules={[{ required: true, message: "Please enter your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Get password reset link
              </Button>{" "}
            </Form.Item>
            <Divider />
            <Form.Item style={{ marginBottom: "0px" }}>
              <div>
                Already a user? <Link to="/login">Go to login </Link>
              </div>

              <div>
                Not a member? <Link to="/register">Sign Up</Link>
              </div>
            </Form.Item>

            {auth && auth.hasOwnProperty("success") && auth.success === true ? (
              <Text type="secondary">{auth.message}</Text>
            ) : (
              <Text type="warning">{auth.message}</Text>
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
    clearState: () => dispatch(ClearState()),
    forgotPassword: (email: string) => dispatch(ForgotPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
