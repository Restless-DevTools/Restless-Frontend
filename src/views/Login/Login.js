import React, { useEffect, useRef } from "react";

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
} from 'reactstrap';

import SimpleFooter from "components/Footers/SimpleFooter.js";
import CardTitle from "reactstrap/lib/CardTitle";

const Login = (props) => {
  const main = useRef({ scrollTop: 0 });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [props])

  return (
    <>
      <main ref={main}>
        <section className="section section-shaped vh-100 login-section">
          <div className="shape shape-style-1 bg-gradient-default" />
          <Container className="pt-lg-3">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardHeader className="bg-secondary">
                    <CardTitle tag="h3" className="text-center">Login</CardTitle>
                    <div className="btn-wrapper text-center">
                      <Button
                        block
                        className="btn-neutral btn-icon"
                        color="default"
                        href="#"
                        onClick={e => e.preventDefault()}
                      >
                        <span className="btn-inner--icon mr-1">
                          <img
                            alt="..."
                            src={require("assets/img/icons/common/github.svg")}
                          />
                        </span>
                        <span className="btn-inner--text">Sign in with Github</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="px-lg-5">
                    <div className="text-center text-muted mb-4">
                      <small>Or sign in with credentials</small>
                    </div>
                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
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
                      <div className="text-center">
                        <Button
                          block
                          className="my-2"
                          color="primary"
                          type="button"
                        >
                          Sign in
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button
                          block
                          className="my-2"
                          color="outline-primary"
                          type="button"
                        >
                          Sign Up
                        </Button>
                      </div>
                      <div className="text-center">
                        <Button
                          block
                          className="text-muted"
                          color="link"
                          href="#"
                          onClick={e => e.preventDefault()}
                        >
                          <small>Forgot password?</small>
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
    </>
  );
}

export default Login;
