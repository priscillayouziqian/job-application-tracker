export const validateNoteForm = (values) => {
    const errors = {};

    if(!values.note){
        errors.note = 'Required';
    }

    return errors;
}