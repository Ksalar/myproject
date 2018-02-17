import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios';

export default class InfoBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: ''
    }
    this.reload = this.reload.bind(this)
    this.coffee = this.coffee.bind(this)
  }

  reload() {
  	this.props.onInfo(this.state.userInput)
  }

  coffee() {
    this.props.coffee()
  }

  render() {
  	return (
  			<div>
		  <label>
		    
		    <input id="Input"
		    className="Input-text"
		    type="text" name="name"
		    placeholder="add some info"
		    value={this.state.userInput}
		    onChange={(e)=> this.setState({userInput: e.target.value})}
		     ></input>
		  </label>
      <button onClick={this.reload}>ADD something</button>
		  <button onClick={this.coffee}>COFFEE-SHOPS</button>
		</div>
  	)
  }


 }