import React, { useEffect, useState } from 'react';
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
import Github from '../../assets/img/icons/common/github.svg';
import Logo from '../../components/Logo/Logo';
import useAuth from '../../contexts/AuthenticationContext';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    abrirNotificacaoSucesso, abrirNotificacaoErro, login, signed,
  } = useAuth();
  const navigate = (path) => {
    props.history.push(path || '/auth/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = await login(username, password);

    if (loginInfo.isValid) {
      abrirNotificacaoSucesso('Login successfully', 'Login');
      props.history.push('/dashboard/requests');
    } else {
      abrirNotificacaoErro(loginInfo.message, 'Login');
    }
  };

  useEffect(() => {
    if (signed) {
      navigate('/dashboard/requests');
    }
  }, [signed]);

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-secondary">
          <Logo />
        </CardHeader>
        <CardBody className="px-lg-5">
          <CardTitle tag="h3" className="text-center">Login</CardTitle>
          <div className="btn-wrapper text-center">
            <Button
              block
              className="btn-neutral btn-icon"
              color="default"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <span className="btn-inner--icon mr-1">
                <img
                  alt="github logo"
                  src={Github}
                />
              </span>
              <span className="btn-inner--text">Sign in with Github</span>
            </Button>
          </div>
          <div className="text-center text-muted my-4">
            <small>Or sign in with credentials</small>
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
                  placeholder="Username"
                  type="text"
                  onChange={(e) => { setUsername(e.target.value); }}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-lock" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => { setPassword(e.target.value); }}
                  required
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
                Sign In
              </Button>
            </div>
            <div className="text-center">
              <Button
                block
                className="my-2"
                color="secondary"
                type="button"
                onClick={() => { navigate('/auth/register'); }}
              >
                Sign Up
              </Button>
            </div>
            <div className="text-center">
              <Button
                block
                className="text-muted"
                color="link"
                onClick={() => { navigate('/auth/login'); }}
              >
                <small>Forgot password?</small>
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Login;
