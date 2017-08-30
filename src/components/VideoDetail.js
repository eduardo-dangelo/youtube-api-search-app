import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import './VideoDetail.scss';

const VideoDetail = ({video, isFullScreen}) => {
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
  const url = `//www.youtube.com/embed/${videoId}`;


  return(
    <div className="video-detail">
      <div className={isFullScreen ? 'embed-box-full' : 'embed-box'}>
        <iframe title={video.snippet.title} className="embed-item" src={url}></iframe>
      </div>
      {!isFullScreen && (
        <div className="details">
          <h3>{video.snippet.title}</h3>
          <p>{video.snippet.description}</p>
        </div>
      )}
    </div>
  );
}

export default VideoDetail;