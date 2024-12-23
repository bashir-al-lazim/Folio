import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import auth from "../firebase/firebase.config";
import useAxiosSecured from "../hooks/useAxiosSecured";


const UpdateAssignment = () => {

    const [startDate, setStartDate] = useState('');
    const axiosSecured = useAxiosSecured()
    const navigate = useNavigate()
    const { id } = useParams()
    const [assignment, setAssignment] = useState({})

    useEffect(() => {
        axiosSecured.get(`/assignments/details/${auth.currentUser?.email}?_id=${ id }`)
            .then(data => {
                setAssignment(data.data)
                toast.success('Assignment data successfully fetched')
            })
            .catch(() => toast.error('Could not fetch assignment data : try RELOAD'))
    }, [])


    const { _id, title, image, difficulty, marks, description, dueDate } = assignment


    const handleFormData = e => {
        e.preventDefault()
        const form = e.target

        const title = form.title.value
        const image = form.imageUrl.value
        const difficulty = form.difficulty.value
        const marks = form.marks.value
        const description = form.description.value
        const dueDate = form.date.value

        const updateAssignment = { title, image, difficulty, marks, description, dueDate }

        axios.put(`https://folio-server.vercel.app/assignments/${auth.currentUser?.email}?_id=${_id}`, updateAssignment, {withCredentials: true})
            .then(data => {
                if (data.data.modifiedCount) {
                    toast.success('Assignment successfully updated')
                    setTimeout(() => navigate('/assignments'), 2000)
                }
                else {
                    toast.error('Error! Could not update assignment : try AGAIN')
                }
            })
            .catch(() => toast.error('Error! Could not update assignment : try AGAIN'))
    }

    return (
        <>
            <section className="p-6 min-h-screen grid place-items-center resize">
                <form onSubmit={handleFormData} className="container card-body flex flex-col mx-auto space-y-12 box-shadow rounded-xl border-[0.0625rem] border-black bg-base-100">
                    <fieldset className="grid grid-cols-4 gap-6 p-9 rounded-2xl">
                        <div className="space-y-2 col-span-full mb-4 lg:col-span-1">
                            <p className="font-medium text-4xl text-yellow-400">Update Assignment</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="form-control col-span-full sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name="title" placeholder="assignment title" defaultValue={title} className="input input-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " required />
                            </div>
                            <div className="form-control col-span-full sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Thumbnail Image URL</span>
                                </label>
                                <input type="url" name="imageUrl" placeholder="image url" defaultValue={image} className="input input-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " required />
                            </div>
                            <div className="form-control col-span-full sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Difficulty</span>
                                </label>
                                <select name="difficulty" placeholder="difficulty" className="select select-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " required>
                                    <option disabled selected>select difficulty</option>
                                    { difficulty === 'Easy' ? <option selected value='Easy' className='text-green-400'>Easy</option> : <option value='Easy' className='text-green-400'>Easy</option>}
                                    { difficulty === 'Medium' ? <option selected value='Medium' className='text-yellow-500'>Medium</option> : <option value='Medium' className='text-yellow-500'>Medium</option>}
                                    { difficulty === 'Hard' ? <option selected value='Hard' className='text-red-500'>Hard</option> : <option value='Hard' className='text-red-500'>Hard</option>}
                                </select>
                            </div>
                            <div className="form-control col-span-full sm:col-span-3">
                                <label className="label">
                                    <span className="label-text">Marks</span>
                                </label>
                                <input type="number" name="marks" placeholder="marks" defaultValue={marks} className="input input-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " required />
                            </div>
                            <div className="form-control col-span-full sm:col-span-4">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea name="description" cols="30" rows="5" placeholder="description on the assignment" defaultValue={description} className="focus:border-transparent border-[0.0625rem] rounded-lg px-4 py-3 focus:outline-yellow-400 outline-offset-4 transition-all duration-500 bg-transparent textarea-bordered" required></textarea>
                            </div>
                            <div className="form-control col-span-full sm:col-span-2">
                                <label className="label">
                                    <span className="label-text">Due Date</span>
                                </label>
                                <DatePicker
                                    name="date"
                                    selected={startDate || dueDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="w-full bg-base-100 focus-within:border-none focus-within:outline-yellow-400 input input-bordered transition-all duration-75"
                                    placeholderText="due date"
                                />
                            </div>

                            <div className="form-control mt-3 col-span-full">
                                <button className="relative inline-block px-4 py-2 font-medium group text-[1.25rem] text-center">
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                    <span className="relative text-black group-hover:text-white">Update</span>
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </>
    );
};

export default UpdateAssignment;