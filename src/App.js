import React, { Component } from 'react';
import { debounce } from 'lodash';
import Draggable from 'react-draggable';
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
      videoList: false,
      isFullScreen: false,
      controlledPosition: {
        x: 0, y: 0
      }
    };

    this.videoSearch('react js');
    this.toggleVideoList = this.toggleVideoList.bind(this);
    this.notFullScreenSize = this.notFullScreenSize.bind(this);
    this.fullScreenSize = this.fullScreenSize.bind(this);
    this.onControlledDrag = this.onControlledDrag.bind(this);
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      })
    })
  }

  onControlledDrag(e, position) {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
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
      controlledPosition: {
        x: 0, y: 0
      }
    })
  }

  notFullScreenSize() {
    this.setState({
      isFullScreen: false,
    })
  }

  render() {
    const videoSearch = debounce((term) => {this.videoSearch(term)}, 500);
    const { videoList, selectedVideo, videos, isFullScreen, controlledPosition } = this.state;
    console.log(selectedVideo);

    return (
      
      <div className="app">
       <Draggable
        handle=".handle"
        bounds="parent"
        position={controlledPosition}
        onDrag={this.onControlledDrag}
        >
          <div  className={isFullScreen ? 'shell-full-screen' : 'shell'}> 
            <div className="handle">
              <SearchBar 
                onSearchTermChange={videoSearch}
                fullScreen={() => this.fullScreenSize()} 
                notFullScreen={() => this.notFullScreenSize()}
                onActive={() => this.openVideoList()}
                isFullScreen={isFullScreen}
              />
            </div>
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
        </Draggable>
      </div>
    );
  }
}

export default App;
