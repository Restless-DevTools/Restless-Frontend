import React from 'react';

import './styles.css';

import Restless from '../../assets/img/icons/common/restless-logo.svg';

const Logo = (props) => (
  <div className="d-flex flex-column">
    <img
      alt="restless logo"
      src={Restless}
      className="image"
      width={props.width}
    />
  </div>
);

export default Logo;
