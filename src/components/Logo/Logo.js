import React from 'react';

import './styles.css';

import Restless from '../../assets/img/icons/common/restless-logo.svg';

const Logo = () => (
  <div className="d-flex flex-column">
    <img
      alt="restless logo"
      src={Restless}
      className="image"
    />
  </div>
);

export default Logo;
