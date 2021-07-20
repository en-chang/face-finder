import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
import logo from './logo.png';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    isSignedIn
      ? <nav style={{display: 'flex', justifyContent: 'space-between'}}>
          <img
            className='pa3 pointer'
            alt='logo'
            src={logo}
            width="80"
            height="80"
          />
          <div style={{display: 'flex'}}>
            <ProfileIcon />
            <p
              onClick={() => onRouteChange('signout')}
              className='f3 link dim black underline pa3 pointer'
            >
              Sign Out
            </p>
          </div>
        </nav>
      : <nav style={{display: 'flex', justifyContent: 'space-between'}}>
          <img
            className='pa3 pointer'
            alt='logo'
            src={logo}
            width="80"
            height="80"
          />
          <div style={{display: 'flex'}}>
            <p
              onClick={() => onRouteChange('signin')}
              className='f3 link dim black underline pa3 pointer'
            >
              Sign In
            </p>
            <p
              onClick={() => onRouteChange('register')}
              className='f3 link dim black underline pa3 pointer'
            >
              Register
            </p>
          </div>
        </nav>
  );
}

export default Navigation;