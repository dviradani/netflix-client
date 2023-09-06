import "./Featured.scss";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Featured = ({ type }) => {
  const [randomContent, setRandomContent] = useState({});
  const { userInfo, dispatch } = useContext(authContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        let requestedType = type ? "?type=" + type : "all";
        let path = "/content/random" + requestedType;
        const response = await axios.get(path, {
          headers: {
            authorization: userInfo.token,
          },
        });
        if (response) {
          setRandomContent(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
    const interval = setInterval(() => {
      getRandomContent();
    }, 5000);
    return () => clearInterval(interval);
  }, [type]);

  return (
    <div className="my-featured-container">
      <img className="bg-img" src={randomContent.img}></img>
      <div className="my-feature-dits-container">
        <div className="my-featured-title-img-container">
          <img src={randomContent.imgTitle}></img>
        </div>
        <div className="my-featured-desc-container">
          <p>{randomContent.description}</p>
        </div>
        <div className="my-featured-btn-container">
          <div className="my-featured-btn-left-container">
            <button onClick={() => navigate(`/play/${randomContent._id}`)}>
              <span className="material-symbols-outlined btn-icon">
                play_circle
              </span>
              Play
            </button>
            <button
              className="my-button-secondry"
              onClick={() => navigate(`/info/${randomContent._id}`)}
            >
              <span className="material-symbols-outlined btn-icon">info</span>
              Info
            </button>
          </div>
          <div className="my-featured-btn-right-container">
            <div className="my-age-box">
              <p>+{randomContent.limit}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
