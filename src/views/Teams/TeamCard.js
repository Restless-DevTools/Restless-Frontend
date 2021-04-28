import React from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Button,
} from 'reactstrap';

function TeamCard(props) {
  const { team, editTeam, deleteTeam } = props;

  const teamsIntegrantsStringfied = team.integrants
    ? team.integrants.map((integrant) => `@${integrant.username}`).join(', ')
    : '';

  return (
    <Card className="team-card shadow" key={team.id}>
      <CardHeader>
        <Row>
          <Col md="10">
            Team -
            {' '}
            {team.name}
          </Col>
          <Col md="2">
            <Button
              color="success"
              type="button"
              onClick={() => editTeam(team.id)}
            >
              <i className="fas fa-edit" />
            </Button>
            <Button
              color="danger"
              type="button"
              onClick={() => deleteTeam(team.id)}
            >
              <i className="fas fa-trash" />
            </Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <p>{team.description}</p>
        <Row>
          <Col md="8">
            Integrants:
            {' '}
            {teamsIntegrantsStringfied}
          </Col>
          <Col md="4" />
        </Row>
      </CardBody>

    </Card>
  );
}

export default TeamCard;
