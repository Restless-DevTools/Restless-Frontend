import Editor from '@monaco-editor/react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
  Button,
  Card,
  CardBody,

  CardHeader,
  Col,
  FormGroup,
  Input,
  Row,
} from 'reactstrap';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import History from './History';
import Response from './Response';
import './styles.css';

const SendRequestsForm = (props) => {
  const {
    requestSelected,
    openErrorNotification,
    openSuccessNotification,
  } = props;
  const [method, setMethod] = useState(requestSelected.method || 'GET');
  const [format, setFormat] = useState(requestSelected.format || 'JSON');
  const [code, setCode] = useState(requestSelected.body || '');
  const [name, setName] = useState(requestSelected.name || '');
  const [responseModal, setResponseModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [link, setLink] = useState(requestSelected.link || '');

  const [methods] = useState([
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'DELETE', value: 'DELETE' },
  ]);

  const [formats] = useState([
    { label: 'JSON', value: 'JSON' },
    { label: 'NO BODY', value: 'NO BODY' },
  ]);

  useEffect(() => {
    if (requestSelected) {
      setMethod(requestSelected.method);
      setFormat(requestSelected.format);
      setCode(requestSelected.body);
      setName(requestSelected.name);
      setLink(requestSelected.link);
    }
  }, [requestSelected]);

  const sendRequest = () => {
    if (!link) {
      openErrorNotification('Link not selected', 'Link');
      return;
    }

    const sendObject = {
      method,
      name,
      format,
      groupId: requestSelected.groupId,
      link,
      requestBody: { body: code },
      requestHeader: [],
      requestQuery: [],
    };

    console.log(sendObject);
    // call sendRequest

    setResponseModal(!responseModal);
  };

  return (
    <>
      <Col className="mb-5 mb-xl-0" xl="8">
        <h2 className="text-secondary">
          Request -
          {' '}
          {name}
        </h2>
        <Card className="shadow">
          <CardHeader className="border-0 bg-dracula-secondary">
            <Row className="align-items-center">
              <Col md="3">
                <FormGroup className="mb-md-0">
                  <Select
                    options={methods}
                    onChange={(evt) => setMethod(evt.value)}
                    placeholder="Select Collection"
                    value={methods
                      .filter((opt) => opt.value === method)}
                    name="method"
                  />
                </FormGroup>
              </Col>
              <Col md="7">
                <FormGroup className="mb-md-0">
                  <Input
                    id="link"
                    placeholder="https://www.example.com"
                    type="text"
                    defaultValue={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md="2" className="text-center px-md-0">
                <Button onClick={() => sendRequest()} className="btn-icon" color="primary" type="button">
                  <span>
                    <i className="fa fa-send" />
                  </span>
                  <span className="btn-inner--text">Send</span>
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col xs="3" sm="2" md="3" className="text-left mb-3 mb-md-0">
                <Button onClick={() => setHistoryModal(!historyModal)} className="btn-icon" color="primary" type="button">
                  <span>
                    <i className="fa fa-history" />
                  </span>
                </Button>
              </Col>
              <Col xs="9" sm="10" md="4" className="mb-3 mb-md-0">
                <FormGroup className="mb-0">
                  <Select
                    options={formats}
                    onChange={(evt) => setFormat(evt.value)}
                    placeholder="Select Format"
                    value={formats
                      .filter((opt) => opt.value === format)}
                    name="format"
                  />
                </FormGroup>
              </Col>
              <Col className="text-center text-md-left">
                <Button className="btn" color="primary" type="button">
                  <span className="btn-inner--text">Headers</span>
                </Button>
                <Button className="btn" color="primary" type="button">
                  <span className="btn-inner--text">Query</span>
                </Button>
              </Col>
            </Row>
            {(format === 'JSON') && (
            <Row className="mt-3">
              <Col md="12">
                <Editor
                  height="50vh"
                  theme="vs-dark"
                  language="json"
                  defaultValue={code}
                  onChange={(value) => setCode(value)}
                />
              </Col>
            </Row>
            )}
          </CardBody>
        </Card>
      </Col>
      <DefaultModal
        isOpen={responseModal}
        title="Response"
        className="default-modal"
        toggleModal={setResponseModal}
      >
        <Response />
      </DefaultModal>
      <DefaultModal
        isOpen={historyModal}
        title="Response history"
        className="default-modal"
        toggleModal={setHistoryModal}
      >
        <History />
      </DefaultModal>
    </>
  );
};

export default SendRequestsForm;
