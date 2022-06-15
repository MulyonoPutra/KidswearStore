import { LockClosedIcon } from '@heroicons/react/solid';
import './login-button.scss';

const LoginButton = ({ title, handleClick }) => {
    return (
      <button type='submit' className='btn-style' onClick={handleClick}>
        <span className='closed-icon-wrapper'>
          <LockClosedIcon className='closed-icon' aria-hidden='true' />
        </span>
        {title}
      </button>
    );
  };
  
  export default LoginButton;