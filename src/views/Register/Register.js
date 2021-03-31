import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  CardTitle, Col, Form, FormGroup,
  Input,
  InputGroup, InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import useAuth from '../../contexts/AuthenticationContext';
import Github from '../../assets/img/icons/common/github.svg';
import Logo from '../../components/Logo/Logo';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);

  const {
    abrirNotificacaoSucesso, abrirNotificacaoErro, abrirNotificacaoAlerta, register,
  } = useAuth();

  const navigate = (path) => {
    props.history.push(path || '/auth/register');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      abrirNotificacaoAlerta('Your password must contain at least 8 digits, 1 uppercase character, 1 lowercase character, 1 number and a special character', 'Register');
      return;
    }

    if (password !== confirmPassword) {
      abrirNotificacaoAlerta('Passwords entered do not match', 'Register');
      return;
    }

    const userData = {
      username, password, email, name,
    };

    const registerInfo = await register(userData);

    if (registerInfo.isValid) {
      abrirNotificacaoSucesso('User successfully registered', 'Register');
      props.history.push('/auth/login');
    } else {
      abrirNotificacaoErro(registerInfo.message, 'Register');
    }
  };

  const validatePasswordStrenght = (text) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

    console.log(re.test(text));

    if (re.test(text)) {
      setIsPasswordStrong(true);
    } else {
      setIsPasswordStrong(false);
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-secondary">
          <Logo />
        </CardHeader>
        <CardBody className="px-lg-5">
          <CardTitle tag="h3" className="text-center">Register</CardTitle>
          <div className="text-center">
            <Button
              block
              className="btn-neutral btn-icon mr-4"
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
              <span className="btn-inner--text">Sign up with Github</span>
            </Button>
          </div>
          <div className="text-center text-muted my-4">
            <small>Or sign up with credentials</small>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
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
                  onChange={(e) => {
                    validatePasswordStrenght(e.target.value);
                    setPassword(e.target.value);
                  }}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-lock" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Confirm password"
                  type="password"
                  autoComplete="off"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
              </InputGroup>
            </FormGroup>
            <div className="text-muted font-italic form-group">
              <small>
                password strength:
                {' '}
                <span className={`font-weight-700 ${isPasswordStrong ? 'text-success' : 'text-danger'}`}>
                  {isPasswordStrong ? 'strong' : 'weak'}
                </span>
              </small>
            </div>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-envelope" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => { setEmail(e.target.value); }}
                  required
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-signature" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Fullname"
                  type="text"
                  onChange={(e) => { setName(e.target.value); }}
                  required
                />
              </InputGroup>
            </FormGroup>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <Input
                    className="custom-control-input"
                    id="privacyPolicyCheck"
                    type="checkbox"
                    onChange={() => { setPrivacyPolicy(!privacyPolicy); }}
                    required
                  />
                  <Label className="custom-control-label" htmlFor="privacyPolicyCheck">
                    <span>
                      I agree with the
                      {' '}
                      <a href="/" onClick={(e) => { e.preventDefault(); }}>Privacy Policy</a>
                    </span>
                  </Label>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                block
                className="mt-4"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
            <div className="text-center">
              <Button
                block
                className="my-2"
                color="secondary"
                type="button"
                onClick={() => { navigate('/auth/login'); }}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Register;
