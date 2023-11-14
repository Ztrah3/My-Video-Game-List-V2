import '../styles/buttonStyle.scss'

// Object to map button types to their corresponding CSS classes
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
};

// Button component
const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        // Render a button with the appropriate CSS classes based on the buttonType prop
        // Pass any other props to the button element
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button; 