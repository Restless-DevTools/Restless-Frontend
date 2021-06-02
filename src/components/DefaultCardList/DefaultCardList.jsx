import { React } from 'react';
import {
  Button, Card, Col, Row,
} from 'reactstrap';

import './styles.css';

const DefaultCardList = (props) => {
  const {
    list, edit, remove, handleItemClick,
  } = props;

  const handleRequestClick = (request) => {
    handleItemClick(request);
  };

  return list && (
    list.map((request) => (
      <Card key={request.id} className="default-collapse-list-card">
        <Row className="align-items-center">
          <Col md="8">
            <Button
              color="link"
              type="button"
              onClick={() => handleRequestClick(request)}
              block
              className="button-link"
            >
              {request.name}
            </Button>
          </Col>
          <Col md="4" className="text-right">
            {edit && (
            <Button
              onClick={() => edit(request.id)}
              className="btn-icon"
              color="primary"
              type="button"
              size="sm"
            >
              <span>
                <i className="fa fa-edit" />
              </span>
            </Button>
            )}
            {remove && (
            <Button
              className="btn-icon"
              color="danger"
              type="button"
              size="sm"
              onClick={() => remove(request.id)}
            >
              <span>
                <i className="fa fa-trash" />
              </span>
            </Button>
            )}
          </Col>
        </Row>
      </Card>
    ))
  );
};

export default DefaultCardList;
