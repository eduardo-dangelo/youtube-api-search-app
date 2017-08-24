import React from 'react';
import './VideoListItem.scss';

const VideoListItem = ({video, onVideoSelect}) => {
  const imgUrl = video.snippet.thumbnails.default.url;

  return(
    <div onClick={() => onVideoSelect(video)} className="video-list-item">
      <img src={imgUrl} alt={video.snippet.title} />
      <h4>{video.snippet.title}</h4>
    </div>
  );
}

export default VideoListItem;