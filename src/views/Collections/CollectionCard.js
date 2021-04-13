import React from 'react';
import {
  Badge,
  Card, CardBody, CardFooter, CardHeader, CardText, Col, Row,
} from 'reactstrap';
import DateUtils from '../../utils/DateUtils';

const CollectionCard = (props) => {
  const { collection, handleOpenCollection } = props;

  return (
    <Col xl="3" lg="3" md="4" sm="6" className="collection-card">
      <Card className="shadow btn p-0 text-left mb-5" onClick={() => { handleOpenCollection(collection); }}>
        <CardHeader className="bg-dracula-secondary">
          <Row>
            <Col>
              <CardText tag="h3" className="text-white">{collection.name}</CardText>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
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
        <CardFooter className="bg-dracula-secondary">
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
