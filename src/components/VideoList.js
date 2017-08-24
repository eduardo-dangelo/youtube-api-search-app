import React from 'react';
import VideoListItem from './VideoListItem';
import './VideoList.scss';

class VideoList extends React.Component {
  render() {
    const videoItens = this.props.videos.map((video) => {
      return(
        <VideoListItem
          className="video-list-item"
          onVideoSelect={this.props.onVideoSelect}
          key={video.etag}
          video={video}
        />
      );
    });
    
    return(      
      <div className="video-list">
        {videoItens}
      </div>
    );
  }
}

export default VideoList;