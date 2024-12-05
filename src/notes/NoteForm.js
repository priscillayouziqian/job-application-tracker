import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { validateNoteForm } from '../utils/validateNoteForm';
import { useDispatch } from 'react-redux';
import { postNote } from './notesSlice';

const NoteForm = ({jobId}) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const note = {
          jobId: parseInt(jobId),
          note: values.note,
          date: new Date(Date.now()).toISOString()
        };
        dispatch(postNote(note));
        console.log(note);
        setModalOpen(false);
    }

  return (
    <>
      <Button outline onClick={() => setModalOpen(true)}>
        <i className="fa fa-pencil fa-lg" /> Add note
      </Button>

      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(false)}>Add Note</ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              note: "",
            }}
            onSubmit={handleSubmit}
            validate={validateNoteForm}
          >
            <Form>
              <FormGroup>
                <Label htmlFor="note">Note</Label>
                <Field
                  name="note"
                  as="textarea"
                  rows="8"
                  className="form-control"
                />
                <ErrorMessage name="note">
                    {(msg) => <p className="text-danger">{msg}</p>}
                </ErrorMessage>
              </FormGroup>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
}

export default NoteForm;