import React, { useState } from 'react';
import {
  Button,
  Table,
} from 'reactstrap';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import Response from './Response';
import './styles.css';

const History = () => {
  const [responseModal, setResponseModal] = useState(false);

  const actionsContainer = () => (
    <>
      <Button className="btn-icon" color="primary" type="button">
        <span>
          <i className="fa fa-info" />
        </span>
      </Button>
      <Button onClick={() => setResponseModal(!responseModal)} className="btn-icon" color="success" type="button">
        <span>
          <i className="fa fa-window-restore" />
        </span>
      </Button>
      <Button className="btn-icon" color="danger" type="button">
        <span>
          <i className="fa fa-trash" />
        </span>
      </Button>
    </>
  );

  return (
    <>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Method</th>
            <th scope="col">Url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>13 Hours ago</td>
            <th scope="row" className="text-success">HTTP: 200</th>
            <td>POST</td>
            <td>http://api.restless.dev/teams/create</td>
            <td>{actionsContainer()}</td>
          </tr>
          <tr>
            <td>18/03/2021</td>
            <th scope="row" className="text-danger">HTTP: 500</th>
            <td>POST</td>
            <td>http://api.restless.dev/teams/create</td>
            <td>{actionsContainer()}</td>
          </tr>
          <tr>
            <td>21 Hours ago</td>
            <th scope="row" className="text-success">HTTP: 200</th>
            <td>GET</td>
            <td>http://api.restless.dev/teams</td>
            <td>{actionsContainer()}</td>
          </tr>
        </tbody>
      </Table>
      <DefaultModal
        isOpen={responseModal}
        title="Response"
        className="default-modal"
        toggleModal={setResponseModal}
      >
        <Response />
      </DefaultModal>
    </>
  );
};

export default History;
