import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "../store/actions/user";
import Spinner from "../components/shared/Spinner";

const UserInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const currentUser = useSelector((state) => state.user);
  const [user, setUser] = useState(currentUser.user);


  const { message } = useSelector((state) => state.message);
  const { register, handleSubmit, formState: { errors }} = useForm();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    //e.preventDefault();

    setLoading(true);
    setSuccessful(false);

    dispatch(updateUser(user))
      .then(() => {
        setLoading(false);
        setSuccessful(true);
      })
      .catch(() => {
        setLoading(false);
        setSuccessful(false);
      });
  };



  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>User settings for [{user && user.firstname}]</span>
          </h1>
        </div>
      </div>

        <div className="justify-content-center row">
        <div className="col-md-8">
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
        <form
              onSubmit={handleSubmit(handleUpdate)}
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
                  value={user && user.ssn}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.ssn && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.ssn.message}</div>)}

              </div>
              <div className={`${errors.firstName && errors.firstName.message && "text-danger"} form-group`}>
                <label
                  htmlFor="firstname"
                  className="d-flex justify-content-start fw-bold"
                >
                  First Name
                </label>
                <input
                    {...register("firstname", { 
                      required: "Enter first name"
                    })
                  }
                  name="firstname"
                  id="firstname"
                  type="text"
                  className={`is-touched is-pristine av-invalid ${errors.firstname && errors.firstname.message && "is-invalid"} form-control`}
                  value={user && user.firstname}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.firstname && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.firstname.message}</div>)}
              </div>
              <div className={`${errors.lastname && errors.lastname.message && "text-danger"} form-group`}>
                <label
                  htmlFor="lastname"
                  className="d-flex justify-content-start fw-bold"
                >
                  Last Name
                </label>
                <input
                {...register("lastname", { 
                  required: "Enter last name"
                })
              }
                  name="lastname"
                  id="lastname"
                  type="text"
                  className={`is-touched is-pristine av-invalid ${errors.lastname && errors.lastname.message && "is-invalid"} form-control`}
                  value={user && user.lastname}
                  onChange={(e) => handleChange(e)}
                  
                />
                {errors.lastname && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.lastname.message}</div>)}

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
                  value={user && user.address}
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
                  value={user && user.mobilePhoneNumber}
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
                  value={user && user.email}
                  onChange={(e) => handleChange(e)}
                />
                {errors.email && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.email.message}</div>)}
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
                <span>Update</span>
              </button>
              
            </form>
          
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
