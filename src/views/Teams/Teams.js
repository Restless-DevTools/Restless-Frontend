import React, { useState, useEffect } from 'react';
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
import useAppContext from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';

import './styles.css';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';

function Teams() {
  const { requests } = useAppContext();
  const { openSuccessNotification, openErrorNotification } = useGlobal();

  const [formModal, setFormModal] = useState(false);

  const [teams, setTeams] = useState([]);
  const [edit, setEdit] = useState(false);

  const toggleModal = () => { setFormModal(!formModal); };

  const getTeams = async () => {
    try {
      const { data } = await requests.getAllTeams();
      setTeams(data);
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Snippets');
      setTeams([]);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const [teamSelected, setTeamSelected] = useState({});

  const newTeam = () => {
    setEdit(false);
    setTeamSelected({});
    toggleModal();
  };

  const editTeam = async (teamId) => {
    setEdit(true);
    const { data } = await requests.getTeam(teamId);
    setTeamSelected(data);
    toggleModal();
  };

  const deleteTeam = async (teamId) => {
    const { data } = await requests.deleteTeam(teamId);
    if (data.status) {
      openSuccessNotification('Team deleted successfully', 'Team');
      getTeams();
    } else {
      openErrorNotification('Something went wrong', 'Team');
    }
  };

  return (
    <>
      <DefaultHeader>
        <Col className="mb-xl-0">
          <Button
            onClick={() => newTeam()}
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
              { teams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  editTeam={editTeam}
                  deleteTeam={deleteTeam}
                />
              ))}
            </Card>
          </Col>
        </Row>
        <DefaultModal
          isOpen={formModal}
          title="New Team"
          className="snippet-modal"
          toggleModal={setFormModal}
        >
          <TeamsForm
            toggleModal={toggleModal}
            requests={requests}
            useGlobal={useGlobal}
            getTeams={getTeams}
            teamSelected={teamSelected}
            edit={edit}
          />
        </DefaultModal>
      </Container>
    </>
  );
}

export default Teams;
