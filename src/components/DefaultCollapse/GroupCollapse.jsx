import React, { useState } from 'react';
import {
  Card,
  Col,
  Collapse,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
} from 'reactstrap';

import './styles.css';

const DefaultCollapse = (props) => {
  const {
    collection, children, group, selectedGroup, toggleGroup, editGroup, deleteGroup,
  } = props;

  const isSelected = selectedGroup === group.id;

  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div key={group.id}>
      <Row className="m-0 align-items-center">
        <Col md="12" className="text-center px-0">
          <Card
            className="default-collapse-card"
            color="primary"
            type="button"
          >
            <Row>
              <Col md="9">
                <Row>
                  <Col md="12">
                    <Button
                      color="link"
                      type="button"
                      onClick={() => { toggleGroup(group.id); }}
                      className="button-link-collapse"
                    >
                      <Col md="2" className="float-left">
                        <i className={isSelected ? 'fa fa-arrow-down' : 'fa fa-arrow-right'} />
                      </Col>
                      <Col md="10">
                        {group.name}
                      </Col>
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col md="3" className="pull-right">
                <ButtonDropdown isOpen={dropDown} toggle={toggleDropDown} direction="left">
                  <DropdownToggle color="link" className="dropdown-collapse">
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu>
                    {(collection.sharedPermissions === 'EDIT' || collection.sharedPermissions === 'DELETE') && (
                      <DropdownItem onClick={() => editGroup(group.id)}>
                        <i className="fa fa-edit" />
                        Edit
                      </DropdownItem>
                    )}
                    {(collection.sharedPermissions === 'DELETE') && (
                      <DropdownItem onClick={() => deleteGroup(group.id)}>
                        <i className="fa fa-trash" />
                        Delete
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Collapse isOpen={isSelected}>
        {children}
      </Collapse>
    </div>
  );
};

export default DefaultCollapse;
