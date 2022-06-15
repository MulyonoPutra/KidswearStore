import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { solutions, resources } from 'utils/header.collection';
import './header.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import KidsLogo from 'assets/images/kids.png';
import HeaderTitle from 'assets/images/banner-text.png';

/* import { DropdownMenu, MoreMenu } from 'components'; */

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
            {/*   <DropdownMenu/> */}

            {/* <Link to='/checkout' className='link'>
              Checkout
            </Link>
            <Link to='/shipping' className='link'>
              Docs
            </Link> */}
            <img src={HeaderTitle} alt="banner" height={420} width={420}/>

            {/* <MoreMenu/> */}
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
                  
                  <div className='cart-badge'>
                  {cartItems.length}
                  </div>
                </span>
              </button>
            </Link>
            <Link to='/login' className='signin'>
              Sign in
            </Link>
            <Link to='/shipping' className='signup'>
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
        >
          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
            <div className='pt-5 pb-6 px-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                    alt='Workflow'
                  />
                </div>
                <div className='-mr-2'>
                  <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='mt-6'>
                <nav className='grid gap-y-8'>
                  {solutions.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                    >
                      <item.icon
                        className='flex-shrink-0 h-6 w-6 text-indigo-600'
                        aria-hidden='true'
                      />
                      <span className='ml-3 text-base font-medium text-gray-900'>
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>
            <div className='py-6 px-5 space-y-6'>
              <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                <a
                  href='!#'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Pricing
                </a>

                <Link
                  to='/shipping'
                  className='text-base font-medium text-gray-900 hover:text-gray-700'
                >
                  Docs
                </Link>
                {resources.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='text-base font-medium text-gray-900 hover:text-gray-700'
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div>
                <button className='sign-up-btn'>Sign up</button>
                <p className='mt-6 text-center text-base font-medium text-gray-500'>
                  Existing customer?
                  <button className='text-indigo-600 hover:text-indigo-500'>
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Header;
