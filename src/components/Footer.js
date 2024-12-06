import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='site-footer fixed-bottom' style={{ height: '50px' }}>
    <Container fluid className="bg-dark text-light text-center py-3">
      <Row>
        <Col >
          <div>
            © Zhaoyi Yan's Personal Project
          </div>
        </Col>
      </Row>
    </Container>
    </footer>
  )
}

export default Footer