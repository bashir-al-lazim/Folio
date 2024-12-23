import toast from "react-hot-toast";
import AssignmentContainer from "../components/AssignmentContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Assignments = () => {

    const [difficulty, setDifficulty] = useState('')
    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        axios.get(`https://folio-server.vercel.app/assignments${difficulty}`,  { withCredentials: true })
            .then(data => {
                setAssignments(data.data)
                toast.success('Assignments data successfully fetched')
            })
            .catch(() => toast.error('Could not fetch tourist spots data : try RELOAD'))
    }, [difficulty])


    return (
        <>
            <div className="grid resize py-24 px-6 md:px-10 justify-center">
                <h1 className='text-5xl font-bold text text-yellow-400 text-center'>Available Assignments</h1>
                <p className='text-xl font-medium mt-8 mb-14 text-center'>Time to learn and contribute, take actions now!</p>
                <div className="dropdown max-w-max mb-10">
                    <div tabIndex={0} role="button" className="btn hover:bg-yellow-600 border-none hover:shadow-none text-2xl text-white font-semibold flex bg-yellow-400 gap-3 transition duration-700"><span className="pb-1">Filter</span><div><img src="images/arrow.svg" alt="dropdown icon" className="w-7" /></div></div>
                    <ul id="select" tabIndex={0} className="dropdown-content z-[1] menu p-2 -left-9 bg-transparent rounded-box text-base font-medium w-52 text-center transition-all duration-700">
                        <li onClick={() => setDifficulty('')} className={`mb-2 text-black-500 drop-shadow bg-base-100 border-b-[0.2rem] ${difficulty === '' ? ' border-b-black' : 'border-b-[#898888] hover:border-b-black'} rounded-xl mx-auto`}><a className="hover:bg-white pb-[0.125rem] w-full transition-all duration-700">All</a></li>
                        <li onClick={() => setDifficulty('?difficulty=Easy')} className={`text-green-500 drop-shadow bg-base-100 border-b-[0.2rem] ${difficulty === '?difficulty=Easy' ? 'border-b-green-500' : 'border-b-[#898888] hover:border-b-green-500'} rounded-xl mx-auto`}><a className="hover:bg-white pb-[0.125rem] w-full transition-all duration-700">Easy</a></li>
                        <li onClick={() => setDifficulty('?difficulty=Medium')} className={`text-yellow-500 drop-shadow bg-base-100 border-b-[0.255rem] ${difficulty === '?difficulty=Medium' ? 'border-b-yellow-500' : 'border-b-[#898888] hover:border-b-yellow-500'} rounded-xl mx-auto mt-2`}><a className="hover:bg-white pb-[0.125rem] w-full transition-all duration-700">Medium</a></li>
                        <li onClick={() => setDifficulty('?difficulty=Hard')} className={`text-red-600 drop-shadow bg-base-100 border-b-[0.255rem] ${difficulty === '?difficulty=Hard' ? 'border-b-red-600' : 'border-b-[#898888] hover:border-b-red-600'} rounded-xl mx-auto mt-2`}><a className="hover:bg-white pb-[0.125rem] w-full transition-all duration-700">Hard</a></li>
                    </ul>
                </div>
                {
                    (assignments.length === 0) ? <div className="flex justify-center items-center min-h-[50vh]"><span className="loading loading-ball loading-xs"></span>
                        <span className="loading loading-ball loading-sm"></span>
                        <span className="loading loading-ball loading-md"></span>
                        <span className="loading loading-ball loading-lg"></span></div>
                        :
                        <AssignmentContainer assignments={assignments} setAssignments={setAssignments}></AssignmentContainer>
                }
            </div>

        </>
    );
};

export default Assignments;