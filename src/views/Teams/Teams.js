import React, { useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  CardHeader,
} from 'reactstrap';
import TeamsForm from './TeamsForm';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import TeamCard from './TeamCard';

import './styles.css';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';

function Teams() {
  const [formModal, setFormModal] = useState(false);

  const teams = [
    { name: 'Restless DevTeam', description: 'Awesome Team', integrants: [{ username: 'Francisco' }, { username: 'Mateus' }] },
  ];

  const toggleModal = () => { setFormModal(!formModal); };

  return (
    <>
      <DefaultHeader>
        <Col className="mb-xl-0">
          <Button
            onClick={() => setFormModal(!formModal)}
            color="primary"
            type="button"
          >
            <i className="fas fa-users" />
            {' '}
            New Team
          </Button>
        </Col>
      </DefaultHeader>
      <Container fluid>
        <Row className="mt-5">
          <Col md="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">My Teams</h3>
                  </div>
                </Row>
              </CardHeader>
              { teams.map((team) => (<TeamCard team={team} />))}
            </Card>
          </Col>
        </Row>
        <DefaultModal
          isOpen={formModal}
          title="New Team"
          className="snippet-modal"
          toggleModal={setFormModal}
        >
          <TeamsForm toggleModal={toggleModal} />
        </DefaultModal>
      </Container>
    </>
  );
}

export default Teams;
