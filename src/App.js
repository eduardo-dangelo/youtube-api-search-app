import React, { Component } from 'react';
import { debounce } from 'lodash';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import YTSearch from 'youtube-api-search';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import './App.scss';

const API_KEY = 'AIzaSyB2grvg_1hOdst-hkTtL6B8hQvs6_RanfY';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      videos: [],
      selectedVideo: null,
      videoList: true,
      isFullScreen: false,
    };

    this.videoSearch('react js');
    this.toggleVideoList = this.toggleVideoList.bind(this);
    this.notFullScreenSize = this.notFullScreenSize.bind(this);
    this.fullScreenSize = this.fullScreenSize.bind(this);
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      })
    })
  }

  toggleVideoList() {
    this.setState(prevState => ({
      videoList: !prevState.videoList,
    }))
  }

  openVideoList() {
    this.setState({
      videoList: true,
    })
  }

  fullScreenSize() {
    this.setState({
      isFullScreen: true,
      videoList: false,
    })
  }

  notFullScreenSize() {
    this.setState({
      isFullScreen: false,
    })
  }

  render() {
    const videoSearch = debounce((term) => {this.videoSearch(term)}, 500);
    const { videoList, selectedVideo, videos, isFullScreen } = this.state;
    console.log(selectedVideo);

    return (
      <div className="app">
        <div  className={isFullScreen ? 'shell-full-screen' : 'shell'}>
          <SearchBar 
            onSearchTermChange={videoSearch}
            fullScreen={() => this.fullScreenSize()} 
            notFullScreen={() => this.notFullScreenSize()}
            onActive={() => this.openVideoList()}
            isFullScreen={isFullScreen}
          />
          <div className="app-body">
            <div className="video-detail-container">
              <VideoDetail
                video={selectedVideo}
                isFullScreen={isFullScreen}
              />
            </div>
            <div className={videoList ? 'video-list-container' : 'video-list-hidden'}>
              <div className="video-list-toggle" onClick={() => this.toggleVideoList()}>
                {videoList ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
              </div>   
              {videoList && (
                <VideoList 
                  videos={videos}
                  onVideoSelect={selectedVideo => this.setState({selectedVideo: selectedVideo})}

                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
