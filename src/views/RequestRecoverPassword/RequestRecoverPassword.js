import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  Col, Form, FormGroup,
  Input,
  InputGroup, InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import CardTitle from 'reactstrap/lib/CardTitle';
import useAuth from '../../contexts/AuthenticationContext';
import Logo from '../../components/Logo/Logo';
import useGlobal from '../../contexts/GlobalContext';

const RequestRecoverPassword = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { requestRecoverPassword } = useAuth();
  const { openSuccessNotification, openErrorNotification } = useGlobal();

  const navigate = (path) => {
    props.history.push(path || '/auth/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {};

    if (username) {
      userData.username = username;
    }

    if (email) {
      userData.email = email;
    }

    const recoverPasswordInfo = await requestRecoverPassword(userData);

    if (recoverPasswordInfo.isValid) {
      openSuccessNotification(recoverPasswordInfo.message, 'Recover password');
      navigate('/auth/recover-password');
    } else {
      openErrorNotification(recoverPasswordInfo.message, 'Register');
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-secondary">
          <Logo />
        </CardHeader>
        <CardBody className="px-lg-5">
          <CardTitle tag="h3" className="text-center">Request Recover Password</CardTitle>
          <div className="text-center text-muted my-4">
            <small>Recover your password using your username</small>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  defaultValue={username}
                  placeholder="Username"
                  type="text"
                  onChange={(e) => { setUsername(e.target.value); }}
                  maxLength={30}
                  required={!email}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center text-muted my-4">
              <small>Or recover using email</small>
            </div>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-envelope" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  defaultValue={email}
                  placeholder="Email"
                  type="email"
                  onChange={(e) => { setEmail(e.target.value); }}
                  maxLength={50}
                  required={!username}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button
                block
                className="my-2"
                color="primary"
                type="submit"
              >
                Recover
              </Button>
            </div>
            <div className="text-center">
              <Button
                block
                className="text-muted"
                color="link"
                onClick={() => { navigate('/auth/login'); }}
              >
                <small>Remembered your password?</small>
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RequestRecoverPassword;
