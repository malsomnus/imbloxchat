import './Input.scss';

const Input = props => {
    return (
        <input {...props} className={(props.className || '') + ' awesome-input'} />
    );
}

export default Input;
