/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { GrGithub } from "react-icons/gr";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast from "react-hot-toast";


const Login = () => {

    const { signInUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const providerGoogle = new GoogleAuthProvider();
    const providerGithub = new GithubAuthProvider();
    const location = useLocation()


    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log('hey here')

        signInUser(email, password)
            .then(() => {
                e.target.reset()
                toast.success('Successfully logged in')
                navigate(location.state ? location.state : '/')
            })
            .catch(() => toast.error('Invalid Email/Password'))
    }

    const handleGoogleLogin = () => {
        signInWithPopup(auth, providerGoogle)
            .then(() => {
                toast.success('Successfully logged in')
                navigate(location.state ? location.state : '/')
            })
            .catch(() => toast.error('ERROR! Try with another email!'))
    }
    const handleGithubLogin = () => {
        signInWithPopup(auth, providerGithub)
            .then(() => {
                toast.success('Successfully logged in')
                navigate(location.state ? location.state : '/')
            })
            .catch(() => toast.error('ERROR! Try with another email!'))
    }

    return (
        <>
            <div className="hero min-h-[calc(100vh-28.501rem)] pt-8 sm:pt-12 pb-14 bg-[url('https://i.ibb.co/tZB4J8H/login2-upscaled-1.png')] bg-no-repeat bg-cover bg-bottom">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-5 text-yellow-400">Account Login</h1>
                    </div>
                    <div className="shrink-0 w-[24rem] box-shadow rounded-xl border-[0.0625rem] border-black bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email address</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered border-black focus-within:border-none focus:outline-yellow-400" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered border-black focus-within:border-none focus:outline-yellow-400" required />
                                <div className="mt-2 flex justify-between gap-6 items-center">
                                    <div className="flex gap-2 items-center">
                                        <input type="checkbox" name="terms" className='checkbox rounded-full h-[1.005rem] w-4' />
                                        <p className="text-[0.8rem]">Remember me</p>
                                    </div>
                                    <Link className='link link-hover text-[0.8rem] hover:text-yellow-400'>Forgot password?</Link>
                                </div>
                            </div>
                            <div className="form-control mt-3">
                                <button className=" text-center relative inline-block px-4 py-2 font-medium group text-[1.125rem]">
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                    <input type="submit" value='Login' className="relative text-black group-hover:text-white" />
                                </button>
                            </div>
                            <div>
                                <p className='text-[0.8rem] text-center mt-5'>Don't have an account? <Link to='/register' className='link link-hover hover:text-yellow-400'>Create one</Link></p>
                            </div>

                            <div className="flex items-center w-full my-4">
                                <hr className="w-full border-[0.0625rem]" />
                                <p className="px-3">OR</p>
                                <hr className="w-full border-[0.0625rem]" />
                            </div>
                            <div className="flex gap-6 justify-center mt-2 mb-1">
                                <Link onClick={handleGoogleLogin} className=" text-center relative inline-block px-4 py-2 font-medium group text-[1.125rem] fill-black hover:fill-white">
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                    <span className="relative text-black group-hover:text-white"><FaGoogle className="w-6 h-6" /></span>
                                </Link>
                                <Link onClick={handleGithubLogin} className=" text-center relative inline-block px-4 py-2 font-medium group text-[1.125rem]">
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                    <span className="relative text-black group-hover:text-white"><GrGithub className="w-6 h-6" /></span>
                                </Link>

                                
                            </div>


                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;