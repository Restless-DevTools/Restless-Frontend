import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  Col, Container, Progress,
  Row, Table,
} from 'reactstrap';
import RequestsHeader from '../../components/Headers/RequestsHeader';

const Requests = () => (
  <>
    <RequestsHeader />
    <Container fluid>
      <Row className="mt-5">
        <Col className="mb-5 mb-xl-0" xl="8">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Page visits</h3>
                </div>
                <div className="col text-right">
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    See all
                  </Button>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Page name</th>
                  <th scope="col">Visitors</th>
                  <th scope="col">Unique users</th>
                  <th scope="col">Bounce rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">/argon/</th>
                  <td>4,569</td>
                  <td>340</td>
                  <td>
                    <i className="fa fa-arrow-up text-success mr-3" />
                    {' '}
                    46,53%
                  </td>
                </tr>
                <tr>
                  <th scope="row">/argon/index.html</th>
                  <td>3,985</td>
                  <td>319</td>
                  <td>
                    <i className="fa fa-arrow-down text-warning mr-3" />
                    {' '}
                    46,53%
                  </td>
                </tr>
                <tr>
                  <th scope="row">/argon/charts.html</th>
                  <td>3,513</td>
                  <td>294</td>
                  <td>
                    <i className="fa fa-arrow-down text-warning mr-3" />
                    {' '}
                    36,49%
                  </td>
                </tr>
                <tr>
                  <th scope="row">/argon/tables.html</th>
                  <td>2,050</td>
                  <td>147</td>
                  <td>
                    <i className="fa fa-arrow-up text-success mr-3" />
                    {' '}
                    50,87%
                  </td>
                </tr>
                <tr>
                  <th scope="row">/argon/profile.html</th>
                  <td>1,795</td>
                  <td>190</td>
                  <td>
                    <i className="fa fa-arrow-down text-danger mr-3" />
                    {' '}
                    46,53%
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <div className="col">
                  <h3 className="mb-0">Social traffic</h3>
                </div>
                <div className="col text-right">
                  <Button
                    color="primary"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    See all
                  </Button>
                </div>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Referral</th>
                  <th scope="col">Visitors</th>
                  <th scope="col">{' '}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Facebook</th>
                  <td>1,480</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">60%</span>
                      <div>
                        <Progress
                          max="100"
                          value="60"
                          barClassName="bg-gradient-danger"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Facebook</th>
                  <td>5,480</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">70%</span>
                      <div>
                        <Progress
                          max="100"
                          value="70"
                          barClassName="bg-gradient-success"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Google</th>
                  <td>4,807</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">80%</span>
                      <div>
                        <Progress max="100" value="80" />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Instagram</th>
                  <td>3,678</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">75%</span>
                      <div>
                        <Progress
                          max="100"
                          value="75"
                          barClassName="bg-gradient-info"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">twitter</th>
                  <td>2,645</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">30%</span>
                      <div>
                        <Progress
                          max="100"
                          value="30"
                          barClassName="bg-gradient-warning"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);

export default Requests;
