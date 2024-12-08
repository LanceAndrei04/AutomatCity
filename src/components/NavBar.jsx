import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '#home', current: true },
  { name: 'Discussion', href: '#discussion', current: false },
  { name: 'Team', href: '#team', current: false },
  { name: 'Simulator', href: '/simulator', current: false },
];

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation
        .filter(item => item.href.startsWith('#'))
        .map(item => ({
          name: item.name,
          element: document.querySelector(item.href)
        }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveItem(section.name);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveItem('Home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    if (item.name === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (item.href.startsWith('#')) {
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Disclosure as="nav" className="fixed w-full top-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-900 transition duration-300">
                    AutomatCity
                  </Link>
                </div>
                
                {/* Mobile menu button */}
                <div className="flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Desktop menu */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <div key={item.name}>
                        {item.name === 'Simulator' ? (
                          <Link
                            to={item.href}
                            onClick={() => handleNavClick(item)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              activeItem === item.name
                                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            } transition duration-300`}
                          >
                            {item.name}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            onClick={() => handleNavClick(item)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              activeItem === item.name
                                ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white'
                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                            } transition duration-300`}
                          >
                            {item.name}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-white">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.name === 'Simulator' ? (
                    <Link
                      to={item.href}
                      onClick={() => handleNavClick(item)}
                      className={`block px-3 py-2 text-base font-medium rounded-md ${
                        activeItem === item.name
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      } transition duration-300`}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item)}
                      className={`block px-3 py-2 text-base font-medium rounded-md ${
                        activeItem === item.name
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                      } transition duration-300`}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
