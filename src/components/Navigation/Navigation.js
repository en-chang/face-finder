import React from 'react';
import logo from './logo.png';

const Navigation = () => {
  return (
    <nav style={{display: 'flex', justifyContent: 'space-between'}}>
      <img
        // style={{display: 'flex', justifyContent: 'flex-start'}}
        className='pa3 pointer'
        alt='logo'
        src={logo}
        width="80"
        height="80"
      />
      <p
        // style={{display: 'flex', justifyContent: 'flex-end'}}
        className='f3 link dim black underline pa3 pointer'
      >
        Sign Out
      </p>
    </nav>
  );
}

export default Navigation;