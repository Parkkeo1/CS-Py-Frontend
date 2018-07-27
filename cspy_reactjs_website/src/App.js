import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import axios from 'axios'

class App extends Component {
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
          <SteamIdForm />
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
    axios.get('https://www.parkkeo1.pythonanywhere.com/api/user_data/' + this.state.value)
         .then(response => console.log(response));
    event.preventDefault();
  }

  render() {
    return (
      <div className='steamid-form-inner'>
        <label htmlFor='steamid-input'>Find Your SteamID64:
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
            <input className="btn btn-primary" type="submit" value="View Match Stats" />
          </span>
        </form>
      </div>
    );
  }
}

export default App;
