import { LockClosedIcon } from '@heroicons/react/solid';
import './login-button.scss';

const LoginButton = ({ title, type, handleClick }) => {
    return (
      <button type={type} className='btn-style' onClick={handleClick}>
        <span className='closed-icon-wrapper'>
          <LockClosedIcon className='closed-icon' aria-hidden='true' />
        </span>
        {title}
      </button>
    );
  };
  
  export default LoginButton;