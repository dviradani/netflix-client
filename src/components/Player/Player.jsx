import ReactPlayer from 'react-player'
import './Player.scss'

const Player = ({content}) => {
  return (
    <>
        <div className='player-container-big'>
            <ReactPlayer url={content.movie} playing={true} width="100%"  height="100%" /> 
        </div>
    </>
  )
}

export default Player