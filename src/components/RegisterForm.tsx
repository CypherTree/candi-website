import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import { sendOTP } from "../core/services/register.service";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../core/store/auth/authActions";

import { GetUserData, SetAuthenticated } from "../core/store/auth/authActions";

function RegisterForm(props: any) {
  console.log("props in ref form--", props);
  const dispatch = useDispatch();

  const [isOTPSent, setIsOTPSent] = useState(false);

  let counter = 60;

  const countdown = () => {
    if (counter > 0) {
      // so it doesn't go to -1
      const newCounter = counter - 1;
      counter = counter - 1;
      console.log("counter value : ", newCounter);
    } else {
      // clearInterval(timer);
      alert("You type X WPM");
    }
  };

  const setOTPTimeout = () => {
    setInterval(() => {
      countdown();
    }, 1000);
  };

  // setTimeout("alert('Hello')", 1000);

  const handleGetOTP = (phone: string) => {
    setIsOTPSent(true);
    alert("get otp called");
    // setOTPTimeout();
    sendOTP(phone);
  };

  // const handleResendOTP = () => {
  //   // setIsOTPSent(tr)
  //   alert("OTP resend");
  // };

  const redirectToDashboard = () => {
    setTimeout(() => {
      dispatch(SetAuthenticated(true));
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
                dispatch(
                  RegisterUser({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    email: data.email,
                    password: data.password,
                    phone_number: data.phone,
                    phone_number_extension: data.phone_number_extension,
                    otp: data.otp,
                  })
                );

                setSubmitting(false);
              }}
            >
              {({ values, isSubmitting, handleChange, handleBlur }) => (
                <Form>
                  <div>
                    <Field
                      placeholder="First Name"
                      name="firstName"
                      type="input"
                      as={TextField}
                    />
                  </div>

                  <div>
                    <Field
                      placeholder="Last Name"
                      name="lastName"
                      type="input"
                      as={TextField}
                    />
                  </div>
                  <div>
                    <Field
                      placeholder="Email "
                      name="email"
                      type="email"
                      as={TextField}
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <Field
                      placeholder="Password "
                      name="password"
                      type="password"
                      as={TextField}
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  <div>
                    <Field
                      placeholder="Re-enter Password"
                      name="password2"
                      type="password"
                      as={TextField}
                    />
                  </div>
                  <div>
                    <label htmlFor="Phone Extenstion">
                      Country Extension :{" "}
                    </label>
                    <Field
                      component="select"
                      id="category"
                      name="phone_number_extension"
                    >
                      <option value="+91">+91 - India</option>
                      <option value="+92">+92 - Pakistan</option>
                    </Field>
                  </div>
                  <div>
                    <Field
                      placeholder="Phone Number"
                      name="phone"
                      type="input"
                      as={TextField}
                    />
                    <Button
                      disabled={isOTPSent}
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={() => handleGetOTP(values.phone)}
                    >
                      {isOTPSent ? "RESEND OTP" : "GET OTP"}
                    </Button>
                  </div>
                  {isOTPSent && (
                    <>
                      <div>
                        <Typography color="primary">
                          Check your phone for OTP
                        </Typography>
                        Try again in {counter} secs.
                      </div>
                      <div>
                        <Field
                          placeholder="OTP"
                          name="otp"
                          type="number"
                          as={TextField}
                        />
                      </div>
                    </>
                  )}

                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </CardContent>
        {/* <CardActions>
          <Button type="submit">Register</Button>
        </CardActions> */}
      </Card>
    </div>
  );
}

export default RegisterForm;
