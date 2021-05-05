import Editor from '@monaco-editor/react';
import React, { useState } from 'react';
import {
  Button,
  Col, Row, Table,
} from 'reactstrap';
import './styles.css';
import FileSizeUtils from '../../utils/FileSizeUtils';

const Response = (props) => {
  const {
    status,
    data,
    size,
  } = props.response;

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
            <h3 className="text-success">
              HTTP status:
              {' '}
              {status}
            </h3>
          </Row>
          <Row>
            <h4>
              Size:
              {' '}
              {FileSizeUtils.formatFileSize(size)}
            </h4>
          </Row>
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
                  <tr>
                    <td>X-Powered-By</td>
                    <td>Express</td>
                  </tr>
                  <tr>
                    <td>Access-Control-Allow-Origin</td>
                    <td>*</td>
                  </tr>
                  <tr>
                    <td>Content-Type</td>
                    <td>application/json; charset=utf-8</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Response;
