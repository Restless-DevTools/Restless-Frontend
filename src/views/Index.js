/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';

// reactstrap components
import {
  Container,
  Row,
} from 'reactstrap';

// core components
import DemoNavbar from '../components/Navbars/DemoNavbar';
import CardsFooter from '../components/Footers/CardsFooter';

class Index extends Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section">
            <Container>
              <p>Container aqui</p>
            </Container>
          </section>
          <section className="section section-components">
            <Container>
              <Row className="row-grid justify-content-between align-items-center mt-lg">
                <p>Podemos colocar algo aqui</p>
              </Row>
            </Container>
          </section>
        </main>
        <CardsFooter />
      </>
    );
  }
}

export default Index;
