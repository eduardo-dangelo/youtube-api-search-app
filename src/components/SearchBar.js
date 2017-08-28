import React, { Component} from 'react';
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import './SearchBar.scss';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
    this.labelValue = this.labelValue.bind(this);
  }

  onInputChange(term) {
    this.setState({term: term});
    this.props.onSearchTermChange(term);
  }

  labelValue() {
    if(this.state.term === '') {
      return 'Search...';
    } else {
      return this.state.term;
    }
  }
  
  render () {
    const { isFullScreen } = this.props;
    return (
      <div className="search-bar">
        <a href="http://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={require('../img/youtube_logo.png')} alt="youtube" className="logo" />
        </a>
        <FormGroup controlId="searchBar">
          <ControlLabel className="input-container">
            <div className="label">
              {this.labelValue()}
            </div>
            <FormControl
              type="input"
              placeholder="Search..."
              value={this.state.term}
              onChange={event => this.onInputChange(event.target.value)}
              onClick={this.props.onActive}
            />
          </ControlLabel>
        </FormGroup>
        {isFullScreen ? (
          <div 
            className="full-screen-btn orange"
            onClick={this.props.notFullScreen}
          />
        ) : (
          <div 
            className="full-screen-btn green"
            onClick={this.props.fullScreen}
          />
        )}
      </div>
    );
  }
}