import { useState } from 'react';
import Button from './../Components/Button';
import Input from './../Components/Input';
import './RegisterUser.scss';

const RegisterUser = props => {
    const {requestManager, onRegisterSuccess} = props;
    const [username, setUsername] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        requestManager.registerUser(
            {username: username}, 
            data => onRegisterSuccess({name: username, id: data.userId})
        );
    };
    
    return (
        <section className='register-user'>
            <form onSubmit={onSubmit}>
                Username:
                <Input name={username} onChange={e => setUsername(e.target.value)} />
                <Button type='submit'>Log in</Button>
            </form>
        </section>
    );
}

export default RegisterUser;
