import React, { useEffect, useState } from 'react';
import {
  Card, CardBody, CardHeader, Col, Row, Button,
} from 'reactstrap';
import DefaultConfirmationModal from '../../components/DefaultConfirmationModal/DefaultConfirmationModal';

const TeamCard = (props) => {
  const { team, editTeam, deleteTeam } = props;

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);

  const teamsIntegrantsStringfied = team.integrants
    ? team.integrants.map((integrant) => `@${integrant.username}`).join(', ')
    : '';

  useEffect(() => {
    if (!confirmationModal) {
      setTeamToDelete(null);
    }
  }, [confirmationModal]);

  return (
    <>
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
                onClick={() => {
                  setConfirmationModal(true);
                  setTeamToDelete(team.id);
                }}
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
      <DefaultConfirmationModal
        isOpen={confirmationModal}
        toggleModal={setConfirmationModal}
        confirmText="Are you sure you want to delete this team?"
        confirmAction={() => { deleteTeam(teamToDelete); }}
      />
    </>
  );
};

export default TeamCard;
