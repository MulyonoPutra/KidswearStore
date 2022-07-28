import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { recentPosts, resources } from 'utils/header.collection';
import './more-menu.scss';
import { classNames } from 'components/molecules/header';

const MoreMenu = () => {
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span>More</span>
            <ChevronDownIcon
              className={classNames(
                open ? 'text-gray-600' : 'text-gray-400',
                'ml-2 h-5 w-5 group-hover:text-gray-500'
              )}
              aria-hidden='true'
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0'>
              <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                  {resources.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                    >
                      <item.icon
                        className='flex-shrink-0 h-6 w-6 text-indigo-600'
                        aria-hidden='true'
                      />
                      <div className='ml-4'>
                        <p className='text-base font-medium text-gray-900'>
                          {item.name}
                        </p>
                        <p className='mt-1 text-sm text-gray-500'>
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className='px-5 py-5 bg-gray-50 sm:px-8 sm:py-8'>
                  <div>
                    <h3 className='text-sm tracking-wide font-medium text-gray-500 uppercase'>
                      Recent Posts
                    </h3>
                    <ul role='list' className='mt-4 space-y-4'>
                      {recentPosts.map((post) => (
                        <li key={post.id} className='text-base truncate'>
                          <a
                            href={post.href}
                            className='font-medium text-gray-900 hover:text-gray-700'
                          >
                            {post.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='mt-5 text-sm'>
                    <a
                      href='!#'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {' '}
                      View all posts <span aria-hidden='true'>&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default MoreMenu;
