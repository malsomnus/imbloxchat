import { Link } from 'react-router-dom';
import './TopBar.scss';

const TopBar = props => {
    const {currentUser} = props;
    
    return (
        <section className='top-bar'>
            {(typeof (currentUser || {}).id === 'undefined' ) ? (
                <Link to='/registeruser'>Click here to log in</Link>
            ) : (
                `Currently logged in as: ${currentUser.name} (#${currentUser.id})`
            )}
        </section>
    );
}

export default TopBar;
