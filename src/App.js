import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import React from 'react';

// API used to detect faces
const app = new Clarifai.App({
  apiKey: '8ae99686d6794b1a8847f0ebdca3359b'
});

// Particle effect for background
const particlesOptions = {
  "particles": {
    "number": {
      "value": 100
    },
    "size": {
      "value": 2
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  // When text is input in ImageLinkForm
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // When the Find button is pressed in ImageLinkForm
  onFindPress = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  render () {
    const { input, imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onFindPress={this.onFindPress}
        />
        <FaceRecognition imageUrl={imageUrl} box={box}/>
      </div>
    );
  }
}

export default App;
