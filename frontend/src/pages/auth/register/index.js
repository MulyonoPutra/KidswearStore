import { useFormik } from 'formik';

import { registerValidation } from '../../../utils/form-validation';

import './register.scss';

import {
  Input,
  Gap,
  LoginButton,
  Loading,
  ErrorToast,
} from './../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'config/redux/action/user.action';
import { useEffect } from 'react';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    registerValidation,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        alert('Password and Confirm Password must be same');
      } else {
        dispatch(register(values.username, values.email, values.password));
        navigate(redirect);
      }
    },
  });

  const navigateUrl = () => {
    navigate(`/login?redirect=${redirect}`);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className='wrapper'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
            alt='Workflow'
          />
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Register
          </h2>
        </div>
        {loading && <Loading />}
        {error && <ErrorToast />}
        <form className='mt-8 space-y-6'>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <Input
              label='username'
              placeholder='Username'
              name='username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? (
              <span className='text-red-600 text-sm'>
                {formik.errors.username}
              </span>
            ) : null}
            <Gap height={10} />
            <Input
              label='email'
              placeholder='Email Address'
              name='email'
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
              placeholder='Password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Gap height={10} />
            <Input
              label='confirm-password'
              placeholder='Confirm Password'
              name='confirmPassword'
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </div>

          <div>
            <LoginButton
              title='Register'
              handleClick={formik.handleSubmit}
            ></LoginButton>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <label
                htmlFor='remember-me'
                className='block text-sm text-gray-900'
              >
                Already have an account? please{' '}
                <span
                  className='underline text-indigo-500'
                  onClick={navigateUrl}
                >
                  Sign in.
                </span>
              </label>
              <br />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
