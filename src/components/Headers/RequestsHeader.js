import React, { useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Col, Container, FormGroup, Row,
} from 'reactstrap';

const RequestsHeader = () => {
  const [collection, setCollection] = useState(1);

  const [collections] = useState([
    { label: 'Coleção 1', value: 1 },
    { label: 'Coleção 2', value: 2 },
  ]);

  return (
    <div className="header bg-gradient-info py-3">
      <Container fluid>
        <Row className="align-items-center">
          <Col xs="9" sm="9" md="6" lg="3" className="xs-m-0 ml-auto">
            <FormGroup className="m-0">
              <Select
                options={collections}
                onChange={(evt) => setCollection(evt ? evt.value : '')}
                placeholder="Select Collection"
                value={collections
                  .filter((opt) => opt.value === collection)}
                name="collection"
                isClearable
              />
            </FormGroup>
          </Col>
          <Col xs="1" sm="1" md="1" lg="1" className="mr-auto">
            <Button className="btn-icon" color="primary" type="button">
              <span className="btn-inner--icon">
                <i className="fa fa-plus" />
              </span>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestsHeader;
