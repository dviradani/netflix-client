import React from 'react'
import "./InfoItem.scss"
import { useNavigate } from 'react-router-dom';

const InfoItem = ({content}) => {

  const navigate = useNavigate();

  return (
    <>
    { content&&   
      (<div className='main-container'>
          <div className="info-img-container">
              <img src={content.imgVertical} className='info-img'></img>
            </div>
          <div className="info-detials-container">
                  <div className="info-title-container">
                    <h1>{content.title}</h1>
                  </div>
                  <div className="info-description-container">
                    <p>{content.description}</p>
                  </div>
                  <div className="details-container">
                    <span>Type: {content.isSeries? "Series" : "Movie"}</span>
                    <span>Genere: {content.genre}</span>
                    <span>Release Year: {content.year}</span>
                    <span>Duration: {content.duration}</span>
                    <span>Age restriction: +{content.limit}</span>
                  </div>
                  <div className="btn-container">
                  <button onClick={() =>navigate(`/play/${content._id}`)}><span className="material-symbols-outlined btn-icon">play_circle</span>Play</button>
                  </div>
            </div>
        </div>
      )}
    </>
  )
}

export default InfoItem