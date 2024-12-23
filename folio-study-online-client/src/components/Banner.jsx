import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="bg-[url('https://i.ibb.co/GxsVcBL/flat-lay-vibrant-colored-paper-pyramids-with-copy-space-compressed.jpg')] bg-no-repeat bg-cover bg-fixed bg-center">
            <div className="resize flex flex-col lg:flex-row lg:justify-center lg:items-center pt-44 pb-6 lg:pb-16 xl:pt-28 lg:pl-12 px-10 lg:px-0">
                <div className="lg:w-1/2 text-black">
                    <h1 className="text-6xl font-bold">Learn Programming with Online Courses & Assignments</h1>
                    <p className="mt-6 mb-10">Join our community-driven platform to learn programming through online courses and collaborative assignments. Grow together with hands-on projects, peer feedback, and supportive community interaction.</p>
                    <form className="flex gap-5">
                        <div className="form-control">
                            <input type="text" placeholder="Find the topic you want to learn !" className="input border-[0.15rem] border-black focus-within:border-black focus:outline-none w-80" required />
                        </div>

                        <Link className="relative inline-block px-4 py-2 h-fit font-medium group text-[1.15rem] mt-[0.0625rem]">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">Search</span>
                        </Link>
                    </form>
                    <div className="flex flex-wrap mt-14 gap-6 w-96">
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">JAVA</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">PYTHON</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">C++</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">C</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">DJANGO</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">JAVASCRIPT</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">DEVOPS</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">.NET</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">ANDROID</p>
                        <p className="rounded-xl py-3 px-5 bg-white box-shadow-hover animation duration-300">RUBY</p>
                    </div>
                </div>
                <img src="https://i.ibb.co/JzLZPDt/download.png" alt="" className="lg:w-1/2 self-end lg:self-auto" />
            </div>
        </div>
    );
};

export default Banner;