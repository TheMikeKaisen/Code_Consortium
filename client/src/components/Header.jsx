import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

// react icons
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

function Header() {

    const path = useLocation().pathname

  return (
    <Navbar className='border-b-2'>
        {/* Logo */}
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg'>Coder's</span>
            Consortium
        </Link>

    {/* Search input and icon -> only visible above the large screen*/}
    <form>
        <TextInput 
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline '
        />
    </form>

    {/* Search button -> hidden above large screen */}
    <Button className='w-12 h-10 lg:hidden rounded-full' color='gray'> 
        <AiOutlineSearch />
    </Button>

    <div className='flex gap-2 md:order-2'>
        {/* Dark mode icon */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
            <FaMoon />
        </Button>

        {/* Sign In button */}
        <Link to='/sign-in' >
            <Button gradientDuoTone='purpleToBlue' pill outline>
                SignIn
            </Button>
        </Link>

        {/* Collapsing navbar into a hamburger menu */}
        <Navbar.Toggle />

    </div>

    {/* Menu of NavBar */}
    <Navbar.Collapse>

        <Navbar.Link active={path==="/"} as={'div'}>
            <Link to="/">
                Home
            </Link>
        </Navbar.Link >
        <Navbar.Link active={path==="/about"} as={'div'}>
            <Link to="/about">
                About
            </Link>
        </Navbar.Link>
        <Navbar.Link active={path==="/projects"} as={'div'}>
            <Link to="/projects">
                Projects
            </Link>
        </Navbar.Link>
    </Navbar.Collapse>

    </Navbar>
  )
}

export default Header
