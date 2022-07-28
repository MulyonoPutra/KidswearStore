import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { solutions, callsToAction } from 'utils/header.collection';
import { classNames } from 'components/molecules/header';
import './dropdown-menu.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from 'config/redux/action/user.action';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(solutions);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    console.log('handleLogout');
    dispatch(signout());
  };

  const onSubmit = (item) => {
    console.log('onSubmit', item);
    if (item.name === 'Login') {
      handleLogin();
    }
    if (item.name === 'Register') {
      handleRegister();
    }
    if (item.name === 'Logout') {
      handleLogout();
    }
  };

  

  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          {userInfo ? (
            <Popover.Button
              className={classNames(
                open ? 'text-gray-900' : 'text-gray-500',
                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              )}
            >
              <span>{userInfo.name}</span>
              <ChevronDownIcon
                className={classNames(
                  open ? 'text-gray-600' : 'text-gray-400',
                  'ml-2 h-5 w-5 group-hover:text-gray-500'
                )}
                aria-hidden='true'
              />
            </Popover.Button>
          ) : (
            <Link to='/login' className='text-gray-900'>Sign In</Link>
          )}

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='popover-panel'>
              <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                  {data.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSubmit(item)}
                      className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 cursor-pointer'
                    >
                      <item.icon
                        className='flex-shrink-0 h-6 w-6 text-indigo-600'
                        aria-hidden='true'
                      />
                      <div className='ml-4'>
                        <p className='text-base font-medium text-gray-900'>
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8'>
                  {callsToAction.map((item) => (
                    <div key={item.name} className='flow-root'>
                      <a
                        href={item.href}
                        className='-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100'
                      >
                        <item.icon
                          className='flex-shrink-0 h-6 w-6 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>{item.name}</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DropdownMenu;
