import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SubmittedCard = ({ assignment }) => {

    const { _id, title, feedback, marks, pdf, obtainedMarks, status } = assignment

    return (
        <div className="min-w-[28rem] xl:min-w-[32rem] rounded-xl shadow-md box-shadow border-[0.0625rem] border-black transition-all duration-500">
            <div className="flex flex-col justify-between p-6 space-y-8">
                <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-wide">{title}</h2>
                    <hr className="border-[0.125rem] border-base-300" />
                    <div className="flex gap-10">
                        <p className="text-xl font-medium">Marks: {marks}</p>
                        <p className="text-xl font-medium">Status: <span className={status === 'Pending' ? 'text-yellow-500' : 'text-green-500'}>{status}</span></p>
                    </div>
                </div>
                <div className={`grid ${status === 'Pending' ? '' : 'grid-cols-2'}`}>
                    {
                        status === 'Completed' && <Link onClick={() => document.getElementById(`my_feedback_${_id}`).showModal()} className="w-fit relative inline-block px-4 py-2 font-medium group text-[1.125rem] text-center transition duration-200">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">Feedback</span>
                        </Link>
                    }
                    <Link onClick={() => document.getElementById(`my_preview_${_id}`).showModal()} className="w-fit place-self-end relative inline-block px-4 py-2 font-medium group text-[1.125rem] text-center transition duration-200">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white">Submission Preview</span>
                    </Link>
                </div>
                <dialog id={`my_preview_${_id}`} className="modal w-full">
                    <div className="modal-box w-8/12 max-w-5xl space-y-10">
                        <form method="dialog"><button className="btn btn-md btn-ghost rounded-s-none rounded-e-none rounded-bl-2xl px-8 absolute top-0 right-0 bg-base-300 text-2xl">✕</button></form>
                        <iframe src={pdf} alt="" className="object-cover object-center w-full h-96 rounded-t-xl" />
                    </div>
                </dialog>
                <dialog id={`my_feedback_${_id}`} className="modal w-full">
                    <div className="modal-box space-y-10">
                        <form method="dialog"><button className="btn btn-md btn-ghost rounded-s-none rounded-e-none rounded-bl-2xl px-8 absolute top-0 right-0 bg-base-300 text-2xl">✕</button></form>
                        <h1 className="text-4xl font-bold text-yellow-400 text-center">You got {obtainedMarks} !</h1>
                        <p className="px-6 font-medium text-xl"><span className="font-bold text-2xl">Feedback: </span> {feedback}</p>
                    </div>
                </dialog>

            </div>
        </div>
    );
}

export default SubmittedCard;

SubmittedCard.propTypes = {
    assignment: PropTypes.object.isRequired,
}