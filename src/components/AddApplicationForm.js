import { Button, Label, Col, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateAddApplicationForm } from "../utils/validateAddApplicationForm";
import SkillsCheckboxGroup from "./SkillsCheckboxGroup";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { baseUrl } from "../shared/baseUrl";

const AddApplicationForm = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {
        const application = {
            name: values.name,
            mode: values.mode,
            company: values.company,
            status: values.status,
            type: values.type,
            skills: values.skills,
            jobLink: values.jobLink,
            dateApplied: new Date(Date.now()).toISOString()
        };
        console.log(application);

        try {
            const response = await fetch(baseUrl + 'jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(application),
            });

            const data = await response.json();
            console.log('Success:', data);
            setModal(true); // Show the success msg modal
            resetForm();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // when user closes the modal, navigate to home page
    const toggleModal = () => {
        setModal(!modal);
        if (modal) {
            navigate('/');
            window.location.reload();
        }
    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Success</ModalHeader>
                <ModalBody>
                    New job application entered successfully!
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>OK, go to Home page</Button>
                </ModalFooter>
            </Modal>
            <Formik
                initialValues={{
                    name: "",
                    mode: "",
                    company: "",
                    status: "",
                    type: "",
                    skills: [],
                    jobLink: ""
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
                        <Label htmlFor="type" md="2">
                            Job Type
                        </Label>
                        <Col md="10">
                            <Field
                                name='type'
                                as='select'
                                className='form-control'>
                                <option>Select...</option>
                                <option>Full time</option>
                                <option>Part time</option>
                                <option>Contract</option>
                            </Field>
                            <ErrorMessage name="type">
                                {(msg) => <p className="text-danger">{msg}</p>}
                            </ErrorMessage>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="skills" md="2">
                            Preferred skills
                        </Label>
                        <Col md="10">
                            <SkillsCheckboxGroup name="skills" />
                            <ErrorMessage name="skills">
                                {(msg) => <p className="text-danger">{msg}</p>}
                            </ErrorMessage>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="jobLink" md="2">
                            Job link
                        </Label>
                        <Col md="10">
                            <Field 
                                name='jobLink'
                                placeholder='Job Link'
                                className="form-control" />
                            <ErrorMessage name="jobLink">
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
        </>
    );
}

export default AddApplicationForm