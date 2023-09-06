import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext";
import Featured from "../components/Featured/Featured";
import Slider from "../components/Slider/Slider";
import axios from "axios";
import "./BrowsePage.scss";
import { UPDATE_USERLIST } from "../context/reducerActions";

const BrowsePage = ({ type }) => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const { userInfo, userList, dispatch } = useContext(authContext);

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?=redirect=/browse");
    }
  }, [userInfo, navigate]);

  const getList = async (genre) => {
    let requestedType = type ? "?type=" + type : "?type=all";
    let requestedGenre = genre ? "&genre=" + genre : "";
    const path = "/content/getlist" + requestedType + requestedGenre;

    const response = await axios.get(path, {
      headers: {
        authorization: userInfo.token,
      },
    });
    return response.data;
  };

  useEffect(() => {
    const getUserList = async () => {
      try {
        const path = "/users/getuserlist?name=" + userInfo.username + "`s List";
        const response = await axios.get(path, {
          headers: {
            authorization: userInfo.token,
          },
        });
        if (response) {
          dispatch({ type: UPDATE_USERLIST, payload: response.data });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserList();
  }, [userInfo]);

  return (
    <>
      <main className="main">
        <Featured type={type}></Featured>
        <div className="sliders-container">
          <Slider
            contentList={userList}
            title={`${userInfo.username}` + "`s List"}
          />
          <Slider
            contentList={async () => await getList("")}
            title="Recommended"
          />
          <Slider
            contentList={async () => await getList("Action")}
            title="Action"
          />
          <Slider
            contentList={async () => await getList("Comedy")}
            title="Comedy"
          />
          <Slider
            contentList={async () => await getList("Fantasy")}
            title="Fantasy"
          />
        </div>
      </main>
    </>
  );
};

export default BrowsePage;
