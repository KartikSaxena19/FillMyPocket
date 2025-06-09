"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className='bg-gray-900 flex text-white justify-between px-4 h-16 items-center'>
      <Link href={'/'}>
        <div className="logo font-bold text-lg">Fill My Pocket</div>
      </Link>

      <div className='relative flex justify-center items-center md:block gap-4'>
        {session && (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Account
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div
              ref={dropdownRef}
              className={`z-10 ${showDropdown ? "" : "hidden"} absolute left-[15px] top-12 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowDropdown(false)} // Close dropdown on click
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${session.user.name}`} 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowDropdown(false)} // Close dropdown on click
                  >
                    Your Page
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Logout Button */}
        {session && (
          <Link 
            href="/" 
            className='text-white w-fit bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'
            onClick={(e) => {
              e.preventDefault(); // Prevent default navigation
              signOut();
            }}
          >
            Logout
          </Link>
        )}

        {/* Login Button */}
        {!session && (
          <Link href="/login">
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2'>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;