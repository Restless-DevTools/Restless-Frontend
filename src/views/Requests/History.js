import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
} from 'reactstrap';
import useApp from '../../contexts/ApplicationContext';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import Response from './Response';
import './styles.css';
import useGlobal from '../../contexts/GlobalContext';
import DefaultEmptySearch from '../../components/DefaultEmptySearch/DefaultEmptySearch';
import DateUtils from '../../utils/DateUtils';

const History = (props) => {
  const { request, getHttpStatusColor } = props;

  const { requests } = useApp();
  const { openErrorNotification, openSuccessNotification } = useGlobal();
  const [responseModal, setResponseModal] = useState(false);
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const getAllResponses = async () => {
    try {
      if (request.id) {
        const { data } = await requests.getAllResponses(request.id);

        if (data.length) {
          setResponses(data);
        }
      }
    } catch (error) {
      openErrorNotification('Can\'t fetch the records in backend.', 'Responses');
      setResponses([]);
    }
  };

  const handleDeleteResponse = async (response) => {
    try {
      const { data } = await requests.deleteResponse(response.id);

      if (data.status) {
        openSuccessNotification(data.message, 'Responses');
        getAllResponses();
      } else {
        openErrorNotification(data.message, 'Responses');
      }
    } catch (error) {
      openErrorNotification('Can\'t fetch the records in backend.', 'Responses');
    }
  };

  const handleDatailResponse = (response) => {
    setSelectedResponse(response);
    setResponseModal(!responseModal);
  };

  useEffect(() => {
    getAllResponses();
  }, []);

  const actionsContainer = (response) => (
    <>
      <Button
        onClick={() => handleDatailResponse(response)}
        className="btn-icon"
        color="primary"
        type="button"
      >
        <span>
          <i className="fa fa-eye" />
        </span>
      </Button>
      <Button
        onClick={() => handleDeleteResponse(response)}
        className="btn-icon"
        color="danger"
        type="button"
      >
        <span>
          <i className="fa fa-trash" />
        </span>
      </Button>
    </>
  );

  return (
    <>
      {(responses && responses.length > 0) ? (
        <div className="responses-table">
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
              {responses.map((response) => (
                <tr key={response.id}>
                  <td
                    title={DateUtils.getFullFormattedDate(response.updatedAt)}
                  >
                    {DateUtils.getDistanceFormattedDate(response.updatedAt)}
                  </td>
                  <th scope="row">
                    <span
                      className="text-darker pl-1 pr-1 bold"
                      style={{ background: getHttpStatusColor(response.status) }}
                    >
                      HTTP:
                      {' '}
                      {response.status}
                    </span>
                  </th>
                  <td>{request.method}</td>
                  <td>{request.link}</td>
                  <td>{actionsContainer(response)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (<DefaultEmptySearch dark />)}
      <DefaultModal
        isOpen={responseModal}
        title="Response"
        className="default-modal"
        toggleModal={setResponseModal}
      >
        <Response
          response={selectedResponse}
          getHttpStatusColor={getHttpStatusColor}
        />
      </DefaultModal>
    </>
  );
};

export default History;
