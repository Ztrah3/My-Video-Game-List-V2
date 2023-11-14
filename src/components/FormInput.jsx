import '../styles/formInputStyles.scss';

// FormInput component
const FormInput = ({ label, ...otherProps }) => {
    return (
         // Render an input element with any other props passed to the FormInput component
        // If a label prop is provided, render a label element
        // The label element has the 'shrink' CSS class if the input's value is not empty
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && (
                <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
        </div>
    );
};

export default FormInput; 