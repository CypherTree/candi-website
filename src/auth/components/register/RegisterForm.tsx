import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";

import { sendOTP } from "../../core/services/register";

import { connect } from "react-redux";

import { RegisterUser, SetAuthenticated } from "../../core/redux/actions";

function RegisterForm(props: any) {
  const { setAuthenticated, registerUser } = props;

  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isResendAllowed, setIsResendAllowed] = useState(false);

  let counter = 60;

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

  const handleGetOTP = (phone: string) => {
    setIsOTPSent(true);
    setIsResendAllowed(false);
    setOTPTimeout();
    sendOTPFunc(phone);
  };

  const sendOTPFunc = (phone: string) => {
    isOTPSent ? handleResendOTP(phone) : sendOTP(phone);
  };

  const handleResendOTP = (phone: string) => {
    countdown();
  };

  const redirectToDashboard = () => {
    setTimeout(() => {
      setAuthenticated(true);
    }, 1000);
  };

  return (
    <div>
      <Card>
        <CardHeader title="Registration Form"></CardHeader>
        <CardContent>
          {props.props.state.auth.hasOwnProperty("error") && (
            <Typography color="error" component="h5" variant="h5">
              {props.props.state.auth.error}
            </Typography>
          )}
          {props.props.state.auth.hasOwnProperty("success") ? (
            <Typography color="primary" component="h5" variant="h5">
              {props.props.state.auth.success}
              Redirecting to dashboard.
              {redirectToDashboard()}
            </Typography>
          ) : (
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                password2: "",
                phone: "",
                otp: "",
                phone_number_extension: "+91",
              }}
              validate={(values) => {
                const errors: any = {};
                if (!values.firstName) {
                  errors.firstName = "Required";
                }
                if (!values.lastName) {
                  errors.lastName = "Required";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                if (!values.password2) {
                  errors.password2 = "Required";
                }
                if (!values.otp) {
                  errors.otp = "Required";
                }
                if (!values.phone_number_extension) {
                  errors.phone_number_extension = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }

                return errors;
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                // make async call

                registerUser({
                  first_name: data.firstName,
                  last_name: data.lastName,
                  email: data.email,
                  password: data.password,
                  phone_number: data.phone,
                  phone_number_extension: data.phone_number_extension,
                  otp: data.otp,
                });

                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, handleChange, handleBlur }) => (
                <Form style={{ lineHeight: "3" }}>
                  <div>
                    <Field
                      placeholder="First Name"
                      name="firstName"
                      type="input"
                      as={TextField}
                      style={{ width: "400px" }}
                    />
                    <ErrorMessage name="firstName" component="div" />
                  </div>
                  <div>
                    <Field
                      placeholder="Last Name"
                      name="lastName"
                      type="input"
                      as={TextField}
                      style={{ width: "400px" }}
                    />
                    <ErrorMessage name="lastName" component="div" />
                  </div>
                  <div>
                    <Field
                      placeholder="Email "
                      name="email"
                      type="email"
                      as={TextField}
                      style={{ width: "400px" }}
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <Field
                      placeholder="Password "
                      name="password"
                      type="password"
                      as={TextField}
                      style={{ width: "400px" }}
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <div>
                    <Field
                      placeholder="Re-enter Password"
                      name="password2"
                      type="password"
                      as={TextField}
                      style={{ width: "400px" }}
                    />
                    <ErrorMessage name="password2" component="div" />
                  </div>
                  <div>
                    {/* <label htmlFor="Phone Extenstion">
                      Country Extension :{" "}
                    </label> */}
                    <Field
                      component="select"
                      id="category"
                      name="phone_number_extension"
                      style={{ width: "400px", height: "30px" }}
                    >
                      <option value="+91">+91 - India</option>
                      <option value="+92">+92 - Pakistan</option>
                    </Field>
                    <ErrorMessage
                      name="phone_number_extension"
                      component="div"
                    />
                  </div>
                  <div>
                    <Field
                      placeholder="Phone Number"
                      name="phone"
                      type="input"
                      as={TextField}
                      style={{ width: "250px" }}
                    />
                    {isOTPSent ? (
                      <Button
                        disabled={isOTPSent && !isResendAllowed}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => handleGetOTP(values.phone)}
                      >
                        RESEND OTP
                      </Button>
                    ) : (
                      <Button
                        disabled={isOTPSent}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => handleGetOTP(values.phone)}
                      >
                        GET OTP
                      </Button>
                    )}

                    <ErrorMessage name="phone" component="div" />
                  </div>
                  {isOTPSent && (
                    <>
                      <span>
                        <Typography color="primary">
                          Check your phone for OTP.
                          {!isResendAllowed && (
                            <div> Try again in {counter} secs. </div>
                          )}
                        </Typography>
                      </span>
                      <div>
                        <Field
                          placeholder="OTP"
                          name="otp"
                          type="number"
                          as={TextField}
                        />
                      </div>
                      <ErrorMessage name="otp" component="div" />
                    </>
                  )}
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ width: "400px" }}
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </CardContent>
        <CardActions
          style={{
            margin: "auto",
          }}
        >
          <div
            style={{
              margin: "auto",
            }}
          >
            Already a user ? <Link to="/login">Login </Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAuthenticated: () => dispatch(SetAuthenticated(true)),
    registerUser: (
      first_name: string,
      last_name: string,
      email: string,
      password: string,
      phone_number: string,
      phone_number_extension: string,
      otp: string
    ) =>
      dispatch(
        RegisterUser({
          first_name,
          last_name,
          email,
          password,
          phone_number,
          phone_number_extension,
          otp,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
