import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import Spinner from "../components/shared/Spinner";
import updateUserPassword from "../services/user.service";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { message } = useSelector((state) => state.message);

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = (e) => {

    setLoading(true);

    const passwords = {
      currentPassword,
      newPassword
    }

    updateUserPassword(passwords).then( ()=> {
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    });
  };


  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Change your password</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>Enter your current password and the new one to change your password.</p>
            </div>
          </div>

          <form className="col-md-8" onSubmit={handleSubmit(handleChangePassword)} method="post" noValidate>
            <div className="text-secondary fw-bold form-group ">
              <label for="currentPassword" className="d-flex justify-content-start">
                Current Password *
              </label>
              <input
                  {...register("currentPassword", { 
                    required: "Enter your current password",
                  })
                }
                name="currentPassword"
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={onChangeCurrentPassword}
              />
              {errors.currentPassword && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.currentPassword.message}</div>)}

            </div>

            <div className="text-secondary fw-bold form-group ">
              <label for="currentPassword" className="d-flex justify-content-start">
                New Password *
              </label>
              <input
                {...register("newPassword", { 
                  required: "Enter new password",
                })
              }
                name="newPassword"
                type="password"
                className="form-control"
                value={newPassword}
                onChange={onChangeNewPassword}
              />
                {errors.newPassword && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.newPassword.message}</div>)}

            </div>
            
            <div className="text-secondary fw-bold form-group ">
              <label for="confirmPassword" className="d-flex justify-content-start">
                Confirm Password
              </label>
              <input
                  {...register("confirmPassword", { 
                    required: "Enter new password",
                  })
                }
                name="confirmPassword"
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
                {errors.confirmPassword && (<div className="invalid-feedback d-flex justify-content-start fw-bold">{errors.confirmPassword.message}</div>)}
            </div>
              
              <button type="submit" 
              className="btn btn-primary mx-2"
              disabled={loading}>
                {loading && (
                <Spinner/>
              )}
              <span>Change Password</span>
            </button>
          </form>
          {message && (
            <div className="col-md-8">
              <div className="alert alert-danger my-3" role="alert">
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
