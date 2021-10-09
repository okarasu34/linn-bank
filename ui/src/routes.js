import React, { useEffect } from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import { SET_MESSAGE } from "./store/actions/types";

import HomePage from "./pages/HomePage";
import LoansPage from "./pages/LoansPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import RegisterPage from "./pages/RegisterPage";
import SigninPage from "./pages/SigninPage";
import UserInfoPage from "./pages/UserInfoPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


function Routes(props) {
    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("*", location.pathname);
        dispatch({
            type: SET_MESSAGE,
            payload: '',
        });
    },[location])

    return (
        <>
            <Switch>
                <Route path="/reset-password" component={ResetPasswordPage} />
                <Route path="/change-password" component={ChangePasswordPage} />
                <Route path="/userinfo" component={UserInfoPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/signin" component={SigninPage} />
                <Route path="/loans" component={LoansPage} />
                <Route path="/about" component={AboutUsPage} />
                <Route path="/services" component={ServicesPage} />
                <Route path="/contact" component={ContactPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </>
    );
}

export default Routes