import React from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Button,
} from 'reactstrap';

// import { Container } from './styles';

function TeamCard(props) {
  const { team } = props;

  const teamsIntegrantsStringfied = team.integrants.map((integrant) => `@${integrant.username}`);

  return (
    <Card className="team-card shadow">
      <CardHeader>
        <Row>
          <Col md="10">
            Team -
            {' '}
            {team.name}
          </Col>
          <Col md="2">
            <Button color="success" type="button">
              <i className="fas fa-edit" />
            </Button>
            <Button color="danger" type="button">
              <i className="fas fa-trash" />
            </Button>
            <Button color="info" type="button">
              <i className="fas fa-users" />
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="8">
            {teamsIntegrantsStringfied.join(', ')}
          </Col>
          <Col md="4" />
        </Row>
      </CardBody>

    </Card>
  );
}

export default TeamCard;
