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
  }

  reload() {
  	console.log('sending')
  	this.props.onInfo(this.state.userInput)
  }

  render() {
  	return (
  		<form>
		  <label>
		    
		    <input id="Input"
		    className="Input-text"
		    type="text" name="name"
		    placeholder="add some info"
		    value={this.state.userInput}
		    onChange={(e)=> this.setState({userInput: e.target.value})}
		     ></input>
		  </label>
		  <input type="submit" value="Submit" onClick={this.reload}></input>
		</form>
  	)
  }


 }