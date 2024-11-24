import { Button, Label, Col, FormGroup } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateAddApplicationForm } from "../utils/validateAddApplicationForm";
import { useNavigate } from 'react-router-dom';

const AddApplicationForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (values, { resetForm }) => {
        console.log('Application values: ', values);
        console.log('in JSON format: ', JSON.stringify(values));

        alert('New job application entered successfully!');
        resetForm();
        navigate('/');
    }

  return (
    <Formik
      initialValues={{
        name: "",
        mode: "",
        company: "",
        status: "",
      }}
      onSubmit={handleSubmit}
      validate={validateAddApplicationForm}
    >
      <Form>
        <FormGroup row>
          <Label htmlFor="name" md="2">
            Position Name
          </Label>
          <Col md="10">
            <Field 
                name='name'
                placeholder='Position Name'
                className="form-control" />
            <ErrorMessage name="name">
                {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="mode" md="2">
            Mode
          </Label>
          <Col md="10">
            <Field
                name='mode'
                as='select'
                className='form-control'>
                  <option>Select...</option>
                  <option>remote</option>
                  <option>onsite</option>
                  <option>hybrid</option>
            </Field>
            <ErrorMessage name="mode">
                {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="company" md="2">
            Company
          </Label>
          <Col md="10">
            <Field 
                name='company'
                placeholder='Company Name'
                className="form-control" />
            <ErrorMessage name="company">
                {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="status" md="2">
            Application Status
          </Label>
          <Col md="10">
            <Field
                name='status'
                as='select'
                className='form-control'>
                  <option>Select...</option>
                  <option>Resume submitted</option>
                  <option>Online Accessment</option>
                  <option>Interview 1</option>
                  <option>Interview 2</option>
            </Field>
            <ErrorMessage name="status">
                {(msg) => <p className="text-danger">{msg}</p>}
            </ErrorMessage>
          </Col>
        </FormGroup>
        <FormGroup row>
            <Col md={{ size: 10, offset: 2 }}>
                <Button type='submit' color='primary'>
                    Add Job Application
                </Button>
            </Col>
        </FormGroup>
      </Form>
    </Formik>
  );
}

export default AddApplicationForm