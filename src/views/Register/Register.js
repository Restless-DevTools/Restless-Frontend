import React from 'react';
import {
  Button,
  Card,
  CardBody, CardHeader,
  CardTitle, Col, Form, FormGroup,
  Input,
  InputGroup, InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
import Github from '../../assets/img/icons/common/github.svg';
import Logo from '../../components/Logo/Logo';

const Register = (props) => {
  const navigate = (path) => {
    props.history.push(path || '/auth/register');
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
                  alt="..."
                  src={Github}
                />
              </span>
              <span className="btn-inner--text">Sign up with Github</span>
            </Button>
          </div>
          <div className="text-center text-muted my-4">
            <small>Or sign up with credentials</small>
          </div>
          <Form role="form">
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Username" type="text" />
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
                />
              </InputGroup>
            </FormGroup>
            <div className="text-muted font-italic form-group">
              <small>
                password strength:
                {' '}
                <span className="text-success font-weight-700">
                  strong
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
                <Input placeholder="Email" type="email" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-signature" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Fullname" type="text" />
              </InputGroup>
            </FormGroup>
            <Row className="my-4">
              <Col xs="12">
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="customCheckRegister"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheckRegister"
                  >
                    <span>
                      I agree with the
                      {' '}
                      <a
                        href="/"
                        onClick={(e) => { e.preventDefault(); navigate(); }}
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button
                block
                className="mt-4"
                color="primary"
                type="button"
                onClick={() => { navigate('/auth/login'); }}
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
