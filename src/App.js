import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      route: 'signin',
      isSignedIn: false
    }
  }

  // When text is input in ImageLinkForm
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // When the Find button is pressed in ImageLinkForm
  onFindPress = () => {
    let boxes = []
    let i;
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => {
        const faces = this.calculateFaceLocation(response)
        for (i = 0; i < faces.length; i++) {
          boxes.push(faces[i]);
        }
        this.displayBox(boxes);
      })
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
    let faceLocations = []
    let i;
    const numberFaces = data.outputs[0].data.regions.length
    for (i = 0; i < numberFaces; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      faceLocations.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      })
    }
    return (faceLocations);
  }

  displayBox = (box) => {
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render () {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home' 
          ? <div>
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onFindPress={this.onFindPress}
              />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
