import { Link } from "react-router-dom";

const Feature = () => {
    return (
        <div className="resize py-32 px-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-10 md:pb-16">
                <h2 className="text-6xl font-bold  leading-[5rem] max-w-[55rem] text-yellow-400">Featuring Benefits</h2>
                <Link className="relative inline-block px-4 py-2 font-medium group text-[1.125rem] h-fit">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#facc15] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-[#facc15]"></span>
                    <span className="relative text-black">More...</span>
                </Link>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-x-6 gap-y-14">
                <div className="max-w-96 shadow-lg shadow-[#facc15] box-shadow-yellow animation duration-300">
                    <figure><img src="https://i.ibb.co/8m1tmKm/create-assignment.jpg" alt="" className="h-[12.8125rem] hover:scale-90 animation duration-700" /></figure>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">Create Assignment</h2>
                        <p className="text-lg">Stuck on a problem? Create an assignment, let others answer for you and help you learn!</p>
                    </div>
                </div>
                <div className="max-w-96 shadow-lg shadow-[#facc15] box-shadow-yellow animation duration-300">
                    <figure><img src="https://i.ibb.co/f9k0Lrr/submit-assignment.jpg" alt="" className="h-[12.8125rem] hover:scale-90 animation duration-700" /></figure>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">Submit Assignment</h2>
                        <p className="text-lg">You know the answer? or want to give it a try? Submit assignments created by others and get feedback!</p>
                    </div>
                </div>
                <div className="max-w-96 shadow-lg shadow-[#facc15] box-shadow-yellow animation duration-300">
                    <figure><img src="https://i.ibb.co/52vv5Pg/mobile-compatibility.jpg" alt="" className="h-[12.8125rem] w-full hover:scale-90 animation duration-700" /></figure>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold mb-4">Mobile Compatibility</h2>
                        <p className="text-lg">Always on a run? No problem! With responsive design across all devices, submit your assignment from any device.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;