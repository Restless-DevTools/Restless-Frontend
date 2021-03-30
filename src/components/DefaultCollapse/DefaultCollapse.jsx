import React from 'react';
import {
  Badge,
  Button, Col, Collapse, Row,
} from 'reactstrap';

const DefaultCollapse = (props) => {
  const {
    children, group, selectedGroup, toggleGroup, badgeCount,
  } = props;

  return (
    <div key={group.id}>
      <Row className="m-0 align-items-center">
        <Col md="12" className="text-center px-0">
          <Button
            block
            onClick={() => { toggleGroup(group.id); }}
            className="btn-icon mb-1 text-left"
            color="primary"
            type="button"
          >
            <span>
              <i className={group === group.id ? 'fa fa-arrow-down' : 'fa fa-arrow-right'} />
            </span>
            <span className="btn-inner--text">{group.name}</span>
            <Badge color="dark">{badgeCount}</Badge>
          </Button>
        </Col>
      </Row>
      <Collapse isOpen={selectedGroup === group.id}>
        {children}
      </Collapse>
    </div>
  );
};

export default DefaultCollapse;
