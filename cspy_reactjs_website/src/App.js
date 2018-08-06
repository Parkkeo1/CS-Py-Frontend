import React, { Component } from 'react';
import DataDisplay from './DataDisplay'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData: [],
      showData: false,
    };
  }

  idFormCallback = (matchDataArray) => {
    this.setState({ matchData: matchDataArray, showData: true });
    console.log(matchDataArray);
  };

  render() {
    return (
      <div className="App">
        <div className='page-title-wrapper'>
          <div className='page-title-inner'>
            <h1 className="text-center">CS-Py</h1>
            <p className="text-center">A Personal Performance Analytics & Tracker Tool For CS:GO</p>
          </div>
        </div>
        <div className='steamid-form-wrapper'>
          <SteamIdForm appDataCallback={this.idFormCallback} />
        </div>
        <div className='display-results-wrapper'>
          <DataDisplay showData={this.state.showData} matchData={this.state.matchData} />
        </div>
        <div className="footer-wrapper">
          <div className='footer-inner'>
            <a className="pr-4" href="https://github.com/Parkkeo1/CS-Py" target="_blank">What Is CS-Py?</a>
            <a className="pl-4" href="https://github.com/Parkkeo1" target="_blank">Developed By @Parkkeo1</a>
          </div>
        </div>
      </div>
    );
  }
}

class SteamIdForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.value);
    axios.get('http://parkkeo1.pythonanywhere.com/api/user_data/' + this.state.value)
         .then(response => this.props.appDataCallback(response.data));
    event.preventDefault();
  }

  render() {
    return (
      <div className='steamid-form-inner'>
        <label>Find Your SteamID64:
          <a target='_blank' href='https://steamid.io/lookup'>
            <i> https://steamid.io/lookup</i>
          </a>
        </label>
        <form onSubmit={this.handleSubmit}>
          <label className='form-element'>
            Your SteamID64:
          </label>
          <span className='form-element'>
            <input className="text-input-box" placeholder='Ex. 76561198158189084' type="text" value={this.state.value} id='steamid-input' onChange={this.handleChange} />
          </span>
          <span className='form-element'>
            <input className="btn btn-blue" type="submit" value="View Match Stats" />
          </span>
        </form>
      </div>
    );
  }
}

export default App;
