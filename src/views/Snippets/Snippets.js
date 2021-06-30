import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';
import DefaultConfirmationModal from '../../components/DefaultConfirmationModal/DefaultConfirmationModal';
import DefaultEmptySearch from '../../components/DefaultEmptySearch/DefaultEmptySearch';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import useAppContext from '../../contexts/ApplicationContext';
import useGlobal from '../../contexts/GlobalContext';
import DateUtils from '../../utils/DateUtils';
import SnippetForm from './SnippetForm';
import './styles.css';

function Snippets() {
  const { requests } = useAppContext();
  const { openSuccessNotification, openErrorNotification } = useGlobal();
  const [formModal, setFormModal] = useState(false);
  const [snippets, setSnippets] = useState([]);
  const [snippetSelected, setSnippetSelected] = useState({});
  const [edit, setEdit] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);

  const getSnippets = async () => {
    try {
      const { data } = await requests.getSnippets();
      setSnippets(data);
    } catch (error) {
      openErrorNotification('Can not fetch the records in backend.', 'Snippets');
    }
  };

  const createSnippet = async () => {
    setEdit(false);
    setSnippetSelected({});
    setFormModal(!formModal);
  };

  const editSnippet = async (snippet) => {
    try {
      setEdit(true);
      const { data } = await requests.getSnippet(snippet.id);

      if (data) {
        setSnippetSelected(data);
        setFormModal(!formModal);
      }
    } catch (error) {
      console.log(error);
      openErrorNotification('Can not fetch the records in backend.', 'Snippets');
    }
  };

  const deleteSnippet = async (snippet) => {
    await requests.deleteSnippet(snippet.id);
    openSuccessNotification('Snippet deleted successfully', 'Snippet');
    getSnippets();
  };

  useEffect(() => {
    if (!confirmationModal) {
      setSnippetToDelete(null);
    }
  }, [confirmationModal]);

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <DefaultHeader>
        <Col className="mb-xl-0">
          <Button
            onClick={() => createSnippet()}
            color="primary"
            type="button"
          >
            <i className="fas fa-code" />
            {' '}
            New Snippet
          </Button>
        </Col>
      </DefaultHeader>
      <Container fluid>
        <Row className="mt-5">
          <Col sm="8" md="8" lg="8" xl="9">
            <h2 className="text-secondary">Snippets</h2>
          </Col>
          <Col md="12">
            {(((snippets.length > 0) && (
              <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Actions</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Language</th>
                      <th scope="col">Share</th>
                      <th scope="col">Updated At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {snippets.map(((snippet) => (
                      <tr key={snippet.id}>
                        <td>
                          <Button color="success" onClick={() => editSnippet(snippet)}>
                            <i className="fas fa-edit" />
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => {
                              setConfirmationModal(true);
                              setSnippetToDelete(snippet);
                            }}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </td>
                        <th scope="row">{snippet.name}</th>
                        <td>{snippet.description}</td>
                        <td>{snippet.language}</td>
                        <td>{snippet.shareOption}</td>
                        <td>{DateUtils.getDistanceFormattedDate(snippet.createdAt)}</td>
                      </tr>
                    )))}
                  </tbody>
                </Table>
              </Card>
            )) || (<DefaultEmptySearch />))}
          </Col>
        </Row>
        <DefaultModal
          isOpen={formModal}
          title="Snippet"
          className="snippet-modal"
          toggleModal={setFormModal}
        >
          <SnippetForm
            requests={requests}
            snippet={snippetSelected}
            toggleModal={setFormModal}
            getSnippets={getSnippets}
            edit={edit}
          />
        </DefaultModal>
        <DefaultConfirmationModal
          isOpen={confirmationModal}
          toggleModal={setConfirmationModal}
          confirmText="Are you sure you want to delete this snippet?"
          confirmAction={() => { deleteSnippet(snippetToDelete); }}
        />
      </Container>
    </>
  );
}

export default Snippets;
