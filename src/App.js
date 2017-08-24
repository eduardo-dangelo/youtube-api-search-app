import React, { Component } from 'react';
import _ from 'lodash';
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
    };

    this.videoSearch('react js');
    this.toggleVideoList = this.toggleVideoList.bind(this);
    // this.renderBg = this.renderBg.bind(this);
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

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);
    const { videoList, selectedVideo, videos } = this.state;
    console.log(selectedVideo);

    return (
      <div className="app">
        <div className="shell">
          <SearchBar onSearchTermChange={videoSearch} />
          <div className="app-body">
            <div className="video-detail-container">
              <VideoDetail video={selectedVideo}/>
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
