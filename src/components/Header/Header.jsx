import "./Header.scss";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext";
import { USER_SIGNOUT } from "../../context/reducerActions";
import Searchbox from "../Searchbox/Searchbox";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const [isUserMenue, setIsUserMenue] = useState(false);
  const [isContentMenue, setIsContentMenue] = useState(false);
  const [windowResize, setWindowResize] = useState(window.innerWidth);
  const { userInfo, dispatch } = useContext(authContext);
  const dontShowAts = ["/", "/signin", "/play"];

  const currentPage = window.location.pathname;

  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  window.onresize = () => {
    setWindowResize(window.innerWidth);
    return () => (window.onresize = null);
  };

  const signOutHandler = () => {
    dispatch({ type: USER_SIGNOUT });
    navigate("/");
  };

  return (
    <>
      {!dontShowAts.includes(currentPage) && !currentPage.includes("play") ? (
        <div
          className={
            isScrolled ? "my-navbar-container scrolled" : "my-navbar-container"
          }
        >
          <div className="my-left-side-container">
            <div className="left-side-logo-container">
              <NavLink to="/">
                <img src="netflix_logo.png" alt="Netflix" />
              </NavLink>
            </div>
            <div className="left-side-links-container">
              {windowResize >= 860 ? (
                <>
                  <div>
                    <NavLink to="/movies" className="my-link-container">
                      <div className="icon-container">
                        <span className="material-symbols-outlined my-icon">
                          movie
                        </span>
                      </div>
                      Movies
                    </NavLink>
                  </div>
                  <div>
                    <NavLink to="/tvshows" className="my-link-container">
                      <div className="icon-container">
                        <span className="material-symbols-outlined my-icon">
                          tv
                        </span>
                      </div>
                      TV Shows
                    </NavLink>
                  </div>
                </>
              ) : (
                <div className="mobileContentMenu">
                  Browse
                  <span
                    className={
                      "material-symbols-outlined my-icon my-arrow-icon-span"
                    }
                    onClick={() => {
                      setIsContentMenue(!isContentMenue);
                    }}
                  >
                    arrow_drop_down
                  </span>
                  {isContentMenue && (
                    <div className="contentDropdown">
                      <div>
                        <NavLink to="/movies" className="my-link-container">
                          <div className="icon-container">
                            <span class="material-symbols-outlined my-icon">
                              movie
                            </span>
                          </div>
                          Movies
                        </NavLink>
                      </div>
                      <div>
                        <NavLink to="/tvshows" className="my-link-container">
                          <div className="icon-container">
                            <span class="material-symbols-outlined my-icon">
                              tv
                            </span>
                          </div>
                          TV Shows
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="my-right-side-container">
            {windowResize >= 860 ? (
              <Searchbox showSearch={false} isToggleable={true} />
            ) : (
              <span
                onClick={() => {
                  navigate("/search");
                }}
                className="material-symbols-outlined my-icon"
              >
                Search
              </span>
            )}
            <div className="my-account-container">
              <span className="material-symbols-outlined my-icon face-icon">
                face
              </span>
              {windowResize >= 480 ? (
                <span> {userInfo ? userInfo.username : "User"}</span>
              ) : (
                <></>
              )}
              <span
                className={
                  "material-symbols-outlined my-icon my-arrow-icon-span"
                }
                onClick={() => {
                  setIsUserMenue(!isUserMenue);
                }}
              >
                arrow_drop_down
              </span>
              {isUserMenue ? (
                <div className="userDropdown">
                  <a onClick={signOutHandler}>
                    <div className="icon-container">
                      <span class="material-symbols-outlined my-icon">
                        logout
                      </span>
                    </div>
                    Log out
                  </a>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
