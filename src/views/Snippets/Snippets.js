import React from 'react';
import {
  Button, Card,

  CardHeader, Col,
  Container,
  Row,

  Table,
} from 'reactstrap';
import SnippetsHeader from './SnippetsHeader';
import './styles.css';

function Snippets() {
  const actionsPanel = () => (
    <>
      <Button color="success">Edit</Button>
      <Button color="danger">Delete</Button>
    </>
  );

  return (
    <>
      <SnippetsHeader />
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
                  <tr>
                    <td>{actionsPanel()}</td>
                    <th scope="row">Fix DB Schema</th>
                    <td>Fix the DB schema</td>
                    <td>PL/SQL</td>
                    <td>Private</td>
                    <td>Today</td>
                  </tr>
                  <tr>
                    <td>{actionsPanel()}</td>
                    <th scope="row">Calculate Something</th>
                    <td>Calculate something cool</td>
                    <td>GO</td>
                    <td>Private</td>
                    <td>Today</td>
                  </tr>
                  <tr>
                    <td>{actionsPanel()}</td>
                    <th scope="row">React select</th>
                    <td>React select component that is awesome</td>
                    <td>JavaScript</td>
                    <td>Public</td>
                    <td>Today</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Snippets;
