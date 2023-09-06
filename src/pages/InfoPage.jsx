import React, { useContext, useEffect, useState } from 'react'
import "./InfoPage.scss"
import InfoItem from '../components/InfoItem/InfoItem'
import { useNavigate, useParams } from 'react-router-dom';
import { authContext } from '../context/authContext';
import axios from 'axios';
import Header from '../components/Header/Header';

const InfoPage = () => {

    const params = useParams();
    const {id} = params;
    const {userInfo, dispatch} = useContext(authContext);
    const [content, setContent] = useState({});

    const navigate = useNavigate()
  
    useEffect(() => {
      if(!userInfo) {
        navigate('/signin?=redirect=/browse');        
    }
    },[userInfo, navigate]);

    useEffect(() => {

        const getContent = async () => {
          try {
            const res = await axios.get(`/content/get/${id}`,{
                headers: {
                    authorization: userInfo.token,
                },
            });
            setContent(res.data);
          } catch (error) {
            console.log(error.message) 
          }
        };
        getContent();

      },[id,userInfo.token]);

  return (
    <>
       <main className='info-container'>
        <InfoItem content={content} />
      </main>
    </>
  )
}

export default InfoPage