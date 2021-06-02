import React from 'react';

import './styles.css';

import { Col, Row } from 'reactstrap';
import Search from '../../assets/img/icons/common/travolta.gif';

const DefaultEmptySearch = (props) => (
  <Col md="12">
    <div className="d-flex flex-column align-items-center">
      <img
        alt="restless logo"
        src={Search}
        className="image"
        width={300}
      />
    </div>
    <Row className="justify-content-center mt-1">
      <h1 className={props.dark ? 'text-dracula-secondary' : 'text-secondary'}>Nothing to see here!</h1>
    </Row>
  </Col>
);

export default DefaultEmptySearch;
