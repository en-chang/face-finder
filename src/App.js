import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import React from 'react';

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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: '',
    pet: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      // fetch('http://localhost:3000/signin', {
      fetch('https://serene-peak-82564.herokuapp.com/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data && data.id) {
            // fetch(`http://localhost:3000/profile/${data.id}`, {
            fetch(`https://serene-peak-82564.herokuapp.com/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.loadUser(user)
                  this.onRouteChange('home');
                }
              })
          }
        })
        .catch(console.log)
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
      // fetch('http://localhost:3000/imageurl', {
      fetch('https://serene-peak-82564.herokuapp.com/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          // fetch('http://localhost:3000/image', {
          fetch('https://serene-peak-82564.herokuapp.com/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        const faces = this.calculateFaceLocation(response)
        for (i = 0; i < faces.length; i++) {
          boxes.push(faces[i]);
        }
        this.displayBox(boxes);
      })
      .catch(err => console.log(err));
  }

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
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
    return
  }

  displayBox = (box) => {
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  render () {
    const { isSignedIn, route, imageUrl, box, user, isProfileOpen } = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal} />
        { isProfileOpen &&
          <Modal>
            <Profile 
              isProfileOpen={isProfileOpen} 
              toggleModal={this.toggleModal} 
              loadUser={this.loadUser}
              user={user} 
            />
          </Modal>
        }
        {route === 'home' 
          ? <div>
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onFindPress={this.onFindPress}
              />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
