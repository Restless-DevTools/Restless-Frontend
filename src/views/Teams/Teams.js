import React, { useEffect, useState } from 'react';
import {
  Button, Card,
  Col,
  Container,
  Row,
} from 'reactstrap';
import DefaultEmptySearch from '../../components/DefaultEmptySearch/DefaultEmptySearch';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import useAppContext from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';
import './styles.css';
import TeamCard from './TeamCard';
import TeamsForm from './TeamsForm';

function Teams() {
  const { requests } = useAppContext();
  const { openSuccessNotification, openErrorNotification } = useGlobal();

  const [formModal, setFormModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [edit, setEdit] = useState(false);
  const [teamSelected, setTeamSelected] = useState({});

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

  useEffect(() => {
    getTeams();
  }, []);

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
          <Col sm="8" md="8" lg="8" xl="9">
            <h2 className="text-secondary">Teams</h2>
          </Col>
          <Col md="12">
            {(((teams.length > 0) && (
              <Card className="shadow">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    editTeam={editTeam}
                    deleteTeam={deleteTeam}
                  />
                ))}
              </Card>
            ))) || (<DefaultEmptySearch />)}
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
