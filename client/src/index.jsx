import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { GoogleApiWrapper } from 'google-maps-react' 


import MapComponent from './MapComponent.jsx';
import Search from './Search.jsx';
import InfoBox from './InfoBox.jsx';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		userInput: '',
  		curLat: 40.8555791, 
      curLng: -73.97643719999999,
      curAddress: '',
      info: ''
  	}
  	this.onSearch = this.onSearch.bind(this);
    this.addInfo = this.addInfo.bind(this)
    this.coffee = this.coffee.bind(this)
  }

  addInfo(info) {
    axios.post("/info", {
      "curAddress": this.state.curAddress,
      "info": info
    })
  }

  coffee() {
    console.log("clicled in main")
    axios.post("/query", {
      "query": "Starbucks",
      "selector": "info"
    }).then((data)=> {
      console.log("here will be result")
      console.log(data)
      
    })
  }

  onSearch(data) {
  	axios.post("/search", {
  		"userInput": data
  	})
    .then((data)=>{
      this.setState({
        curLat: data.data[0].lat,
        curLng: data.data[0].lng,
        curAddress: data.data[0].address,
        info: data.data[0].info
      })
  	})
  }

  render() {
    return (
      <div id="app">
        <h1> Using Google API </h1>
        <Search google={this.props.google} onSearch={this.onSearch} />
        <InfoBox 
        onInfo={this.addInfo}
        coffee={this.coffee}
        />
        <MapComponent 
        google={this.props.google} 
        lng={this.state.curLng}
        lat={this.state.curLat}
        info={this.state.info}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));