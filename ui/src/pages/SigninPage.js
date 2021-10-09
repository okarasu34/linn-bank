import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import { login } from "../store/actions/user";
import { Link } from "react-router-dom";

const SignInPage = (props) => {
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);

  const { register, handleSubmit, formState: { errors }} = useForm();

  const dispatch = useDispatch();

  const onChangeSsn = (e) => {
    setSsn(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {

    setLoading(true);

    dispatch(login(ssn, password))
      .then(() => {
        props.history.push("/profile");
        //window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Signin</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <form className="col-md-8" onSubmit={handleSubmit(handleLogin)} method="post" noValidate>
            <div className="text-secondary fw-bold form-group ">
              <label
                htmlFor="ssn"
                className="d-flex justify-content-start"
              >
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
                type="text"
                className={`${errors.ssn && errors.ssn.message && "is-invalid"} form-control`}
                placeholder="000-00-0000"
                value={ssn}
                onChange={onChangeSsn}
              />
              {errors.ssn && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.ssn.message}</div>)}
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                Password
              </label>
              <input
                {...register("password", { 
                    required: "Enter password",
                  })
                }
                name="password"
                type="password"
                className="form-control"
                placeholder="Your password"
                value={password}
                onChange={onChangePassword}
              />
              {errors.password && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.password.message}</div>)}

            </div>

            
            <button
              type="submit"
              className="btn btn-round mx-2 px-3"
              disabled={loading}
            >
              {loading && (
                <Spinner/>
              )}
              <span>Signin</span>
            </button>
          </form>
          {message && (
            <div className="col-md-8">
              <div className="alert alert-danger my-3" role="alert">
                {message}
              </div>
            </div>
          )}
          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>
                Did you forget your
                <span>
                  &nbsp; <b> password ?</b>
                </span>
              </p>
            </div>
          </div>

          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>
                You don't have an account yet?&nbsp;
                <span>
                  <b><Link to="register">Register a new account</Link></b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
