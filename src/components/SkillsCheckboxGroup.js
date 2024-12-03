import { Field } from "formik";

const SkillsCheckboxGroup = ({ name }) => {
    let jobSkillsArray = ["JavaScript", "Python", "Java", "Go", "React", "React Native"];

    return (
        <div role="group" aria-labelledby="checkbox-group" className="d-flex flex-wrap">
            {jobSkillsArray.map((skill) => (
                <label key={skill} className="me-3">
                    <Field
                        type="checkbox"
                        name={name}
                        value={skill}
                    />
                    {skill}
                </label>
            ))}
        </div>
    );
};

export default SkillsCheckboxGroup;