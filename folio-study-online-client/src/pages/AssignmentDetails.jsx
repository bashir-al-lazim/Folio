import axios from "axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import auth from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import useAxiosSecured from "../hooks/useAxiosSecured";

const AssignmentDetails = () => {

    const { id } = useParams()
    const axiosSecured = useAxiosSecured()
    const [assignment, setAssignment] = useState({})

    useEffect(() => {
        axiosSecured.get(`/assignments/details/${auth.currentUser?.email}?_id=${id}`)
            .then(data => {
                setAssignment(data.data)
                toast.success('Assignment data successfully fetched')
            })
            .catch(() => toast.error('Could not fetch assignment data : try RELOAD'))
    }, [])


    const { title, image, difficulty, marks, description, dueDate } = assignment


    const handleFormData = e => {
        e.preventDefault()
        const form = e.target

        const pdf = form.pdfUrl.value
        const note = form.description.value
        const status = 'Pending'
        const email = auth.currentUser?.email
        const name = auth.currentUser?.displayName

        const submitAssignment = { title, note, pdf, marks, status, email, name }

        axios.post(`https://folio-server.vercel.app/submit_assignment/${auth.currentUser?.email}`, submitAssignment, { withCredentials: true })
            .then(data => {
                if (data.data.insertedId) {
                    console.log(data)
                    toast.success('Assignment successfully submitted!')
                    form.reset()
                }
                else {
                    toast.error('Error! Could not submit assignment : try AGAIN')
                }
            })
            .catch(() => toast.error('Error! Could not submit assignment : try AGAIN'))
    }

    return (
        <div className="resize pt-24 pb-60 px-6 md:px-10">
            <div className="bg-base-100 relative">
                <div className="bg-base-300 px-20 pt-14 pb-40 flex flex-col md:flex-row gap-10 relative z-10">
                    <div className="">
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <p className="mt-6">{description}</p>
                    </div>
                </div>
                <div className="absolute z-20 bottom-28 left-20">
                    <Link onClick={() => document.getElementById('my_modal_3').showModal()} className="relative inline-block px-5 py-3 font-medium group text-xl h-fit transition duration-200 hover:text-white">
                        <span className="absolute inset-0 w-full h-full transition duration-500 ease-out transform translate-x-2 translate-y-2 bg-[#facc15] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-base-100 transition duration-200 group-hover:bg-[#facc15]"></span>
                        <span className="relative">Take Assignment</span>
                    </Link>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
                            <form method="dialog" onSubmit={handleFormData}>
                                <h3 className="font-bold text-2xl mb-3">Submit Assignment</h3>
                                <div className="form-control col-span-full sm:col-span-3">
                                    <label className="label">
                                        <span className="font-semibold">Pdf/Doc Link</span>
                                    </label>
                                    <input type="url" name="pdfUrl" placeholder="pdf/doc link" className="input input-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold">Quick Note (optional)</span>
                                    </label>
                                    <textarea name="description" cols="30" rows="3" placeholder="write about your submission" className="focus:border-transparent border-[0.0625rem] rounded-lg px-4 py-3 focus:outline-yellow-400 outline-offset-4 transition-all duration-500 bg-transparent textarea-bordered"></textarea>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button className="relative inline-block px-6 py-2 font-medium group text-[1.125rem] transition duration-200">
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                        <span className="relative text-black group-hover:text-white">Submit</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
                <div className="p-5 mx-auto sm:p-10 md:p-16 relative bg-base-200">
                    <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
                        <img src={image} alt="" className="w-1/2 h-60 sm:h-96 absolute box-shadow-xl -top-28 z-20 right-0 " />
                        <div className="p-6 w-1/2 lg:max-w-2xl sm:px-10 sm:mx-12 border-[0.125rem] box-shadow absolute left-0 bg-[#facc1535] z-30">
                            <div className="space-y-2">
                                <p className="text-2xl font-semibold">Difficulty: {difficulty}</p>
                                <p className="text-2xl font-semibold">Marks: {marks}</p>
                                <p className="text-2xl font-semibold">Deadline: {dueDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;