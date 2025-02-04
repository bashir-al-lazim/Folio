/* eslint-disable react/no-unescaped-entities */
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import auth from "../firebase/firebase.config";

const Nav = ({ checker }) => {

    const { user, signOutUser } = useContext(AuthContext)
    const [scroll, setScroll] = useState(false)

    const handleSignOut = () => {
        signOutUser()
            .then(() => toast.success('user successfully logged out'))
            .catch(error => toast.error(error.message))
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 112) {
            return setScroll(true)
        }
        setScroll(false)
    })

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const getTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', getTheme)
    }, [theme])

    const handleToogle = e => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }

        // {localStorage.getItem('theme') === 'dark' ? document.getElementById('subscribe').setAttribute('class', 'grow') : document.getElementById('subscribe').setAttribute('class', 'grow text-white')}
    }
    // sticky top-0 z-50 ${theme === 'light' ? 'bg-transparent' : 'bg-[#000000d9]'}

    // className={`w-full text-black transition-all duration-300 ${scroll ? 'bg-yellow-400 sticky top-0 z-50 animate-bounce pt-6' : 'absolute'}`}
    // className={`w-full text-black transition-all duration-300 bg-yellow-400 sticky top-0 z-50`}
    return (
        <div id="navbar" className={`w-full text-black transition-all duration-500 z-50 ${checker ? `${scroll ? 'bg-yellow-400 fixed top-0' : 'absolute bg-transparent'}'}` : `bg-[url('https://i.ibb.co/GxsVcBL/flat-lay-vibrant-colored-paper-pyramids-with-copy-space-compressed.jpg')] bg-no-repeat bg-cover bg-fixed bg-center sticky top-0 z-50`}`}>
            <div className="w-full px-10 lg:pr-14 navbar resize">
                <div className="flex items-center navbar-start">
                    <div className="dropdown mt-[0.225rem] mr-2">
                        <div tabIndex={0} role="button" className="lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="#ffff" viewBox="0 0 24 24" stroke="#ffff"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] -left-2 p-2 bg-transparent rounded-box w-max gap-2  font-medium text-[1.125rem]">
                            <NavLink to='/' className={({ isActive }) => isActive ? "px-5 py-2 bg-white" : "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-[#898888] rounded-lg hover:text-[#898888]"}>Home</NavLink>
                            <NavLink to='/assignments' className={({ isActive }) => isActive ? "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-emerald-400  rounded-lg" : "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-[#898888] rounded-lg  hover:text-[#898888]"}>Assignments</NavLink>
                            {
                                user && <>
                                    <NavLink to='/create_assignments' className={({ isActive }) => isActive ? "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-emerald-400  rounded-lg" : "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-[#898888] rounded-lg  hover:text-[#898888]"}>Create Assignments</NavLink>
                                    <NavLink to='/pending_assignments' className={({ isActive }) => isActive ? "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-emerald-400  rounded-lg" : "px-5 py-2 bg-base-100 border-b-[0.25rem] border-b-[#898888] rounded-lg  hover:text-[#898888]"}>Pending Assignments</NavLink>
                                </>
                            }
                        </ul>
                    </div>
                    <Link to='/' className="flex items-center pl-4 lg:pl-0"><img src="https://i.ibb.co/xqRfRsz/folio-logo-prev-ui-edited.png" className="h-20" /></Link>
                </div>
                <div className="hidden lg:flex min-w-max navbar-center">
                    <ul className="flex font-medium text-[1.125rem] gap-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'bg-white border-[0.145rem] border-black py-[0.375rem] px-4 transition duration-500' : 'hover:bg-white border-[0.145rem] hover:border-black py-[0.375rem] border-transparent px-4 transition duration-500'}>Home</NavLink>
                        <NavLink to='/assignments' className={({ isActive }) => isActive ? 'bg-white border-[0.145rem] border-black py-[0.375rem] px-4 transition duration-500' : 'hover:bg-white border-[0.145rem] hover:border-black py-[0.375rem] border-transparent px-4 transition duration-500'}>Assignments</NavLink>
                        {
                            user && <>
                                <NavLink to='/create_assignments' className={({ isActive }) => isActive ? 'bg-white border-[0.145rem] border-black py-[0.375rem] px-4 transition duration-500' : 'hover:bg-white border-[0.145rem] hover:border-black py-[0.375rem] border-transparent px-4 transition duration-500'}>Create Assignments</NavLink>
                                <NavLink to="/pending_assignments" className={({ isActive }) => isActive ? 'bg-white border-[0.145rem] border-black py-[0.375rem] px-4 transition duration-500' : 'hover:bg-white border-[0.145rem] hover:border-black py-[0.375rem] border-transparent px-4 transition duration-500'}>Pending Assignments</NavLink>
                            </>
                        }
                    </ul>
                </div>
                <div id="nav-btn" className="flex gap-4 items-center navbar-end">
                    <label className="swap swap-rotate">

                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onChange={handleToogle} checked={theme === 'dark' ? true : false} />

                        {/* sun icon */}
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                        {/* moon icon */}
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                    </label>
                    {user && <div className="avatar dropdown dropdown-hover">
                        <div tabIndex={0} className="w-12 rounded-full border-[0.125rem] border-white border-solid">
                            <img src={user.photoURL} className='p-[0.1rem] rounded-full' />
                        </div>
                        <ul tabIndex={0} className="dropdown-content right-0 z-[1] space-y-3 menu p-2 rounded-lg bg-base-100 min-w-max box-shadow-black grid border-b-[0.1875rem] border-r-[0.1875rem] border-yellow-400">
                            <li><a className="bg-white hover:bg-white text-[1.125rem] font-medium rounded-none hover:cursor-default">What's up, {user.displayName?.split(' ')[user.displayName?.split(' ').length - 1]}</a></li>
                            <li><Link to='/submitted_assignments' className="relative inline-block px-4 py-2 font-medium group text-[1.125rem]">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <span className="relative text-black group-hover:text-white">Submitted Assignments</span>
                            </Link></li>
                            <li><Link onClick={handleSignOut} className="relative inline-block px-4 py-2 font-medium group text-[1.125rem] w-fit self-center">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <span className="relative text-black group-hover:text-white">Logout</span>
                            </Link></li>
                            {/* <li><Link className="border-b-[0.1875rem] border-b-[#898888] hover:bg-white hover:border-b-yellow-400 font-medium hover:text-yellow-400">Logout</Link></li> */}
                        </ul>
                    </div>}
                    {
                        user ? '' : <>
                            <Link to="/register" className="relative inline-block px-4 py-2 font-medium group text-[1.125rem]">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <span className="relative text-black group-hover:text-white">Register</span>
                            </Link>
                            <Link to="/login" className="relative inline-block px-4 py-2 font-medium group text-[1.125rem]">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <span className="relative text-black group-hover:text-white">Login</span>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div >
    );
};

export default Nav;


Nav.propTypes = {
    checker: PropTypes.bool,
}