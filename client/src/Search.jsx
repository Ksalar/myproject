import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: ''
    }

    this.search = this.search.bind(this)
  }


  search() {
    this.props.onSearch(this.state.userInput)
  }

  render () {
    return (
      <div className="search">
      <h3>Search here</h3>
      <input 
      id="Input" 
      type="text"
      className="Input-text" 
      placeholder="search coffee-shops"
      value={this.state.userInput}
      onChange={(e) => this.setState({userInput: e.target.value})}
      ></input>
      <button onClick={this.search}>Add</button>
      </div>
    )
  }
}