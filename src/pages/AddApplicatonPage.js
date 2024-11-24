import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import AddApplicationForm from '../components/AddApplicationForm'

const AddApplicatonPage = () => {
  return (
    <Container className="bg-light border">
      <Row className='row-content'>
        <Col xs='12'>
          <h2 className="mt-3">Add A New Job Application</h2>
          <hr />
        </Col>
        <Col md='10'>
          <AddApplicationForm />
        </Col>
      </Row>
    </Container>
  )
}

export default AddApplicatonPage