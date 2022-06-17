import './register.scss';
import { useFormik } from 'formik';
import { registerValidation } from './../../../utils/form-validation';
import { Input, Gap, LoginButton } from './../../../components';

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      rememberMe: false,
    },
    registerValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='rememberMe'
                type='checkbox'
                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              />

              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-900'
              >
                Remember me
              </label>
              <br />
            </div>

            <div className='text-sm'>
              <a
                href='!#'
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Forgot your password?
              </a>
            </div>
          </div>
          {formik.errors.rememberMe ? (
            <span className='text-red-600 text-sm'>
              {formik.errors.rememberMe}
            </span>
          ) : null}
          <div>
            <LoginButton
              title='Register'
              handleClick={formik.handleSubmit}
            ></LoginButton>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
