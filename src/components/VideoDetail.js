import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import './VideoDetail.scss';

const VideoDetail = ({video}) => {
if (!video) {
  return (
    <div>
      <div className="loading">
        <FaSpinner/>Loading...
      </div>
     
    </div>
  );
}

  const videoId = video.id.videoId;
  const url = `http://www.youtube.com/embed/${videoId}`;

  return(
    <div className="video-detail">
      <div className="embed-box">
        <iframe title={video.snippet.title} className="embed-item" src={url}></iframe>
      </div>
      <div className="details">
        <h3>{video.snippet.title}</h3>
        <p>{video.snippet.description}</p>
      </div>
        <img className="bg-img-default" src={require("../img/bg-01.jpg")} alt="bg"/> 
    </div>
  );
}

export default VideoDetail;