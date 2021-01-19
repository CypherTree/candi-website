import React, { useState } from "react";

import { Button, Card, Checkbox, Input, Typography, Form, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { LoginUser } from "../../core/redux/actions";
import { StateType } from "../../../app/core/redux/types";
import Title from "antd/lib/typography/Title";

const { Text } = Typography;

type Props = {
  loginUser: (username: string, password: string, rememberMe: boolean) => void;
  auth: any;
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const LoginForm: React.FC<Props> = ({ loginUser, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const error = auth.error ? auth.error : null;

  const handleFormSubmit = () => {
    loginUser(username, password, rememberMe);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleFormSubmit();
  };

  return (
    <Card
      title={<Title level={4}>Login</Title>}
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
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{
            width: "500px",
            paddingBottom: "0px",
          }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          {error !== null && (
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Text type="danger">{error}</Text>
            </Form.Item>
          )}

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox onChange={(e) => setRememberMe(e.target.value)}>
                Keep me logged in
              </Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>{" "}
            <Link to="/forgot-password">Forgot Password? </Link>
          </Form.Item>
          <Divider />
          <Form.Item style={{ marginBottom: "0px" }}>
            Not a Member? <Link to="/register">Sign Up</Link>
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
    loginUser: (username: string, password: string, rememberMe: boolean) =>
      dispatch(LoginUser(username, password, rememberMe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
