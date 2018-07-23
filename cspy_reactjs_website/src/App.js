import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SteamIdForm />
        <div className="footer">
          <a className="pr-4" href="https://github.com/Parkkeo1/CS-Py" target="_blank">What Is CS-Py?</a>
          <a className="pl-4" href="https://github.com/Parkkeo1" target="_blank">Developed By @Parkkeo1</a>
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
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Your SteamID64:
          <input className="text-input-box" placeholder='Ex. 76561198158189084' type="text" value={this.state.value} onChange={this.handleChange} />
          <input className="btn btn-primary" type="submit" value="View Match Stats" />
        </label>
      </form>
    );
  }
}

export default App;
