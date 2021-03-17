/* eslint-disable react/no-string-refs */
import React, { useEffect, useRef } from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  CardTitle,
} from 'reactstrap';

// core components
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from '../../components/Logo/Logo';
import SimpleFooter from '../../components/Footers/SimpleFooter';
import Github from '../../assets/img/icons/common/github.svg';

const Register = (props) => {
  const history = useHistory();
  const main = useRef({ scrollTop: 0 });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [props]);

  const navigate = (path) => {
    history.push(path || '/register-page');
  };

  return (
    <main ref={main}>
      <section className="section section-shaped section-lg min-vh-100 section-min-height py-3">
        <div className="shape shape-style-1 bg-gradient-default" />
        <Container className="pt-lg-3">
          <Row className="justify-content-center">
            <Col lg="5">
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
                            <i className="ni ni-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Username" type="text" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
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
                            <i className="ni ni-lock-circle-open" />
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
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="email" />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-id-card" />
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
                        onClick={() => { navigate('/login-page'); }}
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
                        onClick={() => { navigate('/login-page'); }}
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <SimpleFooter />
    </main>
  );
};

export default Register;
