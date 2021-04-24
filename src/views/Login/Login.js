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
import useGlobal from '../../contexts/GlobalContext';
import useAuth from '../../contexts/AuthenticationContext';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { openSuccessNotification, openErrorNotification } = useGlobal();
  const {
    signed, login, githubLogin, clientId, redirectUri,
  } = useAuth();
  const navigate = (path) => {
    props.history.push(path || '/auth/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginInfo = await login(username, password);

    if (loginInfo.isValid) {
      openSuccessNotification('Login successfully', 'Login');
      props.history.push('/dashboard');
    } else {
      openErrorNotification(loginInfo.message, 'Login');
    }
  };

  const handleToggleLoading = () => setLoading(!loading);

  const handleGithubLogin = async (code) => {
    const githubLoginInfo = await githubLogin(code);

    if (githubLoginInfo.isValid) {
      openSuccessNotification('Login successfully', 'Login');
      props.history.push('/dashboard');
    } else {
      openErrorNotification(githubLoginInfo.message, 'Login');
      handleToggleLoading();
    }
  };

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');

    if (hasCode) {
      handleToggleLoading();

      const [redirect, code] = url.split('?code=');
      window.history.pushState({}, null, redirect);

      handleGithubLogin(code);
    }
  }, [props.history]);

  useEffect(() => {
    if (signed) {
      navigate('/dashboard');
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
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectUri}`}
              disabled={loading}
              onClick={handleToggleLoading}
            >
              <span className="btn-inner--icon mr-1">
                {loading
                  ? (<i className="text-primary fa fa-circle-notch fa-spin" />)
                  : (
                    <img
                      alt="github logo"
                      src={Github}
                    />
                  )}
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
                  maxLength={30}
                  disabled={loading}
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
                  maxLength={30}
                  disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
