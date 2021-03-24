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

function Teams() {
  const [formModal, setFormModal] = useState(false);

  const teams = [
    { name: 'Restless DevTeam', description: 'Awesome Team', integrants: [{ username: 'Francisco' }, { username: 'Mateus' }] },
  ];

  return (
    <>
      <Container className="pt-8" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0">
            <Button
              onClick={() => setFormModal(!formModal)}
              color="primary"
              type="button"
            >
              New Team
            </Button>
            <DefaultModal
              isOpen={formModal}
              title="New Team"
              className="snippet-modal"
              toggleModal={setFormModal}
            >
              <TeamsForm />
            </DefaultModal>

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

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Teams;
