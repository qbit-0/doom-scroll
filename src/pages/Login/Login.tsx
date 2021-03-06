import { setUserToken } from "features/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

const REDDIT_AUTH_URL = "https://www.reddit.com/api/v1/authorize";

const CLIENT_ID = "LAo7rLD7LwxNjuyP3V5-1w";
const TOKEN_RESPONSE_TYPE = "token";
const REDIRECT_URI = "http://localhost:3000/login";
const SCOPE = "read";

const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const params = new URLSearchParams(location.hash);
    const accessToken = params.get("#access_token");

    if (accessToken !== null) {
        dispatch(setUserToken(accessToken));
        return <Navigate to="/" />;
    } else {
        const randomString = uuid();
        const url = new URL(REDDIT_AUTH_URL);
        url.searchParams.append("client_id", CLIENT_ID);
        url.searchParams.append("response_type", TOKEN_RESPONSE_TYPE);
        url.searchParams.append("state", randomString);
        url.searchParams.append("redirect_uri", REDIRECT_URI);
        url.searchParams.append("scope", SCOPE);

        window.location.href = url.toString();
        return <></>;
    }
};

export default Login;
