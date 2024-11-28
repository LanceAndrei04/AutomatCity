import React, { useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '#home', current: true },
  { name: 'Discussion', href: '#discussion', current: false },
  { name: 'Team', href: '#team', current: false },
  { name: 'Simulator', href: '/simulator', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NavBar = () => {
  const [activeItem, setActiveItem] = useState(navigation[0].name); // Set initial active item

  const handleNavClick = (item) => {
    setActiveItem(item.name);

    // Prevent URL update and scroll to top for Home
    if (item.name === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Smooth scrolling for other sections
    if (item.href.startsWith('#')) {
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Disclosure as="nav" className="bg-blue-400 shadow-lg z-20">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <h2 className="text-2xl font-bold text-blue-950 hover:text-blue-400">Automat City</h2>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.name === 'Simulator' ? (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item)} // Set active item on click
                      className={classNames(
                        activeItem === item.name
                          ? 'bg-blue-200 text-blue-950'
                          : 'text-gray-600 hover:bg-blue-700 hover:text-white',
                        'rounded-md px-3 py-2 text-l font-medium flex items-center' // Ensure alignment
                      )}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item)} // Set active item on click
                      aria-current={activeItem === item.name ? 'page' : undefined}
                      className={classNames(
                        activeItem === item.name
                          ? 'bg-blue-200 text-blue-950'
                          : 'text-gray-600 hover:bg-blue-700 hover:text-white',
                        'rounded-md px-3 py-2 text-l font-medium flex items-center' // Ensure alignment
                      )}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="button"
              onClick={() => handleNavClick(item)} // Set active item on click
              aria-current={activeItem === item.name ? 'page' : undefined}
              className={classNames(
                activeItem === item.name
                  ? 'bg-blue-900 text-white'
                  : 'text-gray-300 hover:bg-blue-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default NavBar;
