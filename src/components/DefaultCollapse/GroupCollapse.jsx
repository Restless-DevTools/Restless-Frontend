import React, { useState } from 'react';
import {
  Badge,
  Button, Col, Collapse, Row, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu,
} from 'reactstrap';

const DefaultCollapse = (props) => {
  const {
    children, group, selectedGroup, toggleGroup, badgeCount, editGroup, deleteGroup,
  } = props;

  const isSelected = selectedGroup === group.id;

  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div key={group.id}>
      <Row className="m-0 align-items-center">
        <Col md="10" className="text-center px-0">
          <Button
            block
            onClick={() => { toggleGroup(group.id); }}
            className="btn-icon mb-1 text-left"
            color="primary"
            type="button"
          >
            <span>
              <i className={isSelected ? 'fa fa-arrow-down' : 'fa fa-arrow-right'} />
            </span>
            <span className="btn-inner--text">{group.name}</span>
            <Badge color="dark">{badgeCount}</Badge>

          </Button>
        </Col>
        <Col md="2">

          <ButtonDropdown isOpen={dropDown} toggle={toggleDropDown} direction="left">
            <DropdownToggle caret>
              <i className="fa fa-cogs" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => editGroup(group.id)}>
                <i className="fa fa-edit" />
                Edit
              </DropdownItem>
              <DropdownItem onClick={() => deleteGroup(group.id)}>
                <i className="fa fa-trash" />
                Delete
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Col>
      </Row>
      <Collapse isOpen={isSelected}>
        {children}
      </Collapse>
    </div>
  );
};

export default DefaultCollapse;
