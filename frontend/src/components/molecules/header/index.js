import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';
import { Popover } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';

import { signout } from 'config/redux/action/user.action';
import HeaderTitle from 'assets/images/banner-text.png';
import KidsLogo from 'assets/images/kids.png';

import './header.scss';

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Popover className='relative bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='borders'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link to='/'>
              <span className='sr-only'>Workflow</span>
              <img
                className='h-8 w-auto sm:h-10 logo'
                src={KidsLogo}
                alt='Logo'
              />
            </Link>
          </div>
          <div className='-mr-2 -my-2 md:hidden'>
            <Popover.Button className='popover-btn'>
              <span className='sr-only'>Open menu</span>
              <MenuIcon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <Popover.Group as='nav' className='hidden md:flex space-x-10'>
            <img src={HeaderTitle} alt='banner' height={420} width={420} />
          </Popover.Group>
          <div className='wrapper-btn'>
            <Link to='/cart' className='signin mr-3'>
              <button className='cart-btn' aria-label='Cart'>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
                </svg>
                <span className='absolute inset-0 object-right-top -mr-6'>
                  <div className='cart-badge'>{cartItems.length}</div>
                </span>
              </button>
            </Link>
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#' className='text-indigo-700'>
                  {userInfo.name}
                </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/order-history'>Order History</Link>
                  </li>
                  <br />
                  <li>
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <br />
                  <li>
                    <Link to='#signout' onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to='/login'>Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Header;
