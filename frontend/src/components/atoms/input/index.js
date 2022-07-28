import './input.scss'

const Input = ({ label, ...rest }) => {
    return (
      <div>
        <label htmlFor='email-address' className='sr-only'>
          {label}
        </label>
        <input {...rest} />
      </div>
    );
  };
  
  export default Input;