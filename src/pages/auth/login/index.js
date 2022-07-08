import { useEffect, useState } from 'react';

import './login.scss';

import {
  LoginButton,
  Input,
  Gap,
  ErrorToast,
  Loading,
} from '../../../components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../../config/redux/action/user.action';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

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
        {loading && <Loading />}
        {error && <ErrorToast />}
        <form className='mt-8 space-y-6' onSubmit={submitHandler}>
          <input type='hidden' name='remember' defaultValue='true' />
          <div className='rounded-md shadow-sm -space-y-px'>
            <Input
              label='email'
              placeholder='Email Address'
              id='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Gap height={10} />
            <Input
              label='password'
              placeholder='Password'
              id='password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex items-center justify-between'>
            <Gap />
            <div className='text-sm'>
              <Link to='/' className='text-forgot-password'>
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <LoginButton title='Sign In' type='submit'></LoginButton>
          </div>
        </form>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-sm'>
            <span>New Customer?</span>
            <span className='ml-2 block text-gray-900 text-forgot-password'>
              <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
