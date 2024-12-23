/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';


const Register = () => {

    const { createUser, signOutUser } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const checkbox = e.target.terms.checked
        const photoURL = e.target.photoURL.value

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters.')
            return
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
            toast.error('Must contain one upper and lower case letter')
            return
        }
        else if (!checkbox) {
            toast.error('Must accept our terms and condition')
            return
        }

        createUser(email, password)
            .then((result) => {

                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL
                })
                    .then(() => console.log('profile updated'))
                    .catch(error => console.error(error))

                toast.success('Successfully registered')
                signOutUser()
                    .then(() => {
                        navigate('/login')
                    })
                    .catch(error => toast.error(error.message))
            })
            .catch(error => toast.error(error.message))
    }


    return (
        <div className="hero min-h-[calc(100vh-28.501rem)] pt-8 sm:pt-12 pb-14 bg-[url('https://i.ibb.co/tZB4J8H/login2-upscaled-1.png')] bg-no-repeat bg-cover bg-bottom">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-5 text-yellow-400">Registration</h1>
                </div>
                <div className="shrink-0 w-[24rem] box-shadow rounded-xl border-[0.0625rem] border-black bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered border-black focus-within:border-none focus:outline-yellow-400" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered border-black focus-within:border-none focus:outline-yellow-400" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type='url' name="photoURL" placeholder="Photo URL" className="input input-bordered border-black focus-within:border-none focus:outline-yellow-400" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="flex relative">
                                <input type={showPass ? "text" : "password"} placeholder="password" className="flex-1 input input-bordered border-black focus-within:border-none focus:outline-yellow-400" name="password" required /><span className="absolute right-4 top-1/3" onClick={() => {
                                    setShowPass(!showPass)
                                    setTimeout(() => setShowPass(false), 4000)
                                }}>
                                    {
                                        showPass ? <FaEyeSlash className='fill-yellow-400 animate-pulse h-5 w-5' /> : <FaEye className='fill-yellow-400 h-5 w-5' />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="terms" className='checkbox size-4' />
                            <p className="text-[0.8rem]">Please accept our terms and conditions</p>
                        </div>
                        <div className="form-control mt-3">
                            <button className=" text-center relative inline-block px-4 py-2 font-medium group text-[1.125rem]">
                                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                <input type="submit" value='Register' className="relative text-black group-hover:text-white" />
                            </button>
                        </div>
                        <div>
                            <p className='text-[0.8rem] text-center mt-5'>Have an account? <Link to='/login' className='link link-hover hover:text-yellow-400'>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;