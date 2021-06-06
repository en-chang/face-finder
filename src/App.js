import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

const particlesOptions = {
  "particles": {
    "number": {
      "value": 70
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

function App() {
  return (
    <div className="App">
      <Particles
        className='particles'
        params={particlesOptions}
      />
      <Navigation />
      <Rank />
      <ImageLinkForm />
      {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
