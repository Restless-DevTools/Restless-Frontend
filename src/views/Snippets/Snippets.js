import React from 'react';
import {
  Col, Card,
} from 'reactstrap';
import SnippetForm from './SnippetForm';
import './styles.css';

function Snippets() {
  return (
    <main>
      <section className="section">
        <Col md="12">
          <Card>
            <p>Snippets</p>
            <SnippetForm />
          </Card>
        </Col>
      </section>
    </main>
  );
}

export default Snippets;
