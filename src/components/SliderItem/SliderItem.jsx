import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import "./SliderItem.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../../context/authContext";
import { UPDATE_USERLIST } from "../../context/reducerActions";

const SliderItem = ({ content, title }) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { userInfo, userList, dispatch } = useContext(authContext);

  const navigate = useNavigate();

  const changeUserList = async () => {
    try {
      const response = await axios.post(
        `users/updateuserlist/${content._id}`,
        {},
        {
          headers: {
            authorization: userInfo.token,
          },
        }
      );
      dispatch({ type: UPDATE_USERLIST, payload: response.data });
    } catch (error) {}
  };

  return (
    <>
      {content && (
        <div
          className={`slide-item-container`}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => {
            setIsHover(false);
            setIsPlaying(false);
          }}
        >
          <img
            src={content.imgThumb}
            className="details-img-1"
            style={{ display: !isHover ? "block" : "none" }}
          />
          <div
            className="container"
            style={{ display: isHover ? "block" : "none" }}
          >
            <div className="player-or-img">
              {!isPlaying ? (
                <div className="img-container">
                  <img src={content.imgThumb} className="detials-img-2" />
                </div>
              ) : (
                <div className="player-container">
                  <ReactPlayer
                    url={content.movie}
                    playing={isPlaying}
                    height="100%"
                    width="100%"
                    className="player"
                  />
                </div>
              )}
            </div>
            <div className="detials">
              <div className="detials-row1">
                <div className="btn-col1">
                  <div className="icon-container">
                    <span
                      className="material-symbols-outlined btn-icon"
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                      }}
                    >
                      {!isPlaying ? "play_circle" : "stop_circle"}
                    </span>
                  </div>
                  {userList.find((c) => c._id === content._id) ? (
                    <div className="icon-container">
                      <span
                        className="material-symbols-outlined btn-icon"
                        onClick={() => changeUserList()}
                      >
                        do_not_disturb_on
                      </span>
                    </div>
                  ) : (
                    <div className="icon-container">
                      <span
                        className="material-symbols-outlined btn-icon"
                        onClick={() => changeUserList()}
                      >
                        add_circle
                      </span>
                    </div>
                  )}
                </div>
                <div className="btn-col2">
                  <div className="icon-container">
                    <span
                      className="material-symbols-outlined btn-icon"
                      onClick={() => navigate(`/info/${content._id}`)}
                    >
                      info
                    </span>
                  </div>
                </div>
              </div>
              <div className="detials-row2">
                <span>{content.duration}</span>
                <span>{content.year}</span>
                <span className="age-span">+{content.limit}</span>
                <span className="genre-span">{content.genre}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderItem;
