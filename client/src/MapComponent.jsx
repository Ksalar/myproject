import React from 'react';
import ReactDOM from 'react-dom';
import {GoogleApiWrapper} from 'google-maps-react';


export class MapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }
  componentDidUpdate() {
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) { 
      const {google} = this.props;
      const maps = google.maps; 
      const location = {}
      location['lat'] = this.props.lat;
      location['lng'] = this.props.lng;
      const mapRef = this.refs.map; 
      const node = ReactDOM.findDOMNode(mapRef); 
      const mapConfig = Object.assign({}, {
        center: location,
        zoom: 14,
        mapTypeId: 'roadmap'
      })
      this.map = new maps.Map(node, mapConfig); 

      console.log("location is here! : ",location)
      const marker = new google.maps.Marker({
        position: location,
        map: this.map
      });

      var infowindow = new google.maps.InfoWindow({
        content: `${this.props.info}`
      })
      marker.addListener('click', function() {
        infowindow.open(this.map, marker)
      })
    }
  }

  

  render() {
    const style = { 
      width: '50vw',
      height: '75vh' 
    }

    return (
      <div ref="map" style={style} class="map">
      {console.log(this.props)}
        loading map...
      }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6NuLoLUtvMxfo6t_r5W1KUVQeX7QKGpY',
})(MapComponent);