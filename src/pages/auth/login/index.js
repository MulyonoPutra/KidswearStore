import { LoginButton, Input, Gap } from '../../../components';
import './login.scss';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginValidation } from './../../../utils/form-validation';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    loginValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });


  return (
    <div className='wrapper'>
      <div className='max-w-md w-full space-y-4'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='sign-in-text'>Sign in to your account</h2>
        </div>
        <form className='mt-8 space-y-6'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <Input
              label='email'
              name='email'
              placeholder='Email Address'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email ? (
              <span className='text-red-600 text-sm'>
                {formik.errors.email}
              </span>
            ) : null}
            <Gap height={10} />
            <Input
              label='password'
              name='password'
              placeholder='Password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password ? (
              <span className='text-red-600 text-sm'>
                {formik.errors.password}
              </span>
            ) : null}
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='checkbox'
              />
              <label className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div className='text-sm'>
              <Link to='/' className='text-forgot-password'>
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <LoginButton
              title='Sign In'
              handleClick={formik.handleSubmit}
            ></LoginButton>
          </div>
        </form>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-sm'>
            <span>New Customer?</span>
            <span className='ml-2 block text-gray-900 text-forgot-password'>
              <Link to='/register'>Create your account</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
