import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios";
import toast from "react-hot-toast";
import auth from "../firebase/firebase.config";

const PendingCard = ({ assignment, assignments, setAssignments }) => {

    const { _id, title, note, pdf, marks, name } = assignment

    const handleFormData = e => {
        e.preventDefault()
        const form = e.target

        const obtainedMarks = form.obtainedMarks.value
        const feedback = form.feedback.value
        const status = 'Completed'

        const submitEvaluation = { feedback, obtainedMarks, status }

        axios.put(`https://folio-server.vercel.app/pending_assignments/${auth.currentUser?.email}?_id=${_id}`, submitEvaluation, { withCredentials: true })
            .then(data => {
                if (data.data.modifiedCount) {
                    toast.success('Evaluation successfully submitted!')
                    form.reset()
                    setAssignments(assignments.filter(checker => checker._id !== _id))
                }
                else {
                    toast.error('Error! Could not submit evaluation : try AGAIN')
                }
            })
            .catch(() => toast.error('Error! Could not submit evaluation : try AGAIN'))
    }

    return (
        <div className="min-w-[28rem] xl:min-w-[32rem] rounded-xl shadow-md box-shadow border-[0.0625rem] border-black transition-all duration-500">
            <iframe src={pdf} alt="" className="object-cover object-center w-full h-72 rounded-t-xl" />
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">{title}</h2>
                    <p className="text-xl font-medium">Marks: {marks}</p>
                    <p className="text-xl font-medium">Submitted by: {name}</p>
                </div>
                <Link onClick={() => document.getElementById(`my_modal_${_id}`).showModal()} className="animate-pulse relative inline-block px-4 py-2 font-medium group text-[1.125rem] text-center transition duration-200">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                    <span className="relative text-black group-hover:text-white">Give Mark</span>
                </Link>
                <dialog id={`my_modal_${_id}`} className="modal">
                    <div className="modal-box">
                        <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button></form>
                        <form method="dialog" onSubmit={handleFormData}>
                            <h3 className="font-bold text-2xl mb-3">Evaluate Assignment</h3>
                            <div className="form-control col-span-full sm:col-span-3">
                                <label className="label">
                                    <span className="font-semibold">Pdf/Doc Link</span>
                                </label>
                                <input type="url" name="pdfUrl" placeholder="pdf/doc link" value={pdf} className="input input-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " readOnly required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold">Quick Note</span>
                                </label>
                                <textarea name="description" readOnly cols="30" rows="3" value={note} placeholder="things to be noted" className="focus:border-transparent border-[0.0625rem] rounded-lg px-4 py-3 focus:outline-yellow-400 outline-offset-4 transition-all duration-500 bg-transparent textarea-bordered"></textarea>
                            </div>
                            <hr className="mt-7 mb-3 border-[0.25rem] border-base-300" />
                            <div className="form-control col-span-full sm:col-span-3">
                                <label className="label">
                                    <span className="font-semibold">Obtained Marks</span>
                                </label>
                                <input type="number" name="obtainedMarks" placeholder="obtained marks" className="input input-bordered focus-within:border-none focus:outline-yellow-400 transition-all duration-75 " required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold">Feedback</span>
                                </label>
                                <textarea name="feedback" cols="30" required rows="3" placeholder="leave your feedback" className="focus:border-transparent border-[0.0625rem] rounded-lg px-4 py-3 focus:outline-yellow-400 outline-offset-4 transition-all duration-500 bg-transparent textarea-bordered"></textarea>
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
        </div>
    );
}

export default PendingCard;

PendingCard.propTypes = {
    assignment: PropTypes.object.isRequired,
    assignments: PropTypes.array.isRequired,
    setAssignments: PropTypes.func.isRequired,
}