import "./SignupPage.scss";
import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_SIGNIN } from "../context/reducerActions";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext";

const SignupPage = () => {
  const [field, setField] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInURL = new URLSearchParams(search).get("redirect"); //Current locations URL
  const redirect = redirectInURL ? redirectInURL : "/browse";
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { userInfo, dispatch } = useContext(authContext);

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const gotoPwField = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsValid(true);
      setField("password");
    } else {
      setIsValid(false);
      setErrorMessage("Please enter a valid email");
    }
  };

  const submitHandler = async () => {
    try {
      const username = email.split("@")[0];
      const { data } = await axios.post("/users/signup", {
        username,
        email,
        password,
      });
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
            <img
              src="\src\assets\netflix_logo.png"
              alt="Netflix"
              className="logo-img"
            />
          </div>
        </div>
        <main>
          <h1 className="first-title">Unlimited movies, TV shows, and more</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="signup-form">
            {field === "email" ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className={isValid ? "" : "on-error"}
                />
                <button onClick={gotoPwField}>Get Started {">"}</button>
              </>
            ) : (
              <>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
                <button onClick={submitHandler}>Join Now</button>
              </>
            )}
          </div>
          <span
            className="error-span"
            style={{ display: isValid ? "none" : "block" }}
          >
            {errorMessage}
          </span>
          <p className="redirect-signin-p">
            Already have an account? <Link to="/signin"> Sign in</Link>
          </p>
        </main>
      </div>
    </>
  );
};

export default SignupPage;
