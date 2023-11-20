import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SigninPage.scss";
import { useState, useEffect, useContext } from "react";
import { USER_SIGNIN } from "../context/reducerActions";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect"); //Current locations URL
  const redirect = redirectInURL ? redirectInURL : "/browse";

  const { userInfo, dispatch } = useContext(authContext);

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/users/signin", { email, password });
      dispatch({ type: USER_SIGNIN, payload: data });
      navigate(redirect);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-header">
          <div className="signup-img-container">
            <img src="netflix_logo.png" alt="Netflix" className="logo-img" />
          </div>
        </div>
        <main>
          <div className="signin-card">
            <h1>Sign in</h1>
            <form className="signin-card-body">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <p style={{ fontSize: "13px" }}>
                *For testing purposes:
                <br /> Email: admin@example.com / password: 12345
              </p>
              <button onClick={submitHandler}>Sign In</button>
            </form>
            <div className="signin-card-footer">
              <p className="redirect-signup-p">
                New to Netflix? <Link to="/"> Sign up</Link>
              </p>
              <p className="captcha-p">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SigninPage;
