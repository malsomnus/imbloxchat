import './Button.scss';

const Button = props => {
    return (
        <button type='button' {...props} className={(props.className || '') + ' awesome-button'}>{props.children}</button>
    );
}

export default Button;
