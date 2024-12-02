export const validateAddApplicationForm = (values) => {
    const errors = {};

    if(!values.name){
        errors.name = 'Required';
    }
    if(!values.mode){
        errors.mode = 'Required';
    }
    if(!values.company){
        errors.company = 'Required';
    }
    if(!values.status){
        errors.status = 'Required';
    }
    if(!values.type){
        errors.type = 'Required';
    }

    return errors;
}