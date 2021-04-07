import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from 'reactstrap';
import DefaultHeader from '../../components/DefaultHeader/DefaultHeader';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import SnippetForm from './SnippetForm';
import useAppContext from '../../contexts/ApplicationContext';
import './styles.css';

function Snippets() {
  const { requests } = useAppContext();
  const [formModal, setFormModal] = useState(false);
  const [snippets, setSnippets] = useState([]);

  const getSnippets = async () => {
    const { data } = await requests.getSnippets();
    setSnippets(data);
  };

  useEffect(() => {
    getSnippets();
  }, []);

  return (
    <>
      <DefaultHeader>
        <Col className="mb-xl-0">
          <Button
            onClick={() => setFormModal(!formModal)}
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
          <Col md="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">My Snippets</h3>
                  </div>
                </Row>
              </CardHeader>
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
                        <Button color="success" onClick={() => setFormModal(!formModal)}><i className="fas fa-edit" /></Button>
                        <Button color="danger"><i className="fas fa-trash" /></Button>
                      </td>
                      <th scope="row">{snippet.name}</th>
                      <td>{snippet.description}</td>
                      <td>{snippet.language}</td>
                      <td>{snippet.permissionType}</td>
                      <td>{snippet.createdAt}</td>
                    </tr>
                  )))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <DefaultModal
          isOpen={formModal}
          title="New Snippet"
          className="snippet-modal"
          toggleModal={setFormModal}
        >
          <SnippetForm />
        </DefaultModal>
      </Container>
    </>
  );
}

export default Snippets;
