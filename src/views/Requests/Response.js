import Editor from '@monaco-editor/react';
import React, { useState } from 'react';
import {
  Button,
  Col, Row, Table,
} from 'reactstrap';
import FileSizeUtils from '../../utils/FileSizeUtils';
import DateUtils from '../../utils/DateUtils';
import './styles.css';

const Response = ({ response, getHttpStatusColor }) => {
  const {
    status,
    data,
    size,
    allTransactionTime,
    requestTime,
    responseHeaders,
  } = response;

  const [showHeaders, setShowHeaders] = useState(true);

  return (
    <div className="form-page">
      <Row>
        <Col md="8">
          <Editor
            height="50vh"
            theme="vs-dark"
            defaultLanguage="json"
            defaultValue={JSON.stringify(data, null, 2)}
            options={{
              autoIndent: 'full',
              formatOnPaste: true,
              formatOnType: true,
              readOnly: true,
            }}
          />
        </Col>
        <Col md="4" className="mt-3 mt-md-0">
          <Row>
            <h3>
              HTTP status:
              {' '}
              <span
                className="text-darker pl-1 pr-1 bold"
                style={{ background: getHttpStatusColor(status) }}
              >
                {status}
              </span>
            </h3>
          </Row>
          <Row>
            <h3>
              Size:
              {' '}
              {FileSizeUtils.formatFileSize(size.split('.')[0])}
            </h3>
          </Row>
          <Row>
            <h3>
              Total time:
              {' '}
              {DateUtils.formatTimeFromMilliseconds(allTransactionTime)}
            </h3>
          </Row>
          <Row>
            <h3>
              Request time:
              {' '}
              {DateUtils.formatTimeFromMilliseconds(requestTime)}
            </h3>
          </Row>
          {(responseHeaders && responseHeaders.length > 0) && (
            <>
              <Row>
                <Button onClick={() => { setShowHeaders(!showHeaders); }} className="btn-icon" color="primary" type="button">
                  <span>
                    <i className="fa fa-info" />
                  </span>
                  <span className="btn-inner--text">Headers</span>
                </Button>
              </Row>
              {showHeaders && (
                <Row className="mt-3">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responseHeaders.map((header) => (
                        <tr key={header.id}>
                          <td>{header.name}</td>
                          <td>{header.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Response;
