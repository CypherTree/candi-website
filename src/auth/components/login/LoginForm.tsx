import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   TextField,
//   CardActions,
//   Button,
//   Typography,
//   Checkbox,
//   InputAdornment,
//   IconButton,
// } from "@material-ui/core";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { Visibility, VisibilityOff } from "@material-ui/icons";

import { LoginUser } from "../../core/redux/actions";

import { StateType } from "../../../app/core/redux/types";

import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
  Form,
  Layout,
  Divider,
} from "antd";

// import Login from "ant-design-pro/lib/Login";

import { Alert } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";

const { Text } = Typography;

// const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

type Props = {
  loginUser: (username: string, password: string, rememberMe: boolean) => void;
  auth: any;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const LoginForm: React.FC<Props> = ({ loginUser, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const error = auth.error ? auth.error : null;

  const handleFormSubmit = () => {
    loginUser(username, password, rememberMe);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    handleFormSubmit();
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    handleFormSubmit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // const onFinish = (values: any) => {
  //   console.log('Received values of form: ', values);
  // };

  return (
    <Card
      // style={{
      //   backgroundColor: "#fff",
      //   // height: "500px",
      //   // padding: "20px",
      // }}
      title={<Text>Login</Text>}
      // style={{ justifyContent: "center", backgroundColor: "yellow" }}
    >
      <div
        style={{
          // width: "500px",
          display: "flex",
          // backgroundColor: "green",
          justifyContent: "center",
          // alignContent: "center",
          // alignItems: "center",
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

            // backgroundColor: "red",
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
              <Checkbox>Keep me logged in</Checkbox>
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
            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            <Link to="/forgot-password">Forgot Password? </Link>
          </Form.Item>
          <Form.Item>
            Not a Member?{" "}
            {/* <a className="login-form-forgot" href="">
              Register Now
            </a> */}
            <Link to="/register">Sign Up</Link>
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
