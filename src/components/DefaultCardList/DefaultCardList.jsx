import { React } from 'react';
import {
  Button, Card, CardBody, Col, Row,
} from 'reactstrap';

const DefaultCardList = (props) => {
  const {
    list, edit, remove,
  } = props;

  return list && (
    list.map((request) => (
      <Card key={request.id} className="mb-1">
        <CardBody className="p-2">
          <Row className="align-items-center">
            <Col>
              <h3>{request.name}</h3>
            </Col>
            <Col className="text-right">
              {edit && (
                <Button
                  onClick={edit}
                  className="btn-icon"
                  color="primary"
                  type="button"
                >
                  <span>
                    <i className="fa fa-edit" />
                  </span>
                </Button>
              )}
              {remove && (
                <Button className="btn-icon" color="danger" type="button">
                  <span>
                    <i className="fa fa-trash" />
                  </span>
                </Button>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    ))
  );
};

export default DefaultCardList;
