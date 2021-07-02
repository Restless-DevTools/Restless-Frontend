import React, { useState } from 'react';
import {
  Badge,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from 'reactstrap';
import DateUtils from '../../utils/DateUtils';

const CollectionCard = (props) => {
  const {
    collection,
    handleOpenCollection,
    canEdit,
    handleEdit,
    handleDelete,
  } = props;
  const [dropDown, setDropDown] = useState(false);

  const toggleDropDown = () => setDropDown(!dropDown);

  return (
    <Col xl="3" lg="3" md="4" sm="6" className="collection-card">
      <Card className="shadow p-0 text-left mb-5">
        <CardHeader className="bg-dracula-secondary">
          <Row className="align-items-center">
            <Col xs="10">
              <CardText tag="h3" className="text-white">{collection.name}</CardText>
            </Col>
            {canEdit && (
              <Col xs="2">
                <ButtonDropdown isOpen={dropDown} toggle={toggleDropDown} direction="left">
                  <DropdownToggle color="link" className="dropdown-collapse p-0">
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => { handleEdit(collection.id); }}>
                      <i className="fa fa-edit" />
                      Edit
                    </DropdownItem>
                    <DropdownItem onClick={() => { handleDelete(collection.id); }}>
                      <i className="fa fa-trash" />
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            )}
          </Row>
        </CardHeader>
        <CardBody
          onClick={() => { handleOpenCollection(collection); }}
          style={{ cursor: 'pointer' }}
        >
          <Row className="align-items-center">
            <Col>
              <CardText tag="h4">
                {collection.description}
              </CardText>
              <Badge color="dark" className="m-0">
                {collection.permissionType}
              </Badge>
            </Col>
          </Row>
        </CardBody>
        <CardFooter
          className="bg-dracula-secondary"
          onClick={() => { handleOpenCollection(collection); }}
          style={{ cursor: 'pointer' }}
        >
          <Row className="text-right">
            <Col md="12">
              <CardText className="text-white h5">
                Created at:
                {' '}
                {DateUtils.getDistanceFormattedDate(collection.createdAt)}
              </CardText>
              <CardText className="text-white h5">
                Updated at:
                {' '}
                {DateUtils.getDistanceFormattedDate(collection.updatedAt)}
              </CardText>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default CollectionCard;
