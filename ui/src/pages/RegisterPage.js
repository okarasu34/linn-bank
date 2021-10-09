import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/user";
import { useForm } from "react-hook-form";
import Spinner from "../components/shared/Spinner";

import "./RegisterPage.css";

const RegisterPage = () => {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobilePhoneNumber: "",
    ssn: "",
    address: "",
    password: "",
    secondPassword:""
  });
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  
  const { register, handleSubmit, formState: { errors }} = useForm();

  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };




  const handleRegister = (e) => {
    //e.preventDefault();

    setSuccessful(false);
    setLoading(true);


    dispatch(registerUser(user))
      .then(() => {
        setSuccessful(true);
        setLoading(false);

      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);

      });
  };

  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Registration</span>
          </h1>
        </div>
      </div>

      <div className="justify-content-center row">
        <div className="col-md-8">
          {!successful && (
            <form
              onSubmit={handleSubmit(handleRegister)}
              noValidate
              id="register-form"
              method="post"
              className="av-invalid"
            >
              <div className="form-group">
                <label
                  htmlFor="ssn">
                  SSN
                </label>
                <input
                  {...register("ssn", { 
                      required: "Enter a valid ssn",
                      pattern: {
                          value: /[0-9]{3}-[0-9]{2}-[0-9]{4}$/i,
                          message: "Enter a valid ssn"
                      } 
                  })} 
                  name="ssn"
                  placeholder="000-00-0000"
                  id="ssn"
                  type="text"
                  className={`${errors.ssn && errors.ssn.message && "is-invalid"} form-control`}
                  value={user.ssn}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.ssn && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.ssn.message}</div>)}

              </div>
              <div className={`${errors.firstName && errors.firstName.message && "text-danger"} form-group`}>
                <label
                  htmlFor="firstName"
                  className="d-flex justify-content-start fw-bold"
                >
                  First Name
                </label>
                <input
                    {...register("firstName", { 
                      required: "Enter first name"
                    })
                  }
                  name="firstName"
                  id="firstName"
                  type="text"
                  className={`is-touched is-pristine av-invalid ${errors.firstName && errors.firstName.message && "is-invalid"} form-control`}
                  value={user.firstName}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.firstName && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.firstName.message}</div>)}
              </div>
              <div className={`${errors.lastName && errors.lastName.message && "text-danger"} form-group`}>
                <label
                  htmlFor="lastName"
                  className="d-flex justify-content-start fw-bold"
                >
                  Last Name
                </label>
                <input
                {...register("lastName", { 
                  required: "Enter last name"
                })
              }
                  name="lastName"
                  id="lastName"
                  type="text"
                  className={`is-touched is-pristine av-invalid ${errors.lastName && errors.lastName.message && "is-invalid"} form-control`}
                  value={user.lastName}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.lastName && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.lastName.message}</div>)}

              </div>

              <div className={`${errors.address && errors.address.message && "text-danger"} form-group`}>
                <label
                  htmlFor="address"
                  className="d-flex justify-content-start fw-bold"
                >
                  Address
                </label>
                <input
                {...register("address", { 
                  required: "Enter address"
                })
              }
                  name="address"
                  id="address"
                  type="text"
                  className={`is-touched is-pristine av-invalid ${errors.address && errors.address.message && "is-invalid"} form-control`}
                  value={user.address}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.address && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.address.message}</div>)}
              </div>
              <div className={`${errors.mobilePhoneNumber && errors.mobilePhoneNumber.message && "text-danger"} form-group`}>
                <label
                  htmlFor="mobilePhoneNumber"
                  className="d-flex justify-content-start fw-bold"
                >
                  Mobile Phone Number
                </label>
                <input
                {...register("mobilePhoneNumber", { 
                  required: "Enter phone number"
                })
              }
                  name="mobilePhoneNumber"
                  placeholder="000-000-0000"
                  id="mobilePhoneNumber"
                  type="text"
                  className={`is-touched is-pristine av-invalid ${errors.mobilePhoneNumber && errors.mobilePhoneNumber.message && "is-invalid"} form-control`}
                  value={user.mobilePhoneNumber}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.mobilePhoneNumber && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.mobilePhoneNumber.message}</div>)}
              </div>
              
              <div className={`${errors.email && errors.email.message && "text-danger"} form-group`}>
                <label
                  htmlFor="email"
                  className="d-flex justify-content-start fw-bold"
                >
                  Email
                </label>
                <input
                {...register("email", { 
                  required: "Enter email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email address"
                } 
                })
              }
              
                  name="email"
                  placeholder="Your email"
                  id="email"
                  type="email"
                  className={`is-touched is-pristine av-invalid ${errors.email && errors.email.message && "is-invalid"} form-control`}
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
                {errors.email && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.email.message}</div>)}
              </div>
              <div className={`${errors.password && errors.password.message && "text-danger"} form-group`}>
                <label
                  htmlFor="password"
                  className="d-flex justify-content-start fw-bold"
                >
                  New password
                </label>
                <input
                {...register("password", { 
                  required: "Enter password",
                  minLength: {
                    value:5,
                    message: "Password has to be at least 5 characters length"
                  }
                })
              }
                  name="password"
                  placeholder="New password"
                  id="password"
                  type="password"
                  className={`is-touched is-pristine av-invalid ${errors.password && errors.password.message && "is-invalid"} form-control`}
                  value={user.password}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.password && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.password.message}</div>)}
              </div>
              <div id="strength">
                <small>
                  <span>Password strength:</span>
                </small>
                <ul id="strengthBar w-25">
                  <li
                    className="point"
                    style={{ backgroundColor: "#FF0000" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#99FF00" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#99FF00" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#99FF00" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#DDDDDD" }}
                  ></li>
                </ul>
              </div>
              <div className={`${errors.secondPassword && errors.secondPassword.message && "text-danger"} form-group`}>
                <label
                  htmlFor="secondPassword"
                  className="d-flex justify-content-start fw-bold"
                >
                  New password confirmation
                </label>
                <input
                  {...register("secondPassword", { 
                    validate: value => value === user.password || 'Password fields don`t match'
                  })
                  }                  
                  name="secondPassword"
                  placeholder="Confirm the new password"
                  id="secondPassword"
                  type="password"
                  className={`is-touched is-pristine av-invalid ${errors.secondPassword && errors.secondPassword.message && "is-invalid"} form-control`}
                  value={user.secondPassword}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.secondPassword && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.secondPassword.message}</div>)}
              </div>
              

              <button
                type="submit"
                id="register-submit"
                className="btn btn-round"
                disabled={loading}
              >
                {loading && (
                <Spinner/>
              )}
                <span>Register</span>
              </button>
              
            </form>
          
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

          <p>&nbsp;</p>

          <div
            className="alert alert-warning fade show d-flex justify-content-center my-3 mx-3 w-75"
            role="alert"
          >
            <p className="d-flex flex-start ">
              <span>
                If you want to sign in, you can try the default accounts:
              </span>
              <br />
              <span>- Administrator (login="admin" and password="admin")</span>
              <br />
              <span>- User(login="user" and password="user").</span>
            </p>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default RegisterPage;
