import Editor from '@monaco-editor/react';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Spinner,
} from 'reactstrap';
import DefaultDynamicForm from '../../components/DefaultDynamicForm/DefaultDynamicForm';
import DefaultModal from '../../components/DefaultModal/DefaultModal';
import History from './History';
import Response from './Response';
import './styles.css';

const SendRequestsForm = (props) => {
  const {
    requests,
    requestSelected,
    openErrorNotification,
    openSuccessNotification,
  } = props;
  const [responseModal, setResponseModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [method, setMethod] = useState(requestSelected.method || 'GET');
  const [format, setFormat] = useState(requestSelected.format || 'JSON');
  const [name, setName] = useState(requestSelected.name || '');
  const [link, setLink] = useState(requestSelected.link || '');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [headerInputs, setHeaderInputs] = useState([{ id: 0, name: '', value: '' }]);
  const [queryInputs, setQueryInputs] = useState([{ id: 0, name: '', value: '' }]);

  const [requestId, setRequestId] = useState(requestSelected.id || null);
  const [code, setCode] = useState('');
  const [requestBody, setRequestBody] = useState(null);
  const [requestHeaders, setRequestHeaders] = useState(null);
  const [requestQueries, setRequestQueries] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const getRequest = async (id) => {
    try {
      const { data } = await requests.getRequest(id);

      if (!data.id) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true, data };
    } catch (error) {
      return { isValid: false, message: error.response.data.message };
    }
  };

  const loadFullRequest = async (id) => {
    const { isValid, message, data } = await getRequest(id);

    if (!isValid) {
      openErrorNotification(message, 'Request');
    } else {
      setRequestBody(data.requestBody);
      setRequestHeaders(data.requestHeaders);
      setRequestQueries(data.requestQueries);
    }
  };

  useEffect(() => {
    if (requestHeaders && requestHeaders.length) {
      setHeaderInputs(requestHeaders.map((header, index) => ({
        id: index,
        name: header.name,
        value: header.value,
      })));
    }

    if (requestQueries && requestQueries.length) {
      setQueryInputs(requestQueries.map((query, index) => ({
        id: index,
        name: query.name,
        value: query.value,
      })));
    }

    if (requestBody) {
      setCode(JSON.stringify(requestBody.body, null, 2));
    }
  }, [requestHeaders, requestQueries, requestBody]);

  useEffect(() => {
    if (requestSelected.id) {
      loadFullRequest(requestSelected.id);
      setRequestId(requestSelected.id);
      setMethod(requestSelected.method);
      setFormat(requestSelected.format);
      setName(requestSelected.name);
      setLink(requestSelected.link);
    }
  }, [requestSelected]);

  const toggleActiveTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const mountSendObjectArray = (array) => {
    const updatedArray = array.map((element) => {
      if (element.name && element.value) {
        return {
          name: element.name,
          value: element.value,
          requestId,
        };
      }

      return null;
    });

    return updatedArray.filter((element) => !!element);
  };

  const sendRequest = async (sendObject) => {
    try {
      const { data } = await requests.sendRequest(requestId, sendObject);

      if (!data.id) {
        return { isValid: false, message: data.message };
      }

      return { isValid: true, data };
    } catch (error) {
      if (error.response && error.response.data) {
        return { isValid: false, message: error.response.data.message };
      }
      return { isValid: false, message: 'Invalid Request, check if the body is valid' };
    }
  };

  const handleSendRequest = async () => {
    setLoading(true);

    if (!format) {
      openErrorNotification('Format not selected', 'Format');
      setLoading(false);
      return;
    }

    if (!method) {
      openErrorNotification('Method not selected', 'Method');
      setLoading(false);
      return;
    }

    if (!link) {
      openErrorNotification('Link not selected', 'Link');
      setLoading(false);
      return;
    }

    const sendObject = {
      method,
      name,
      format,
      link,
      groupId: requestSelected.groupId,
      requestHeaders: mountSendObjectArray(headerInputs),
      requestQueries: mountSendObjectArray(queryInputs),
    };

    if (requestBody) {
      sendObject.requestBody = { id: requestBody.id, body: code };
    }

    const requestInfo = await sendRequest(sendObject);

    if (requestInfo.isValid) {
      openSuccessNotification('Request successfully sended', 'Request');

      setResponse(requestInfo.data);
      setResponseModal(!responseModal);
    } else {
      openErrorNotification(requestInfo.message, 'Request');
    }
    setLoading(false);
  };

  return (
    <>
      <Col className="mb-5 mb-xl-0" xl="8">
        <h2 className="text-secondary">
          Request
          {' '}
          {name && `- ${name}`}
        </h2>
        <Card className="shadow">
          <CardHeader className="border-0 bg-dracula-secondary">
            <Row className="align-items-center">
              <Col md="3">
                <FormGroup className="mb-md-0">
                  <Select
                    options={methods}
                    onChange={(evt) => setMethod(evt.value)}
                    placeholder="Select method"
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
                <Button
                  onClick={handleSendRequest}
                  className="btn-icon"
                  color="primary"
                  type="button"
                  disabled={loading}
                >
                  { loading ? (<Spinner size="sm" />) : (
                    <>
                      <span>
                        <i className="fa fa-send" />
                      </span>
                      <span className="btn-inner--text">Send</span>
                    </>
                  ) }
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row className="align-items-center">
              <Col xs="3" sm="3" md="3" className="text-left mb-3 mb-md-0">
                <Button
                  onClick={() => setHistoryModal(!historyModal)}
                  className="btn-icon"
                  color="primary"
                  type="button"
                >
                  <span>
                    <i className="fa fa-history" />
                  </span>
                </Button>
              </Col>
              <Col xs="12" sm="6" md="6" className="mb-3 mb-md-0">
                <FormGroup className="mb-0">
                  <Select
                    options={formats}
                    onChange={(evt) => setFormat(evt.value)}
                    placeholder="Select format"
                    value={formats
                      .filter((opt) => opt.value === format)}
                    name="format"
                  />
                </FormGroup>
              </Col>
              <Col xs="3" sm="3" md="3" className="text-right mb-3 mb-md-0">
                <Button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="btn"
                  color="primary"
                  type="button"
                >
                  <span className="btn-inner--text">Advanced</span>
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              {(format === 'JSON') && (
                <Col md="12" lg={showAdvancedOptions ? 6 : 12}>
                  <Editor
                    height="50vh"
                    theme="vs-dark"
                    language="json"
                    value={code}
                    onChange={(value) => setCode(value)}
                  />
                </Col>
              )}
              {showAdvancedOptions && (
                <Col md="12" lg={format === 'JSON' ? 6 : 12} className="pr-2 pl-2">
                  <Nav tabs className="mt-3 mt-lg-0">
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 1 })}
                        onClick={() => { toggleActiveTab(1); }}
                      >
                        Headers
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === 2 })}
                        onClick={() => { toggleActiveTab(2); }}
                      >
                        Queries
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                      <Row className="mt-3">
                        <Col md="12">
                          <DefaultDynamicForm
                            inputs={headerInputs}
                            setInputs={setHeaderInputs}
                            inputIdentifier="Header"
                          />
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId={2}>
                      <Row className="mt-3">
                        <Col md="12">
                          <DefaultDynamicForm
                            inputs={queryInputs}
                            setInputs={setQueryInputs}
                            inputIdentifier="Query"
                          />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
      <DefaultModal
        isOpen={responseModal}
        title="Response"
        className="default-modal"
        toggleModal={setResponseModal}
      >
        <Response
          response={response}
        />
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
